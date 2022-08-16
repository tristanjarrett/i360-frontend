import { gql } from '@apollo/client';

export const PARTNER_FIELDS = gql`
  fragment PartnerFields on Partner {
    id
    databaseId
    date
    partnerId
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
    partnersData {
      partnersLogo {
        altText
        sourceUrl
        mediaDetails {
          height
          width
          file
        }
      }
      imagePosition {
        horizontal
        vertical
      }
    }
  }
`;

export const QUERY_ALL_PARTNERS_INDEX = gql`
  ${PARTNER_FIELDS}
  query AllPartnersIndex {
    partners(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PartnerFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PARTNERS_ARCHIVE = gql`
  ${PARTNER_FIELDS}
  query AllPartnersArchive {
    partners(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PartnerFields
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
            }
          }
          excerpt
        }
      }
    }
  }
`;

export const QUERY_ALL_PARTNERS = gql`
  ${PARTNER_FIELDS}
  query AllPartners {
    partners(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PartnerFields
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
            }
          }
          content
          excerpt
          featuredImage {
            node {
              altText
              caption
              sourceUrl
              srcSet
              sizes
              id
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
            }
          }
          modified
        }
      }
    }
  }
`;

export const QUERY_PARTNER_BY_SLUG = gql`
  query PartnerBySlug($slug: ID!) {
    partner(id: $slug, idType: SLUG) {
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
        }
      }
      id
      content
      date
      excerpt
      featuredImage {
        node {
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
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
        }
      }
      partnersData {
        partnersLogo {
          altText
          sourceUrl
          mediaDetails {
            height
            width
            file
          }
        }
        imagePosition {
          horizontal
          vertical
        }
      }
      modified
      databaseId
      title
      slug
    }
  }
`;

export const QUERY_PARTNERS_BY_AUTHOR_SLUG_INDEX = gql`
  ${PARTNER_FIELDS}
  query PartnerByAuthorSlugIndex($slug: String!) {
    partners(where: { authorName: $slug, hasPassword: false }) {
      edges {
        node {
          ...PartnerFields
        }
      }
    }
  }
`;

export const QUERY_PARTNERS_BY_AUTHOR_SLUG_ARCHIVE = gql`
  ${PARTNER_FIELDS}
  query PartnerByAuthorSlugArchive($slug: String!) {
    partners(where: { authorName: $slug, hasPassword: false }) {
      edges {
        node {
          ...PartnerFields
          excerpt
        }
      }
    }
  }
`;

export const QUERY_PARTNERS_BY_AUTHOR_SLUG = gql`
  ${PARTNER_FIELDS}
  query PartnerByAuthorSlug($slug: String!) {
    partners(where: { authorName: $slug, hasPassword: false }) {
      edges {
        node {
          ...PartnerFields
          excerpt
          featuredImage {
            node {
              altText
              caption
              sourceUrl
              srcSet
              sizes
              id
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
            }
          }
          modified
        }
      }
    }
  }
`;

export const QUERY_PARTNER_SEO_BY_SLUG = gql`
  query PartnerSEOBySlug($slug: ID!) {
    partner(id: $slug, idType: SLUG) {
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

export const QUERY_PARTNER_PER_PAGE = gql`
  query PartnerPerPage {
    allSettings {
      readingSettingsPartnersPerPage
    }
  }
`;
