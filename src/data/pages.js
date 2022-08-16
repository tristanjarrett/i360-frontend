import { gql } from '@apollo/client';

export const ACF = gql`
  fragment Acf on Page {
    # Hero Slider
    heroSliderComponent {
      heroSlider {
        loopSlides
        slides {
          backgroundColor
          button
          buttonLink
          fieldGroupName
          heading
          subheading
          text
          desktopImage {
            altText
            sourceUrl
            mediaDetails {
              width
              height
              file
            }
          }
          mobileImage {
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
    # Hero Tiles
    heroTiles {
      tiles {
        waveBottom
        tile {
          toggleOnMobile
          tileMasterLink
          tileMasterLinkUrl {
            ... on Page {
              id
              uri
            }
            ... on Post {
              uri
            }
            ... on Ticket {
              id
              uri
            }
          }
          title
          text
          hasListOfLinks
          hasBottomCtasWithIcons
          bottomCtaWithIcon {
            ctaText
            ctaLink
            ctaIcon {
              sourceUrl
              mediaDetails {
                width
                height
                file
              }
            }
          }
          icon {
            mediaDetails {
              width
              height
              file
            }
            sourceUrl
          }
          links {
            linkText
            linkUrl {
              ... on Page {
                id
                uri
              }
              ... on Post {
                uri
              }
              ... on Ticket {
                id
                uri
              }
            }
          }
        }
      }
    }
    # Section With Pebbles
    sectionWithPebbles {
      sectionWp {
        backgroundColor
        backgroundImage {
          sourceUrl
          mediaDetails {
            width
            height
            file
          }
        }
        subtitle
        title
        hasBottomText
        hasTopText
        topText
        bottomText
        pebble {
          ctaLink
          ctaText
          text
          title
          image {
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
    # Section With Text and Image
    sectionWithTextAndImage {
      sectionWtai {
        backgroundColour
        ctaLink
        ctaText
        imageAsHeading {
          altText
          sourceUrl
          mediaDetails {
            height
            width
            file
          }
        }
        heading
        subheading
        text
        imagePosition
        image {
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
    # Section With Background and Text
    sectionWithBackgroundAndText {
      sectionWbat {
        ctaLink
        ctaText
        heading
        headingSize
        subtitle
        text
        textAlignment
        backgroundImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
            file
          }
        }
        removeOverlay
        hasImage
        imagePosition
        image {
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
    #Parallax Section
    parallaxComponent {
      parallax {
        ctaLink
        ctaText
        heading
        subheading
        text
        layer {
          horizontal
          vertical
          opacity
          image {
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
    # Image Slider
    imageSliderComponent {
      imageSlider {
        containerSize
        heading
        hasText
        hasHeading
        text
        images {
          image {
            altText
            description
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
    #Header Component
    headerComponent {
      header {
        smallHeader
        backgroundImage {
          mediaDetails {
            width
            height
            file
          }
          sourceUrl
        }
        text
        subheading
        heading
        cta {
          buttonStyle
          ctaLink
          ctaText
          isDownloadLink
          linkColour
          hasIcon
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
        waveColour
        noAfterContentBlock
      }
    }
    # Content After Header Component
    contentAfterHeaderComponent {
      contentAfterHeader {
        content
        cta {
          buttonStyle
          ctaLink
          ctaText
          fieldGroupName
          isDownloadLink
          linkColour
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
      }
    }
    #CTAs Component
    ctas {
      cta {
        buttonStyle
        ctaLink
        ctaText
        fieldGroupName
        isDownloadLink
        linkColour
        hasIcon
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
    }
    #Categories Component
    CategoriesComponent {
      categories {
        name
      }
    }
    # Moving Pod On Page
    movingPodOnPage {
      enable
    }
  }
`;

export const ALL_ACF = gql`
  fragment AllAcf on Page {
    allCpt {
      blocks {
        __typename
        # Hero Slider
        ... on Page_Allcpt_Blocks_HeroSlider {
          heroSlider {
            loopSlides
            slides {
              backgroundColor
              button
              buttonLink
              fieldGroupName
              heading
              subheading
              text
              desktopImage {
                altText
                sourceUrl
                mediaDetails {
                  width
                  height
                  file
                }
              }
              mobileImage {
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
        #Header Component
        ... on Page_Allcpt_Blocks_Header {
          header {
            smallHeader
            backgroundVideo
            backgroundImage {
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
            text
            subheading
            heading
            cta {
              buttonStyle
              ctaLink
              ctaText
              isDownloadLink
              linkColour
              hasIcon
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
            waveColour
            noAfterContentBlock
            hasBackLink
            backLinkUrl {
              ... on Page {
                id
                uri
                title
              }
            }
          }
        }
        # Content After Header Component
        ... on Page_Allcpt_Blocks_ContentAfterHeader {
          contentAfterHeader {
            content
            cta {
              buttonStyle
              ctaLink
              ctaText
              fieldGroupName
              isDownloadLink
              linkColour
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
            backgroundColour
            waveColour
          }
        }
        # Hero Tiles
        ... on Page_Allcpt_Blocks_HeroTiles {
          tiles {
            tile {
              mobileOnly
              mobileOnlyTile {
                icon {
                  sourceUrl
                  mediaDetails {
                    width
                    height
                    file
                  }
                }
                heading
                url
              }
              toggleOnMobile
              tileMasterLink
              tileMasterLinkUrl {
                ... on Page {
                  id
                  uri
                }
                ... on Post {
                  uri
                }
                ... on Ticket {
                  id
                  uri
                }
              }
              tileMasterLinkHash
              title
              text
              hasListOfLinks
              hasBottomCtasWithIcons
              bottomCtaWithIcon {
                ctaText
                ctaLink
                ctaIcon {
                  sourceUrl
                  mediaDetails {
                    width
                    height
                    file
                  }
                }
              }
              icon {
                mediaDetails {
                  width
                  height
                  file
                }
                sourceUrl
              }
              links {
                linkText
                linkUrl {
                  ... on Page {
                    id
                    uri
                  }
                  ... on Post {
                    uri
                  }
                  ... on Ticket {
                    id
                    uri
                  }
                }
                manualLink
              }
            }
            isAfterHeroSlider
            waveBottom
          }
        }
        # Hero Navigation
        ... on Page_Allcpt_Blocks_HeroNavigation {
          tiles {
            tile {
              tileLinkHash
              title
            }
            backgroundColour
            waveBottom
          }
        }
        # Section With Pebbles
        ... on Page_Allcpt_Blocks_SectionWithPebbles {
          sectionWp {
            backgroundColor
            backgroundImage {
              sourceUrl
              mediaDetails {
                width
                height
                file
              }
            }
            subtitle
            title
            hasBottomText
            hasTopText
            topText
            bottomText
            pebble {
              ctaLink
              ctaText
              text
              title
              image {
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
        # Section With Text and Image
        ... on Page_Allcpt_Blocks_SectionWithTextAndImage {
          sectionWtai {
            sectionId
            backgroundColour
            ctaLink
            ctaText
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
            text
            imagePosition
            image {
              altText
              sourceUrl
              mediaDetails {
                width
                height
                file
              }
            }
            waveBottomColour
            waveTopColour
            hasWaveTop
            hasWaveBottom
            removeTopBottomMargins {
              top
              bottom
            }
          }
        }
        # Section With Background and Text
        ... on Page_Allcpt_Blocks_SectionWithBackgroundAndText {
          sectionWbat {
            sectionId
            backgroundColor
            textColour
            contentSize
            contentPosition
            ctaLink
            ctaText
            hasImage
            heading
            headingSize
            imagePosition
            subtitle
            text
            textAlignment
            imageAsHeading {
              sourceUrl
              altText
              mediaDetails {
                height
                width
                file
              }
            }
            image {
              altText
              mediaDetails {
                width
                height
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
            hasWaveBottom
            hasWaveTop
            waveBottomColour
            waveTopColour
            removeTopBottomMargins {
              top
              bottom
            }
          }
        }
        #Parallax Section
        ... on Page_Allcpt_Blocks_Parallax {
          parallax {
            backgroundColour
            ctaLink
            ctaText
            heading
            subheading
            text
            layer {
              horizontal
              vertical
              opacity
              image {
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
        # Image Slider
        ... on Page_Allcpt_Blocks_ImageSlider {
          imageSlider {
            backgroundColour
            containerSize
            heading
            hasText
            hasHeading
            text
            images {
              image {
                altText
                description
                sourceUrl
                mediaDetails {
                  width
                  height
                  file
                }
              }
            }
            waveBottomColour
            waveTopColour
            hasWaveTop
            hasWaveBottom
            removeTopBottomMargins {
              top
              bottom
            }
          }
        }
        # Latest News
        ... on Page_Allcpt_Blocks_LatestNews {
          heading
          subheading
        }
        # Promo Banner
        ... on Page_Allcpt_Blocks_PromoBanner {
          desktopImage {
            altText
            description
            sourceUrl
            mediaDetails {
              width
              height
              file
            }
          }
          mobileImage {
            altText
            description
            sourceUrl
            mediaDetails {
              width
              height
              file
            }
          }
          link
          containerSize
        }
        # Tickets Select
        ... on Page_Allcpt_Blocks_Tickets {
          selectTickets {
            ... on Ticket {
              databaseId
              id
              uri
              slug
              title
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
              featuredImage {
                node {
                  altText
                  mediaDetails {
                    height
                    width
                    file
                  }
                  sourceUrl
                  title
                }
              }
              excerpt
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
              ticketBookingLink {
                url
              }
            }
          }
        }
        # Partners Tiles
        ... on Page_Allcpt_Blocks_PartnersTiles {
          partners {
            ... on Partner {
              id
              slug
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                  mediaDetails {
                    width
                    height
                    file
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
              }
              excerpt
            }
          }
        }
        # FAQs
        ... on Page_Allcpt_Blocks_Faqs {
          backgroundColour
          hasWaveTop
          waveTopColour
          hasWaveBottom
          waveBottomColour
          removeTopBottomMargins {
            top
            bottom
          }
          title
          items {
            ... on Faq {
              id
              title
              content
            }
          }
        }
        # All Subitems
        ... on Page_Allcpt_Blocks_AllSubitems {
          itemsTypeSelect
        }
        # Categories
        ... on Page_Allcpt_Blocks_Categories {
          categories {
            name
          }
        }

        # All forms
        # Contact

        ... on Page_Allcpt_Blocks_FormContact {
          email
          enquiry
          message
          name
        }

        ... on Page_Allcpt_Blocks_FormCharity {
          charityName
          name
          charityNumber
          regAddress
          email
          support
        }

        ... on Page_Allcpt_Blocks_FormEvents {
          name
          compName
          agent
          agentTerms
          contact
          postAddress
          email
          eventType
          typeOther
          desc
          date
          guests
          timings
          foodDrinks
          foodBevs
          pod
          publicFlight
          suppliersReq
          specialReq
          entReq
          specialReqEnt
        }

        ... on Page_Allcpt_Blocks_FormResident {
          postCode
          phone
          name
          type
          address
          email
          headshot
          proofAddress
          proofId
        }

        ... on Page_Allcpt_Blocks_FormProposals {
          date
          name
          address
          email
          requirements
        }

        ... on Page_Allcpt_Blocks_AllSubitems {
          itemsTypeSelect
        }

        # Ticket Tiles
        ... on Page_Allcpt_Blocks_TicketTiles {
          waveBottom
          backgroundColour
          specialOffers {
            ... on Ticket {
              databaseId
              id
              uri
              slug
              title
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
              featuredImage {
                node {
                  altText
                  mediaDetails {
                    height
                    width
                    file
                  }
                  sourceUrl
                  title
                }
              }
              excerpt
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
              ticketBookingLink {
                url
              }
            }
          }
          tickets {
            ... on Ticket {
              databaseId
              id
              uri
              slug
              title
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
              featuredImage {
                node {
                  altText
                  mediaDetails {
                    height
                    width
                    file
                  }
                  sourceUrl
                  title
                }
              }
              excerpt
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
              ticketBookingLink {
                url
              }
            }
          }

          whatsOn {
            ... on Ticket {
              databaseId
              id
              uri
              slug
              title
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
              featuredImage {
                node {
                  altText
                  mediaDetails {
                    height
                    width
                    file
                  }
                  sourceUrl
                  title
                }
              }
              excerpt
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
              ticketBookingLink {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    children {
      edges {
        node {
          id
          slug
          uri
          ... on Page {
            id
            title
          }
        }
      }
    }
    id
    menuOrder
    parent {
      node {
        id
        slug
        uri
        ... on Page {
          title
        }
      }
    }
    slug
    title
    uri
  }
`;

export const QUERY_ALL_PAGES_INDEX = gql`
  ${PAGE_FIELDS}
  ${ACF}
  ${ALL_ACF}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...PageFields
          ...Acf
          ...AllAcf
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES_ARCHIVE = gql`
  ${PAGE_FIELDS}
  ${ACF}
  ${ALL_ACF}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...PageFields
          ...Acf
          ...AllAcf
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES = gql`
  ${PAGE_FIELDS}
  ${ACF}
  ${ALL_ACF}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false, status: PUBLISH }) {
      edges {
        node {
          ...PageFields
          ...Acf
          ...AllAcf
          content
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PAGE_BY_URI = gql`
  ${PAGE_FIELDS}
  ${ACF}
  ${ALL_ACF}
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      ...PageFields
      ...Acf
      ...AllAcf
      children {
        edges {
          node {
            id
            slug
            uri
            ... on Page {
              id
              title
            }
          }
        }
      }
      content
      featuredImage {
        node {
          altText
          caption
          id
          sizes
          sourceUrl
          srcSet
        }
      }
      id
      menuOrder
      parent {
        node {
          id
          slug
          uri
          ... on Page {
            title
          }
        }
      }
      slug
      title
      uri
    }
  }
`;

export const QUERY_PAGE_SEO_BY_URI = gql`
  query PageSEOByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
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

// For Preview
export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
    ${PAGE_FIELDS}
    ${ALL_ACF}
	  page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
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

export const GET_PAGE_BY_ID = gql`
  query GET_PAGE_BY_ID($id: ID!) {
    page(idType: DATABASE_ID, id: $id) {
      id
      title
      content
      slug
      uri
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
      status
    }
  }
`;
