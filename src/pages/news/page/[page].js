import { getAllPosts, getPagesCount, getPaginatedPosts } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';
import { getPageDataByUri } from 'lib/pages';
import { getCategoryByParent } from 'lib/categories';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts, pagination, page, categories }) {
  const title = `All Posts`;
  const slug = 'posts';
  const headerAcf = page.headerComponent;

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: `Page ${pagination.currentPage}`,
    },
  });

  return (
    <TemplateArchive
      title={title}
      posts={posts}
      slug={slug}
      pagination={pagination}
      metadata={metadata}
      header={headerAcf}
      categories={categories}
    />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { page } = await getPageDataByUri('/news');
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: params?.page,
    queryIncludes: 'archive',
  });
  const { categories } = await getCategoryByParent(246);
  return {
    props: {
      page,
      posts,
      categories,
      pagination: {
        ...pagination,
        basePath: '/news',
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts({
    queryIncludes: 'index',
  });
  const pagesCount = await getPagesCount(posts);
  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { params: { page: String(i + 1) } };
  });
  return {
    paths,
    fallback: false,
  };
}
