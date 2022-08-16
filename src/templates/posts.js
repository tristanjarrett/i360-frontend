import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import HeaderAcf from 'components/ACF/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/Posts/PostCard';
import Pagination from 'components/Pagination/Pagination';

import styles from 'styles/templates/Posts.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplatePosts({
  title = 'Posts',
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
  header,
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
        <Container className="container-lg">
          <div className="row">
            <div className="col-12">
              {Array.isArray(posts) && (
                <>
                  <div className={`${styles.posts} row`}>
                    {posts.map((post) => {
                      return (
                        <div key={post.slug} className="d-flex col-12 col-md-6 col-lg-4 mb-4">
                          <PostCard post={post} options={postOptions} />
                        </div>
                      );
                    })}
                  </div>
                  {pagination && (
                    <Pagination
                      currentPage={pagination?.currentPage}
                      pagesCount={pagination?.pagesCount}
                      basePath={pagination?.basePath}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
