import { getFaqsBySubcategory } from 'lib/faqs';
import { getPageDataByUri } from 'lib/pages';
import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld-ticket';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Accordion from 'components/Accordion';
import HeaderAcf from 'components/ACF/Header';

import styles from 'styles/pages/Faqs.module.scss';

export default function Faqs({ page, subCategories }) {
  const { title, metaTitle, description, allCpt } = page;
  const { metadata: siteMetadata = {} } = useSite();

  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,
      description: description || page.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />
      <WebpageJsonLd
        title={page.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={page.slug}
      />

      {allCpt && <HeaderAcf data={allCpt.blocks[0].header} />}

      <Section className={styles.section}>
        <Container className="container-lg">
          <div className="row">
            <div className="col">
              <div className={styles.content}>
                {Array.isArray(subCategories) && (
                  <div className={`row d-flex flex-row flex-wrap`}>
                    {subCategories.map((subCategory, index) => {
                      return (
                        <div key={index} className={styles.subCategories}>
                          <h4>{subCategory.name}</h4>
                          {subCategory.faqs.edges.map((item, index) => {
                            const data = {
                              title: item.node.title,
                              content: item.node.content,
                            };
                            return <Accordion key={index} data={data} />;
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { subCategories } = await getFaqsBySubcategory();

  const { page } = await getPageDataByUri('/about/faqs');

  return {
    props: {
      page,
      subCategories,
    },
    revalidate: 10,
  };
}
