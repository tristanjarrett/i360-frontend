import { getApolloClient } from 'lib/apollo-client';

import { sortObjectsByDate } from 'lib/datetime';

import {
  QUERY_ALL_FAQS_INDEX,
  QUERY_ALL_FAQS_ARCHIVE,
  QUERY_ALL_FAQS,
  QUERY_FAQ_BY_SLUG,
  QUERY_FAQS_BY_CATEGORY_ID_INDEX,
  QUERY_FAQS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_FAQS_BY_CATEGORY_ID,
  QUERY_FAQ_SEO_BY_SLUG,
  QUERY_FAQ_PER_PAGE,
  QUERY_FAQS_BY_SUBCATEGORY,
} from 'data/faqs';

/**
 * faqPathBySlug
 */

export function faqPathBySlug(slug) {
  return `/faqs/${slug}`;
}

/**
 * getFaqBySlug
 */

export async function getFaqBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let faqData;
  let seoData;

  try {
    faqData = await apolloClient.query({
      query: QUERY_FAQ_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[faqs][getFaqBySlug] Failed to query faq data: ${e.message}`);
    throw e;
  }

  const faq = [faqData?.data.faq].map(mapFaqData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_FAQ_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[faqs][getFaqBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.faq;

    faq.metaTitle = seo.title;
    faq.metaDescription = seo.metaDesc;
    faq.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      faq.canonical = seo.canonical;
    }

    faq.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    faq.article = {
      author: faq.og.author,
      modifiedTime: faq.og.modifiedTime,
      publishedTime: faq.og.publishedTime,
      publisher: faq.og.publisher,
    };

    faq.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    faq.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    faq,
  };
}

/**
 * getAllFaqs
 */

const allFaqsIncludesTypes = {
  all: QUERY_ALL_FAQS,
  archive: QUERY_ALL_FAQS_ARCHIVE,
  index: QUERY_ALL_FAQS_INDEX,
};

export async function getAllFaqs(options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allFaqsIncludesTypes[queryIncludes],
  });

  const faqs = data?.data.faqs.edges.map(({ node = {} }) => node);

  return {
    faqs: Array.isArray(faqs) && faqs.map(mapFaqData),
  };
}

/**
 * getFaqsByCategoryId
 */

const faqsByCategoryIdIncludesTypes = {
  all: QUERY_FAQS_BY_CATEGORY_ID,
  archive: QUERY_FAQS_BY_CATEGORY_ID_ARCHIVE,
  index: QUERY_FAQS_BY_CATEGORY_ID_INDEX,
};

export async function getFaqsByCategoryId({ categoryId, ...options }) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let faqData;

  try {
    faqData = await apolloClient.query({
      query: faqsByCategoryIdIncludesTypes[queryIncludes],
      variables: {
        categoryId,
      },
    });
  } catch (e) {
    console.log(`[faqs][getFaqsByCategoryId] Failed to query faq data: ${e.message}`);
    throw e;
  }

  const faqs = faqData?.data.faqs.edges.map(({ node = {} }) => node);

  return {
    faqs: Array.isArray(faqs) && faqs.map(mapFaqData),
  };
}

/**
 * getFaqsBySubcategory
 */

export async function getFaqsBySubcategory() {
  const apolloClient = getApolloClient();

  let faqData;

  try {
    faqData = await apolloClient.query({
      query: QUERY_FAQS_BY_SUBCATEGORY,
    });
  } catch (e) {
    console.log(`[faqs][getFaqsByCategoryId] Failed to query faq data: ${e.message}`);
    throw e;
  }

  const subCategories = faqData?.data.category.children.edges.map(({ node = {} }) => node);

  return {
    subCategories: Array.isArray(subCategories) && subCategories.map(mapFaqData),
  };
}

/**
 * getRecentFaqs
 */

export async function getRecentFaqs({ count, ...options }) {
  const { faqs } = await getAllFaqs(options);
  const sorted = sortObjectsByDate(faqs);
  return {
    faqs: sorted.slice(0, count),
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
 * mapFaqData
 */

export function mapFaqData(faq = {}) {
  const data = { ...faq };

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
 * getFaqsPerPage
 */

export async function getFaqsPerPage() {
  //If FAQ_PER_PAGE is defined at next.config.js
  if (process.env.FAQS_PER_PAGE) {
    console.warn(
      'You are using the deprecated FAQS_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    return Number(process.env.FAQS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { data } = await apolloClient.query({
      query: QUERY_FAQ_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsFaqsPerPage);
  } catch (e) {
    console.log(`Failed to query faq per page data: ${e.message}`);
    throw e;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(faqs, faqsPerPage) {
  const _faqsPerPage = faqsPerPage ?? (await getFaqsPerPage());
  return Math.ceil(faqs.length / _faqsPerPage);
}

/**
 * getPaginatedFaqs
 */

export async function getPaginatedFaqs({ currentPage = 1, ...options } = {}) {
  const { faqs } = await getAllFaqs(options);
  const faqsPerPage = await getFaqsPerPage();
  const pagesCount = await getPagesCount(faqs, faqsPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page) || page > pagesCount) {
    page = 1;
  }
  const offset = faqsPerPage * (page - 1);
  return {
    faqs: faqs.slice(offset, offset + faqsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}
