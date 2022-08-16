import { getApolloClient } from 'lib/apollo-client';

import { sortObjectsByDate } from 'lib/datetime';

import {
  QUERY_ALL_CAREERS_INDEX,
  QUERY_ALL_CAREERS_ARCHIVE,
  QUERY_ALL_CAREERS,
  QUERY_CAREER_BY_SLUG,
  QUERY_CAREERS_BY_CATEGORY_ID_INDEX,
  QUERY_CAREERS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_CAREERS_BY_CATEGORY_ID,
  QUERY_CAREER_SEO_BY_SLUG,
  QUERY_CAREER_PER_PAGE,
} from 'data/careers';

/**
 * careerPathBySlug
 */

export function careerPathBySlug(slug) {
  return `/careers/${slug}`;
}

/**
 * getCareerBySlug
 */

export async function getCareerBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let careerData;
  let seoData;

  try {
    careerData = await apolloClient.query({
      query: QUERY_CAREER_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[careers][getCareerBySlug] Failed to query career data: ${e.message}`);
    throw e;
  }

  const career = [careerData?.data.career].map(mapCareerData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_CAREER_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[careers][getCareerBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.career;

    career.metaTitle = seo.title;
    career.metaDescription = seo.metaDesc;
    career.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      career.canonical = seo.canonical;
    }

    career.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    career.article = {
      author: career.og.author,
      modifiedTime: career.og.modifiedTime,
      publishedTime: career.og.publishedTime,
      publisher: career.og.publisher,
    };

    career.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    career.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    career,
  };
}

/**
 * getAllCareers
 */

const allCareersIncludesTypes = {
  all: QUERY_ALL_CAREERS,
  archive: QUERY_ALL_CAREERS_ARCHIVE,
  index: QUERY_ALL_CAREERS_INDEX,
};

export async function getAllCareers(options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allCareersIncludesTypes[queryIncludes],
  });

  const careers = data?.data.careers.edges.map(({ node = {} }) => node);

  return {
    careers: Array.isArray(careers) && careers.map(mapCareerData),
  };
}

/**
 * getCareersByCategoryId
 */

const careersByCategoryIdIncludesTypes = {
  all: QUERY_CAREERS_BY_CATEGORY_ID,
  archive: QUERY_CAREERS_BY_CATEGORY_ID_ARCHIVE,
  index: QUERY_CAREERS_BY_CATEGORY_ID_INDEX,
};

export async function getCareersByCategoryId({ categoryId, ...options }) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let careerData;

  try {
    careerData = await apolloClient.query({
      query: careersByCategoryIdIncludesTypes[queryIncludes],
      variables: {
        categoryId,
      },
    });
  } catch (e) {
    console.log(`[careers][getCareersByCategoryId] Failed to query career data: ${e.message}`);
    throw e;
  }

  const careers = careerData?.data.careers.edges.map(({ node = {} }) => node);

  return {
    careers: Array.isArray(careers) && careers.map(mapCareerData),
  };
}

/**
 * getRecentCareers
 */

export async function getRecentCareers({ count, ...options }) {
  const { careers } = await getAllCareers(options);
  const sorted = sortObjectsByDate(careers);
  return {
    careers: sorted.slice(0, count),
  };
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt) {
  if (typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;');

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace('....', '.');
  sanitized = sanitized.replace('.&hellip;', '.');

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '');

  return sanitized;
}

/**
 * mapCareerData
 */

export function mapCareerData(career = {}) {
  const data = { ...career };

  // Clean up the categories to make them more easy to access

  if (data.categories) {
    data.categories = data.categories.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  return data;
}

/**
 * getCareersPerPage
 */

export async function getCareersPerPage() {
  //If CAREER_PER_PAGE is defined at next.config.js
  if (process.env.CAREERS_PER_PAGE) {
    console.warn(
      'You are using the deprecated CAREERS_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    return Number(process.env.CAREERS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { data } = await apolloClient.query({
      query: QUERY_CAREER_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsCareersPerPage);
  } catch (e) {
    console.log(`Failed to query career per page data: ${e.message}`);
    throw e;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(careers, careersPerPage) {
  const _careersPerPage = careersPerPage ?? (await getCareersPerPage());
  return Math.ceil(careers.length / _careersPerPage);
}

/**
 * getPaginatedCareers
 */

export async function getPaginatedCareers({ currentPage = 1, ...options } = {}) {
  const { careers } = await getAllCareers(options);
  const careersPerPage = await getCareersPerPage();
  const pagesCount = await getPagesCount(careers, careersPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page) || page > pagesCount) {
    page = 1;
  }
  const offset = careersPerPage * (page - 1);
  return {
    careers: careers.slice(offset, offset + careersPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}
