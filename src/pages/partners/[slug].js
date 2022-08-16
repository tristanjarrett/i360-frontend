import { Helmet } from 'react-helmet';

import { getPartnerBySlug, getAllPartners } from 'lib/partners';
import { ArticleJsonLd } from 'lib/json-ld-partner';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Image from 'next/image';

import PartnerHeader from 'components/Partners/PartnerHeader';

import styles from 'styles/pages/Partner.module.scss';

export default function Partner({ partner, socialImage }) {
  const { title, metaTitle, description, content, date, author, featuredImage, slug, partnersData } = partner;

  const headerData = {
    partnersData,
    featuredImage,
    title,
    metaTitle,
    date,
    author,
    content,
    slug,
  };

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!partner.og) {
    partner.og = {};
  }

  partner.og.imageUrl = `${homepage}${socialImage}`;
  partner.og.imageSecureUrl = partner.og.imageUrl;
  partner.og.imageWidth = 2000;
  partner.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...partner,
      title: metaTitle,
      description: description || partner.og?.description || `Read more about ${title}`,
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

      <ArticleJsonLd partner={partner} siteTitle={siteMetadata.title} />

      <PartnerHeader title={title} data={headerData} />

      <Content>
        <Section className={styles.section}>
          <Container className="container-sm">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div
                  className={styles.partnerContent}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
                <div className={styles.partnerDivider}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                {partnersData?.partnersLogo?.mediaDetails?.file && (
                  <div className={styles.partnerImageWrap}>
                    <Image
                      src={partnersData?.partnersLogo?.mediaDetails?.file}
                      alt={partnersData?.partnersLogo?.altText}
                      width="200"
                      height="120"
                      layout="fixed"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { partner } = await getPartnerBySlug(params?.slug);

  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;
  return {
    props: {
      partner,
      socialImage,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { partners } = await getAllPartners({
    queryIncludes: 'index',
  });

  const paths = partners
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
