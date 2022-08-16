import { gql } from '@apollo/client';

export const GLOBAL_DATA = gql`
  query GlobalData {
    allGlobalData {
      edges {
        node {
          global {
            data {
              sitewideNotification {
                enable
                text
              }
              sitewidePopup {
                enable
                text
                image {
                  altText
                  mediaDetails {
                    height
                    width
                    file
                  }
                  sourceUrl
                }
              }
              contactEmail
              ticketsColumnTitle
              footerWidgets {
                companyInfo {
                  address
                  phoneNumber
                  title
                  icon {
                    altText
                    mediaDetails {
                      height
                      width
                      file
                    }
                    sourceUrl
                  }
                }
                socialIcons {
                  link
                  name
                  icon {
                    altText
                    sourceUrl
                    mediaDetails {
                      width
                      height
                      file
                    }
                  }
                }
                ctas {
                  text
                  link
                  icon {
                    altText
                    mediaDetails {
                      width
                      height
                      file
                    }
                    sourceUrl
                  }
                }
                quickLinks {
                  title
                  icon {
                    altText
                    mediaDetails {
                      height
                      width
                      file
                    }
                    sourceUrl
                  }
                  links {
                    ... on Page {
                      uri
                      title
                    }
                  }
                }
                downloadOurApp {
                  title
                  appProvider {
                    link
                    image {
                      altText
                      mediaDetails {
                        height
                        width
                        file
                      }
                      sourceUrl
                    }
                  }
                }
                footerLogo {
                  altText
                  mediaDetails {
                    height
                    width
                    file
                  }
                  sourceUrl
                }
                tagline
                bottomFooterLinks {
                  ... on Page {
                    uri
                    title
                  }
                }
              }
              logo {
                altText
                mediaDetails {
                  width
                  height
                  file
                }
                sourceUrl
              }
              headerCtas {
                cta {
                  ctaText
                  ctaLink
                  ctaIcon {
                    altText
                    mediaDetails {
                      height
                      width
                      file
                    }
                    sourceUrl
                  }
                }
              }
              navbarCtas {
                cta {
                  ctaText
                  ctaLink
                  ctaIcon {
                    altText
                    mediaDetails {
                      height
                      width
                      file
                    }
                    sourceUrl
                  }
                }
              }
              themeColours {
                primaryColour
                secondaryColour
                textColour
              }
              movingPodAssets {
                pod {
                  altText
                  sourceUrl
                  mediaDetails {
                    height
                    width
                    file
                  }
                }
                pole {
                  altText
                  mediaDetails {
                    height
                    width
                    file
                  }
                  sourceUrl
                }
                backgroundImage {
                  altText
                  sourceUrl
                  mediaDetails {
                    width
                    height
                    file
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
