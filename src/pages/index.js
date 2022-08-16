import MobileDetect from 'mobile-detect';
import { getPageDataByUri } from 'lib/pages';
import { Helmet } from 'react-helmet';
import { WebpageJsonLd } from 'lib/json-ld-ticket';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Content from 'components/Content';
import AllComponents from 'components/ACF/index';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ page, deviceType }) {
  const { title, metaTitle, description, slug, allCpt } = page;
  const { metadata: siteMetadata = {}, recentPosts } = useSite();

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

  const blocks = allCpt.blocks;
  const hasPod = page.movingPodOnPage?.enable;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

      <Content className={styles.page} hasPod={hasPod}>
        {blocks &&
          blocks.map((layout, index) => {
            return <AllComponents key={index} layout={layout} posts={recentPosts} device={deviceType} />;
          })}
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ req }) {
  const { page } = await getPageDataByUri('/');

  let userAgent;
  let deviceType;

  if (req) {
    userAgent = req.headers['user-agent'];
  }

  const md = new MobileDetect(userAgent);

  if (md.tablet()) {
    deviceType = 'tablet';
  } else if (md.mobile()) {
    deviceType = 'mobile';
  } else {
    deviceType = 'desktop';
  }

  return {
    props: {
      page,
      deviceType,
    },
    revalidate: 10,
  };
}
