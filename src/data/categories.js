import { gql } from '@apollo/client';

export const QUERY_ALL_CATEGORIES = gql`
  {
    categories(first: 10000) {
      edges {
        node {
          databaseId
          description
          id
          name
          slug
          categoryData {
            image {
              altText
              mediaDetails {
                height
                width
                file
              }
              sourceUrl
            }
            imagePosition {
              horizontal
              vertical
            }
            categories {
              name
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ALL_CATEGORIES_BY_PARENT = gql`
  query CategoryByParent($parentId: Int) {
    categories(where: { parent: $parentId }, first: 10000) {
      edges {
        node {
          databaseId
          id
          name
          slug
        }
      }
    }
  }
`;

export const QUERY_CATEGORY_BY_SLUG = gql`
  query CategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      databaseId
      description
      id
      name
      slug
      categoryData {
        image {
          altText
          mediaDetails {
            height
            width
            file
          }
          sourceUrl
        }
        imagePosition {
          horizontal
          vertical
        }
        categories {
          name
        }
      }
    }
  }
`;

export const QUERY_CATEGORY_SEO_BY_SLUG = gql`
  query CategorySEOBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
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
