import { getApolloClient } from 'lib/apollo-client';

import { updateUserAvatar } from 'lib/users';
import { sortObjectsByDate } from 'lib/datetime';

import {
  QUERY_ALL_TICKETS_INDEX,
  QUERY_ALL_TICKETS_ARCHIVE,
  QUERY_ALL_TICKETS,
  QUERY_TICKET_BY_SLUG,
  QUERY_TICKETS_BY_AUTHOR_SLUG_INDEX,
  QUERY_TICKETS_BY_AUTHOR_SLUG_ARCHIVE,
  QUERY_TICKETS_BY_AUTHOR_SLUG,
  QUERY_TICKETS_BY_CATEGORY_ID_INDEX,
  QUERY_TICKETS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_TICKETS_BY_CATEGORY_ID,
  QUERY_TICKET_SEO_BY_SLUG,
  QUERY_TICKET_PER_PAGE,
} from 'data/tickets';

/**
 * ticketPathBySlug
 */

export function ticketPathBySlug(slug) {
  return `/tickets/${slug}`;
}

/**
 * getTicketBySlug
 */

export async function getTicketBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let ticketData;
  let seoData;

  try {
    ticketData = await apolloClient.query({
      query: QUERY_TICKET_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[tickets][getTicketBySlug] Failed to query ticket data: ${e.message}`);
    throw e;
  }

  const ticket = [ticketData?.data.ticket].map(mapTicketData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_TICKET_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[tickets][getTicketBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.ticket;

    ticket.metaTitle = seo.title;
    ticket.metaDescription = seo.metaDesc;
    ticket.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      ticket.canonical = seo.canonical;
    }

    ticket.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    ticket.article = {
      author: ticket.og.author,
      modifiedTime: ticket.og.modifiedTime,
      publishedTime: ticket.og.publishedTime,
      publisher: ticket.og.publisher,
    };

    ticket.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    ticket.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    ticket,
  };
}

/**
 * getAllTickets
 */

const allTicketsIncludesTypes = {
  all: QUERY_ALL_TICKETS,
  archive: QUERY_ALL_TICKETS_ARCHIVE,
  index: QUERY_ALL_TICKETS_INDEX,
};

export async function getAllTickets(options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allTicketsIncludesTypes[queryIncludes],
  });

  const tickets = data?.data.tickets.edges.map(({ node = {} }) => node);

  return {
    tickets: Array.isArray(tickets) && tickets.map(mapTicketData),
  };
}

/**
 * getTicketsByAuthorSlug
 */

const ticketsByAuthorSlugIncludesTypes = {
  all: QUERY_TICKETS_BY_AUTHOR_SLUG,
  archive: QUERY_TICKETS_BY_AUTHOR_SLUG_ARCHIVE,
  index: QUERY_TICKETS_BY_AUTHOR_SLUG_INDEX,
};

export async function getTicketsByAuthorSlug({ slug, ...options }) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let ticketData;

  try {
    ticketData = await apolloClient.query({
      query: ticketsByAuthorSlugIncludesTypes[queryIncludes],
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[tickets][getTicketsByAuthorSlug] Failed to query ticket data: ${e.message}`);
    throw e;
  }

  const tickets = ticketData?.data.tickets.edges.map(({ node = {} }) => node);

  return {
    tickets: Array.isArray(tickets) && tickets.map(mapTicketData),
  };
}

/**
 * getTicketsByCategoryId
 */

const ticketsByCategoryIdIncludesTypes = {
  all: QUERY_TICKETS_BY_CATEGORY_ID,
  archive: QUERY_TICKETS_BY_CATEGORY_ID_ARCHIVE,
  index: QUERY_TICKETS_BY_CATEGORY_ID_INDEX,
};

export async function getTicketsByCategoryId({ categoryId, ...options }) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let ticketData;

  try {
    ticketData = await apolloClient.query({
      query: ticketsByCategoryIdIncludesTypes[queryIncludes],
      variables: {
        categoryId,
      },
    });
  } catch (e) {
    console.log(`[tickets][getTicketsByCategoryId] Failed to query ticket data: ${e.message}`);
    throw e;
  }

  const tickets = ticketData?.data.tickets.edges.map(({ node = {} }) => node);

  return {
    tickets: Array.isArray(tickets) && tickets.map(mapTicketData),
  };
}

/**
 * getRecentTickets
 */

export async function getRecentTickets({ count, ...options }) {
  const { tickets } = await getAllTickets(options);
  const sorted = sortObjectsByDate(tickets);
  return {
    tickets: sorted.slice(0, count),
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
 * mapTicketData
 */

export function mapTicketData(ticket = {}) {
  const data = { ...ticket };

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

  // Clean up the categories to make them more easy to access

  if (data.categories) {
    data.categories = data.categories.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}

/**
 * getRelatedTickets
 */

export async function getRelatedTickets(categories, ticketId, count = 5) {
  if (!Array.isArray(categories) || categories.length === 0) return;

  let related;

  if (categories.length > 1) {
    categories.shift();
    related = {
      category: categories.shift(),
    };
  } else {
    related = {
      category: categories && categories.shift(),
    };
  }

  if (related.category) {
    const { tickets } = await getTicketsByCategoryId({
      categoryId: related.category.databaseId,
      queryIncludes: 'archive',
    });

    const filtered = tickets.filter(({ ticketId: id }) => id !== ticketId);
    const sorted = sortObjectsByDate(filtered);

    related.tickets = sorted.map((ticket) => ({ title: ticket.title, slug: ticket.slug }));
  }

  if (!Array.isArray(related.tickets) || related.tickets.length === 0) {
    related = await getRelatedTickets(categories, ticketId, count);
  } else if (Array.isArray(related.tickets) && related.tickets.length > count) {
    return related.tickets.slice(0, count);
  }

  return related || [];
}

/**
 * sortStickyTickets
 */

export function sortStickyTickets(tickets) {
  return [...tickets].sort((ticket) => (ticket.isSticky ? -1 : 1));
}

/**
 * getTicketsPerPage
 */

export async function getTicketsPerPage() {
  //If TICKET_PER_PAGE is defined at next.config.js
  if (process.env.TICKETS_PER_PAGE) {
    return Number(process.env.TICKETS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { data } = await apolloClient.query({
      query: QUERY_TICKET_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsPostsPerPage);
  } catch (e) {
    console.log(`Failed to query ticket per page data: ${e.message}`);
    throw e;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(tickets, ticketsPerPage) {
  const _ticketsPerPage = ticketsPerPage ?? (await getTicketsPerPage());
  return Math.ceil(tickets.length / _ticketsPerPage);
}

/**
 * getPaginatedTickets
 */

export async function getPaginatedTickets({ currentPage = 1, ...options } = {}) {
  const { tickets } = await getAllTickets(options);
  const ticketsPerPage = await getTicketsPerPage();
  const pagesCount = await getPagesCount(tickets, ticketsPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page) || page > pagesCount) {
    page = 1;
  }
  const offset = ticketsPerPage * (page - 1);
  const sortedTickets = sortStickyTickets(tickets);
  return {
    tickets: sortedTickets.slice(offset, offset + ticketsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}
