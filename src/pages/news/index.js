import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedPosts } from 'lib/posts';
import { getPageDataByUri } from 'lib/pages';
import { getCategoryByParent } from 'lib/categories';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts, pagination, page, categories }) {
  const title = `Latest News`;
  const slug = 'news';
  const headerAcf = page.headerComponent;

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return (
    <TemplateArchive
      title={page.title}
      posts={posts}
      slug={slug}
      pagination={pagination}
      metadata={metadata}
      header={headerAcf}
      categories={categories}
    />
  );
}

export async function getStaticProps() {
  const { page } = await getPageDataByUri('/news');
  const { posts, pagination } = await getPaginatedPosts({
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
