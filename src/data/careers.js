import { gql } from '@apollo/client';

export const CAREER_FIELDS = gql`
  fragment CareerFields on Career {
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
    careerId
    slug
    title
    excerpt
    careersData {
      careerUrl
      headerImage {
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
      }
      headerImagePosition {
        horizontal
        vertical
      }
    }
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
  }
`;

export const QUERY_ALL_CAREERS_INDEX = gql`
  ${CAREER_FIELDS}
  query AllCareersIndex {
    careers(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...CareerFields
        }
      }
    }
  }
`;

export const QUERY_ALL_CAREERS_ARCHIVE = gql`
  ${CAREER_FIELDS}
  query AllCareersArchive {
    careers(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...CareerFields
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

export const QUERY_ALL_CAREERS = gql`
  ${CAREER_FIELDS}
  query AllCareers {
    careers(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...CareerFields
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

export const QUERY_CAREER_BY_SLUG = gql`
  query CareerBySlug($slug: ID!) {
    career(id: $slug, idType: SLUG) {
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
      careersData {
        careerUrl
        headerImage {
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
        }
        headerImagePosition {
          horizontal
          vertical
        }
      }
    }
  }
`;

export const QUERY_CAREERS_BY_CATEGORY_ID_INDEX = gql`
  ${CAREER_FIELDS}
  query CareersByCategoryId($categoryId: Int!) {
    careers(where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...CareerFields
        }
      }
    }
  }
`;

export const QUERY_CAREERS_BY_CATEGORY_ID_ARCHIVE = gql`
  ${CAREER_FIELDS}
  query CareersByCategoryId($categoryId: Int!) {
    careers(where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...CareerFields
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

export const QUERY_CAREERS_BY_CATEGORY_ID = gql`
  ${CAREER_FIELDS}
  query CareersByCategoryId($categoryId: Int!) {
    careers(where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...CareerFields
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

export const QUERY_CAREER_SEO_BY_SLUG = gql`
  query CareerSEOBySlug($slug: ID!) {
    career(id: $slug, idType: SLUG) {
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

export const QUERY_CAREER_PER_PAGE = gql`
  query CareerPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;
