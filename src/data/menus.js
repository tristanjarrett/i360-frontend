import { gql } from '@apollo/client';

export const QUERY_ALL_MENUS = gql`
  {
    menus(first: 100) {
      edges {
        node {
          id
          menuItems(first: 100) {
            edges {
              node {
                cssClasses
                id
                parentId
                label
                title
                target
                path
              }
            }
          }
          name
          slug
          locations
        }
      }
    }
  }
`;
