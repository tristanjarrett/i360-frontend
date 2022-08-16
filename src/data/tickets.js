import { gql } from '@apollo/client';

export const TICKET_FIELDS = gql`
  fragment TicketFields on Ticket {
    id
    categories {
      edges {
        node {
          databaseId
          id
          name
          slug
        }
      }
    }
    author {
      node {
        avatar {
          height
          url
          width
        }
        id
        name
        slug
        uri
      }
    }
    databaseId
    date
    ticketId
    slug
    title
    excerpt
    featuredImage {
      node {
        sourceUrl
        mediaDetails {
          width
          height
          file
          sizes {
            width
            sourceUrl
            height
          }
        }
        altText
        caption
        id
        srcSet
        sizes
      }
    }
    # Ticket Header
    ticketHeader {
      backgroundImage {
        altText
        mediaDetails {
          width
          height
          file
        }
        sourceUrl
      }
      backgroundImagePosition {
        horizontal
        vertical
      }
      heading
      subheading
      description
      dates {
        date
        time
      }
    }
    # Ticket Booking Link
    ticketBookingLink {
      url
    }
    # Ticket Prices
    ticketPrices {
      prices {
        title
        extraInfo
        price
        advancePrice
        featured
        priceUrl {
          url
        }
      }
    }
    # Ticket Content
    ticketContent {
      content
    }
  }
`;

export const QUERY_ALL_TICKETS_INDEX = gql`
  ${TICKET_FIELDS}
  query AllTicketsIndex {
    tickets(first: 10000, where: { status: PUBLISH, hasPassword: false }) {
      edges {
        node {
          ...TicketFields
        }
      }
    }
  }
`;

export const QUERY_ALL_TICKETS_ARCHIVE = gql`
  ${TICKET_FIELDS}
  query AllTicketsArchive {
    tickets(first: 10000, where: { status: PUBLISH, hasPassword: false }) {
      edges {
        node {
          ...TicketFields
          excerpt
        }
      }
    }
  }
`;

export const QUERY_ALL_TICKETS = gql`
  ${TICKET_FIELDS}
  query AllTickets {
    tickets(first: 10000, where: { status: PUBLISH, hasPassword: false }) {
      edges {
        node {
          ...TicketFields
          content
          excerpt
          modified
        }
      }
    }
  }
`;

export const QUERY_TICKET_BY_SLUG = gql`
  query TicketBySlug($slug: ID!) {
    ticket(id: $slug, idType: SLUG) {
      author {
        node {
          avatar {
            height
            url
            width
          }
          id
          name
          slug
          uri
        }
      }
      id
      categories {
        edges {
          node {
            databaseId
            id
            name
            slug
          }
        }
      }
      content
      date
      excerpt
      featuredImage {
        node {
          sourceUrl
          mediaDetails {
            width
            height
            file
            sizes {
              width
              sourceUrl
              height
            }
          }
          altText
          caption
          id
          srcSet
          sizes
        }
      }
      modified
      databaseId
      title
      slug
      # Ticket Header
      ticketHeader {
        backgroundVideo
        backgroundImage {
          altText
          mediaDetails {
            width
            height
            file
          }
          sourceUrl
        }
        backgroundImagePosition {
          horizontal
          vertical
        }
        imageAsHeading {
          sourceUrl
          altText
          mediaDetails {
            height
            width
            file
          }
        }
        heading
        subheading
        description
        dates {
          date
          time
        }
      }
      # Ticket Booking Link
      ticketBookingLink {
        url
      }
      # Ticket Prices
      ticketPrices {
        prices {
          title
          extraInfo
          price
          advancePrice
          featured
          priceUrl {
            url
          }
        }
      }
      # Ticket Content
      ticketContent {
        content
      }
    }
  }
`;

export const QUERY_TICKETS_BY_CATEGORY_ID_INDEX = gql`
  ${TICKET_FIELDS}
  query TicketsByCategoryId($categoryId: Int!) {
    tickets(where: { categoryId: $categoryId, hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...TicketFields
        }
      }
    }
  }
`;

export const QUERY_TICKETS_BY_CATEGORY_ID_ARCHIVE = gql`
  ${TICKET_FIELDS}
  query TicketsByCategoryId($categoryId: Int!) {
    tickets(where: { categoryId: $categoryId, hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...TicketFields
          excerpt
        }
      }
    }
  }
`;

export const QUERY_TICKETS_BY_CATEGORY_ID = gql`
  ${TICKET_FIELDS}
  query TicketsByCategoryId($categoryId: Int!) {
    tickets(where: { categoryId: $categoryId, hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...TicketFields
          content
          excerpt
          modified
        }
      }
    }
  }
`;

export const QUERY_TICKETS_BY_AUTHOR_SLUG_INDEX = gql`
  ${TICKET_FIELDS}
  query TicketByAuthorSlugIndex($slug: String!) {
    tickets(where: { authorName: $slug, hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...TicketFields
        }
      }
    }
  }
`;

export const QUERY_TICKETS_BY_AUTHOR_SLUG_ARCHIVE = gql`
  ${TICKET_FIELDS}
  query TicketByAuthorSlugArchive($slug: String!) {
    tickets(where: { authorName: $slug, hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...TicketFields
          excerpt
        }
      }
    }
  }
`;

export const QUERY_TICKETS_BY_AUTHOR_SLUG = gql`
  ${TICKET_FIELDS}
  query TicketByAuthorSlug($slug: String!) {
    tickets(where: { authorName: $slug, hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...TicketFields
          excerpt
          modified
        }
      }
    }
  }
`;

export const QUERY_TICKET_SEO_BY_SLUG = gql`
  query TicketSEOBySlug($slug: ID!) {
    ticket(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
            file
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
            file
          }
        }
      }
    }
  }
`;

export const QUERY_TICKET_PER_PAGE = gql`
  query TicketPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;
