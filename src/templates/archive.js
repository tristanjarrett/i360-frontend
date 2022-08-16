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
import Link from 'next/link';

import styles from 'styles/templates/Archive.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title,
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
  header,
  categories,
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
            <div className="col-12 col-lg-10">
              {Array.isArray(posts) && (
                <>
                  <div className={`${styles.posts} row`}>
                    {posts.map((post) => {
                      return (
                        <div key={post.slug} className="d-flex col-12 col-md-6 mb-4">
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
            <div className="col-12 mt-5 mt-lg-0 col-lg-2">
              <div className={styles.sidebar}>
                <h4 className="mb-4">Categories</h4>
                <ul className={styles.categoriesList}>
                  {categories?.map((category, index) => {
                    return (
                      <li key={index}>
                        <Link href={`/categories/${category.slug}`}>
                          <a>{category.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <h4 className="mb-4">Archives</h4>
                <ul className={styles.yearsList}>
                  <li>
                    <Link href={`/news/2022`}>
                      <a>2022</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2021`}>
                      <a>2021</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2020`}>
                      <a>2020</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2019`}>
                      <a>2019</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2018`}>
                      <a>2018</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2017`}>
                      <a>2017</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2016`}>
                      <a>2016</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2015`}>
                      <a>2015</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/news/2014`}>
                      <a>2014</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
