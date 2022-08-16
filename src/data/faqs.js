import { gql } from '@apollo/client';

export const FAQ_FIELDS = gql`
  fragment FaqFields on Faq {
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
    databaseId
    date
    faqId
    slug
    title
    excerpt
  }
`;

export const QUERY_ALL_FAQS_INDEX = gql`
  ${FAQ_FIELDS}
  query AllFaqsIndex {
    faqs(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...FaqFields
        }
      }
    }
  }
`;

export const QUERY_ALL_FAQS_ARCHIVE = gql`
  ${FAQ_FIELDS}
  query AllFaqsArchive {
    faqs(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...FaqFields
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

export const QUERY_ALL_FAQS = gql`
  ${FAQ_FIELDS}
  query AllFaqs {
    faqs(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...FaqFields
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
          modified
        }
      }
    }
  }
`;

export const QUERY_FAQ_BY_SLUG = gql`
  query FaqBySlug($slug: ID!) {
    faq(id: $slug, idType: SLUG) {
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
      modified
      databaseId
      title
      slug
    }
  }
`;

export const QUERY_FAQS_BY_CATEGORY_ID_INDEX = gql`
  ${FAQ_FIELDS}
  query FaqsByCategoryId($categoryId: Int!) {
    faqs(where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...FaqFields
        }
      }
    }
  }
`;

export const QUERY_FAQS_BY_CATEGORY_ID_ARCHIVE = gql`
  ${FAQ_FIELDS}
  query FaqsByCategoryId($categoryId: Int!) {
    faqs(where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...FaqFields
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

export const QUERY_FAQS_BY_CATEGORY_ID = gql`
  ${FAQ_FIELDS}
  query FaqsByCategoryId($categoryId: Int!) {
    faqs(where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...FaqFields
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
          modified
        }
      }
    }
  }
`;

export const QUERY_FAQ_SEO_BY_SLUG = gql`
  query FaqSEOBySlug($slug: ID!) {
    faq(id: $slug, idType: SLUG) {
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

export const QUERY_FAQS_BY_SUBCATEGORY = gql`
  query FaqsBySubcategory($id: ID = "faq") {
    category(id: $id, idType: SLUG) {
      id
      children {
        edges {
          node {
            id
            name
            slug
            faqs {
              edges {
                node {
                  content
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_FAQ_PER_PAGE = gql`
  query FaqPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;
