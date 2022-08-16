import { Helmet } from 'react-helmet';

import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Content from 'components/Content';
import AllComponents from 'components/ACF/index';

import styles from 'styles/pages/Page.module.scss';

export default function Page({ page }) {
  const { title, metaTitle, description, slug, allCpt, movingPodOnPage } = page;
  const { metadata: siteMetadata = {} } = useSite();

  const blocks = allCpt.blocks;

  const hasPod = movingPodOnPage?.enable;

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
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

      <Content className={styles.page} hasPod={hasPod}>
        {/* ACF Components */}
        {blocks &&
          blocks.map((layout, index) => {
            return <AllComponents key={index} layout={layout} />;
          })}
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { slugParent, slugChild } = params;

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params

  let pageUri = `/${slugParent}/`;

  // We only want to apply deeper paths to the URI if we actually have
  // existing children

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`;
  }

  const { page } = await getPageByUri(pageUri);

  // In order to show the proper breadcrumbs, we need to find the entire
  // tree of pages. Rather than querying every segment, the query should
  // be cached for all pages, so we can grab that and use it to create
  // our trail

  const { pages } = await getAllPages({
    queryIncludes: 'index',
  });

  const breadcrumbs = getBreadcrumbsByUri(pageUri, pages);

  return {
    props: {
      page,
      breadcrumbs,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { pages } = await getAllPages({
    queryIncludes: 'index',
  });

  // Take all the pages and create path params. The slugParent will always be
  // the top level parent page, where the slugChild will be an array of the
  // remaining segments to make up the path or URI

  // Filter statically generated pages out of dynamically genereated routes
  for (let i = 0; i < pages.length; i++) {
    if (
      pages[i].uri.toString() === '/news/' ||
      pages[i].uri.toString() === '/tickets/' ||
      pages[i].uri.toString() === '/about/faqs/' ||
      pages[i].uri.toString() === '/about/careers/' ||
      pages[i].uri.toString() === '/partners/'
    ) {
      pages.splice(i, 1);
    }
  }

  const paths = pages
    .filter(({ uri }) => typeof uri === 'string')
    .map(({ uri }) => {
      const segments = uri.split('/').filter((seg) => seg !== '');
      return {
        params: {
          slugParent: segments?.shift(),
          slugChild: segments,
        },
      };
    });
  return {
    paths: paths.filter((i) => typeof i.params.slugParent === 'string'),
    fallback: false,
  };
}
