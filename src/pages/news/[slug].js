import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getAllPosts, getRelatedPosts } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';

import PostHeader from 'components/Posts/PostHeader';
import PostCard from 'components/Posts/PostCard';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post, socialImage, related, options }) {
  const { title, metaTitle, description, content, date, author, categories, featuredImage, newsPostData } = post;

  const headerData = {
    newsPostData,
    featuredImage,
    title,
    metaTitle,
    date,
    author,
    content,
    categories,
  };

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const { posts: relatedPostsList, title: relatedPostsTitle } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <PostHeader title={title} data={headerData} categories={categories} />

      <Content className="container-lg">
        <Section>
          <Container className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              </div>
            </div>
          </Container>
        </Section>
      </Content>

      {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (
        <Section className={styles.postFooter}>
          <Container className="container">
            <div className={styles.postDivider}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.relatedPosts}>
              {relatedPostsTitle.name ? (
                <h5>
                  More{' '}
                  <Link href={relatedPostsTitle.link}>
                    <a>{relatedPostsTitle.name}</a>
                  </Link>{' '}
                  Posts
                </h5>
              ) : null}
              <div className="container-fluid">
                <div className="row">
                  {relatedPostsList.map((post, index) => (
                    <div className="col-12 col-md-4" key={index}>
                      <PostCard post={post} options={options} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;

  const { categories, databaseId: postId } = post;

  const { category: relatedCategory, posts: relatedPosts } = await getRelatedPosts(categories, postId);

  const hasRelated = relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

  const related = !hasRelated
    ? null
    : {
        posts: relatedPosts,
        title: {
          name: relatedCategory.name || null,
          link: categoryPathBySlug(relatedCategory.slug),
        },
      };

  return {
    props: {
      post,
      socialImage,
      related,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts({
    queryIncludes: 'index',
  });

  const paths = posts
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
