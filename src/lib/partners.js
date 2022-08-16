import { getApolloClient } from 'lib/apollo-client';

import { updateUserAvatar } from 'lib/users';
import { sortObjectsByDate } from 'lib/datetime';

import {
  QUERY_ALL_PARTNERS_INDEX,
  QUERY_ALL_PARTNERS_ARCHIVE,
  QUERY_ALL_PARTNERS,
  QUERY_PARTNER_BY_SLUG,
  QUERY_PARTNERS_BY_AUTHOR_SLUG_INDEX,
  QUERY_PARTNERS_BY_AUTHOR_SLUG_ARCHIVE,
  QUERY_PARTNERS_BY_AUTHOR_SLUG,
  QUERY_PARTNER_SEO_BY_SLUG,
  QUERY_PARTNER_PER_PAGE,
} from 'data/partners';

/**
 * partnerPathBySlug
 */

export function partnerPathBySlug(slug) {
  return `/partners/${slug}`;
}

/**
 * getPartnerBySlug
 */

export async function getPartnerBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let partnerData;
  let seoData;

  try {
    partnerData = await apolloClient.query({
      query: QUERY_PARTNER_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[partners][getPartnerBySlug] Failed to query partner data: ${e.message}`);
    throw e;
  }

  const partner = [partnerData?.data.partner].map(mapPartnerData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_PARTNER_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[partners][getPartnerBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.partner;

    partner.metaTitle = seo.title;
    partner.metaDescription = seo.metaDesc;
    partner.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      partner.canonical = seo.canonical;
    }

    partner.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    partner.article = {
      author: partner.og.author,
      modifiedTime: partner.og.modifiedTime,
      publishedTime: partner.og.publishedTime,
      publisher: partner.og.publisher,
    };

    partner.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    partner.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    partner,
  };
}

/**
 * getAllPartners
 */

const allPartnersIncludesTypes = {
  all: QUERY_ALL_PARTNERS,
  archive: QUERY_ALL_PARTNERS_ARCHIVE,
  index: QUERY_ALL_PARTNERS_INDEX,
};

export async function getAllPartners(options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allPartnersIncludesTypes[queryIncludes],
  });

  const partners = data?.data.partners.edges.map(({ node = {} }) => node);

  return {
    partners: Array.isArray(partners) && partners.map(mapPartnerData),
  };
}

/**
 * getPartnersByAuthorSlug
 */

const partnersByAuthorSlugIncludesTypes = {
  all: QUERY_PARTNERS_BY_AUTHOR_SLUG,
  archive: QUERY_PARTNERS_BY_AUTHOR_SLUG_ARCHIVE,
  index: QUERY_PARTNERS_BY_AUTHOR_SLUG_INDEX,
};

export async function getPartnersByAuthorSlug({ slug, ...options }) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let partnerData;

  try {
    partnerData = await apolloClient.query({
      query: partnersByAuthorSlugIncludesTypes[queryIncludes],
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[partners][getPartnersByAuthorSlug] Failed to query partner data: ${e.message}`);
    throw e;
  }

  const partners = partnerData?.data.partners.edges.map(({ node = {} }) => node);

  return {
    partners: Array.isArray(partners) && partners.map(mapPartnerData),
  };
}

/**
 * getRecentPartners
 */

export async function getRecentPartners({ count, ...options }) {
  const { partners } = await getAllPartners(options);
  const sorted = sortObjectsByDate(partners);
  return {
    partners: sorted.slice(0, count),
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
 * mapPartnerData
 */

export function mapPartnerData(partner = {}) {
  const data = { ...partner };

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (data.author) {
    data.author = {
      ...data.author.node,
    };
  }

  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  if (data.author?.avatar) {
    data.author.avatar = updateUserAvatar(data.author.avatar);
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}

/**
 * getPartnersPerPage
 */

export async function getPartnersPerPage() {
  //If PARTNER_PER_PAGE is defined at next.config.js
  if (process.env.PARTNERS_PER_PAGE) {
    console.warn(
      'You are using the deprecated PARTNER_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    return Number(process.env.PARTNERS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { data } = await apolloClient.query({
      query: QUERY_PARTNER_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsPartnersPerPage);
  } catch (e) {
    console.log(`Failed to query partner per page data: ${e.message}`);
    throw e;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(partners, partnersPerPage) {
  const _partnersPerPage = partnersPerPage ?? (await getPartnersPerPage());
  return Math.ceil(partners.length / _partnersPerPage);
}

/**
 * getPaginatedPartners
 */

export async function getPaginatedPartners({ currentPage = 1, ...options } = {}) {
  const { partners } = await getAllPartners(options);
  const partnersPerPage = await getPartnersPerPage();
  const pagesCount = await getPagesCount(partners, partnersPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page) || page > pagesCount) {
    page = 1;
  }
  const offset = partnersPerPage * (page - 1);
  return {
    partners: partners.slice(offset, offset + partnersPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}
