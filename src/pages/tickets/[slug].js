import { Helmet } from 'react-helmet';

import React from 'react';

import { getTicketBySlug, getAllTickets, getRelatedTickets, ticketPathBySlug } from 'lib/tickets';
import { ticketCategoryPathBySlug } from 'lib/categories';
// import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld-ticket';
import { helmetSettingsFromMetadata } from 'lib/site';
// import { authorPathByName } from 'lib/users';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Link from 'next/link';
// import ImageObject from 'components/ImageObject';

import TicketHeader from 'components/Tickets/TicketHeader';
import TicketContent from 'components/Tickets/TicketContent';
import TicketPrices from 'components/Tickets/TicketPrices';

// import useStickyBox from 'react-sticky-box';
import Sticky from 'wil-react-sticky';

import styles from 'styles/pages/Ticket.module.scss';

export default function Ticket({ ticket, socialImage, related }) {
  const {
    title,
    // author,
    metaTitle,
    description,
    // modified,
    ticketHeader,
    ticketPrices,
    ticketBookingLink,
    ticketContent,
  } = ticket;

  const { metadata: siteMetadata = {}, homepage, globalData } = useSite();

  if (!ticket.og) {
    ticket.og = {};
  }

  ticket.og.imageUrl = `${homepage}${socialImage}`;
  ticket.og.imageSecureUrl = ticket.og.imageUrl;
  ticket.og.imageWidth = 2000;
  ticket.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...ticket,
      title: metaTitle,
      description: description || ticket.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const { tickets: relatedTicketsList, title: relatedTicketsTitle } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  // const stickyRef = useStickyBox({
  //   offsetTop: '230',
  //   offsetBottom: '0',
  //   bottom: false,
  // });

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd ticket={ticket} siteTitle={siteMetadata.title} />

      <TicketHeader title={title} data={ticketHeader} />
      <Content className={styles.ticketBody}>
        <Section>
          <Container className="container-lg">
            <div className="row">
              <div className="col-12 col-lg-4 order-1 order-lg-2">
                <div className={styles.ticketSidebar} id="containerSelectorFocus">
                  <div className={`${styles.stickyBox} sticky`}>
                    <Sticky
                      containerSelectorFocus="#containerSelectorFocus"
                      offsetTop={250}
                      stickyEnableRange={[992, Infinity]}
                      zIndex={10}
                    >
                      <div className={styles.ticketSidebarBox}>
                        <div className={styles.ticketSidebarBox__head}>
                          <p>
                            <span>Price</span>
                            <span>{globalData.ticketsColumnTitle}</span>
                            {/* <span>Advance</span> */}
                          </p>
                        </div>
                        <div className={styles.ticketSidebarBox__body}>
                          <TicketPrices data={ticketPrices.prices} />
                          {ticketBookingLink.url && (
                            <div className={styles.ticketBtn}>
                              <Link href={ticketBookingLink.url}>
                                <a
                                  href={ticketBookingLink.url}
                                  className={`${styles.bookingLink} js-event-book-online`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  BOOK NOW
                                </a>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </Sticky>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 order-2 order-lg-1">
                <TicketContent data={ticketContent.content} />
              </div>
            </div>
          </Container>
        </Section>
      </Content>
      {Array.isArray(relatedTicketsList) && relatedTicketsList.length > 0 && (
        <Section className={styles.ticketFooter}>
          <Container className="container-sm">
            {/* <div className={styles.ticketDivider}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.ticketAuthor}>
            <ImageObject src={author.avatar.url} width={author.avatar.width} height={author.avatar.height} />
            Author:{' '}
            <Link href={authorPathByName(author.name)}>
              <a title={author.name}>
                <strong> {author.name}</strong>
              </a>
            </Link>
          </div> 
          <p className={styles.ticketModified}>Last updated on {formatDate(modified)}.</p>*/}
            <>
              <div className={styles.ticketDivider}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.relatedTickets}>
                {relatedTicketsTitle.name ? (
                  <h5>
                    More{' '}
                    <Link href={relatedTicketsTitle.link}>
                      <a>{relatedTicketsTitle.name}</a>
                    </Link>{' '}
                    Tickets
                  </h5>
                ) : null}
                <ul className="d-flex flex-row flex-wrap justify-content-center">
                  {relatedTicketsList.map((item, index) => (
                    <li key={index}>
                      <Link href={ticketPathBySlug(item.slug)}>
                        <a>{item.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          </Container>
        </Section>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { ticket } = await getTicketBySlug(params.slug);

  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;

  const { categories, databaseId: ticketId } = ticket;

  const { category: relatedCategory, tickets: relatedTickets } = await getRelatedTickets(categories, ticketId);

  const hasRelated = relatedCategory && Array.isArray(relatedTickets) && relatedTickets.length;

  const related = !hasRelated
    ? null
    : {
        tickets: relatedTickets,
        title: {
          name: relatedCategory.name || null,
          link: ticketCategoryPathBySlug(relatedCategory.slug),
        },
      };

  return {
    props: {
      ticket,
      socialImage,
      related,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { tickets } = await getAllTickets({
    queryIncludes: 'index',
  });

  const paths = tickets
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
