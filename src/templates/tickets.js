import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld-ticket';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import TicketCard from 'components/TicketCard';
import HeaderAcf from 'components/ACF/Header';
import Categories from 'components/ACF/Categories';

import styles from 'styles/templates/Tickets.module.scss';

const DEFAULT_TICKET_OPTIONS = {};

export default function TemplateTicket({
  title,
  tickets,
  ticketOptions = DEFAULT_TICKET_OPTIONS,
  slug,
  metadata,
  header,
  categories,
  activeCat,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);
  return (
    <Layout>
      <Helmet {...helmetSettings} />
      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

      {header && <HeaderAcf data={header} />}

      <Section className={styles.section}>
        {categories && <Categories data={categories} active={activeCat} />}
        <Container className="container-lg mt-5">
          <div className="row">
            <div className="col">
              {Array.isArray(tickets) && (
                <>
                  <ul className={`${styles.tickets} row d-flex flex-row flex-wrap`}>
                    {tickets.map((ticket) => {
                      return (
                        <li key={ticket.databaseId.toString()} className={`${styles.ticket} col-12 col-md-6 col-xl-4`}>
                          <TicketCard ticket={ticket} options={ticketOptions} />
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
