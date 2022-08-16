import { getAllTickets } from 'lib/tickets';
import { getPageDataByUri } from 'lib/pages';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateTicket from 'templates/tickets';

export default function Tickets({ page, tickets, pagination }) {
  const title = `All Tickets`;
  const slug = 'tickets';

  const headerAcf = page.headerComponent;
  const categoriesAcf = page.CategoriesComponent.categories;

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });
  return (
    <TemplateTicket
      title={title}
      header={headerAcf}
      categories={categoriesAcf}
      tickets={tickets}
      slug={slug}
      pagination={pagination}
      metadata={metadata}
    />
  );
}

export async function getStaticProps() {
  const { tickets } = await getAllTickets({
    queryIncludes: 'index',
  });
  const { page } = await getPageDataByUri('/tickets');
  return {
    props: {
      tickets,
      page,
    },
    revalidate: 10,
  };
}
