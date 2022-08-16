import { getPostsByYear } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';
import { getPageDataByUri } from 'lib/pages';
import { getCategoryByParent } from 'lib/categories';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts, page, categories }) {
  const title = `All2020News | British Airways i360`;
  const slug = '2020';

  const headerAcf = {
    backgroundImage: page.headerComponent.header.backgroundImage,
    heading: '2020News',
    subheading: '',
    text: '',
    waveColour: 'white',
    hasBackLink: true,
  };

  const { metadata } = usePageMetadata({
    metadata: {
      title,
    },
  });

  return (
    <TemplateArchive
      title={title}
      posts={posts}
      slug={slug}
      metadata={metadata}
      header={headerAcf}
      categories={categories}
    />
  );
}

export async function getStaticProps() {
  const { page } = await getPageDataByUri('/news');
  const { posts } = await getPostsByYear(2020);

  const { categories } = await getCategoryByParent(246);
  return {
    props: {
      page,
      posts,
      categories,
    },
    revalidate: 10,
  };
}
