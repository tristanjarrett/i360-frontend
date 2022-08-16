import { getAllCategories, getCategoryBySlug } from 'lib/categories';
import { getTicketsByCategoryId } from 'lib/tickets';
import usePageMetadata from 'hooks/use-page-metadata';
import TemplateTicket from 'templates/tickets';
import Title from 'components/Title';

export default function Category({ category, tickets }) {
  const { name, description, slug, categoryData } = category;

  const horizontal = categoryData.imagePosition.horizontal;
  const vertical = categoryData.imagePosition.vertical;

  const header = {
    backgroundImage: categoryData.image,
    heading: name,
    subheading: '',
    text: description,
    waveColour: 'white',
    hasBackLink: true,
    backgroundPositionX: horizontal,
    backgroundPositionY: vertical,
  };

  const categoriesAcf = categoryData;

  const { metadata } = usePageMetadata({
    metadata: {
      ...category,
      description: description || category.og?.description || `Read ${tickets.length} tickets from ${name}`,
    },
  });

  return (
    <TemplateTicket
      title={name}
      header={header}
      Title={<Title title={name} />}
      tickets={tickets}
      slug={slug}
      metadata={metadata}
      categories={categoriesAcf}
      activeCat={name}
    />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { category } = await getCategoryBySlug(params?.slug);

  const { tickets } = await getTicketsByCategoryId({
    categoryId: category.databaseId,
    queryIncludes: 'index',
  });

  return {
    props: {
      category,
      tickets,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { categories } = await getAllCategories();

  const paths = categories.map((category) => {
    const { slug } = category;
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
