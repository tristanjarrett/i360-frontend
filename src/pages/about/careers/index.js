import React from 'react';
import { getAllCareers } from 'lib/careers';
import { getPageDataByUri } from 'lib/pages';
import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld-ticket';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import HeaderAcf from 'components/ACF/Header';

import Link from 'next/link';
import Button from 'components/Button';
import Image from 'next/image';
import ImageObject from 'components/ImageObject';

import styles from 'styles/pages/Careers.module.scss';

export default function Careers({ page, careers }) {
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
            {Array.isArray(careers) &&
              careers.map((item, index) => {
                const data = {
                  title: item.title,
                  excerpt: item.excerpt,
                  url: item.careersData.careerUrl,
                  slug: item.slug,
                  image: item.featuredImage.node,
                };
                return (
                  <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
                    <div className={styles.careerCard}>
                      <div className={styles.careerImage}>
                        <Link href={`/careers/${data?.slug}/`}>
                          <a className={styles.careerDetails}>
                            {data?.image?.mediaDetails?.file ? (
                              <div className={styles.careerImageWrap}>
                                <Image
                                  src={data?.image.mediaDetails?.file}
                                  alt={data?.image.altText}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </div>
                            ) : (
                              <div className={styles.careerImageWrap}>
                                <ImageObject src="/assets/placeholder.jpg" alt="Wave Bottom" width="506" height="307" />
                              </div>
                            )}
                          </a>
                        </Link>
                      </div>
                      <div className={styles.careerInner}>
                        <div className={styles.careerContentWrapper}>
                          <div className={styles.careerTop}>
                            <Link href={data?.slug}>
                              <a>
                                <h3 className={styles.careerCardTitle}>{data?.title}</h3>
                              </a>
                            </Link>
                            {data?.excerpt && (
                              <div
                                className={styles.careerCardContent}
                                dangerouslySetInnerHTML={{
                                  __html: data?.excerpt,
                                }}
                              />
                            )}
                          </div>
                          <div className={styles.careerBottom}>
                            <div className={styles.careerCardLink}>
                              <Button type="button">
                                <Link href={`/careers/${data?.slug}/`}>
                                  <a>Read More</a>
                                </Link>
                              </Button>
                              {data?.url && (
                                <Button type="button" className={styles.apply}>
                                  <Link href={data.url}>
                                    <a target="_blank" rel="noopener noreferrer">
                                      Apply
                                    </a>
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { careers } = await getAllCareers();

  const { page } = await getPageDataByUri('/about/careers');

  return {
    props: {
      page,
      careers,
    },
    revalidate: 10,
  };
}
