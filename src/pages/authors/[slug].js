import { getAllAuthors, getUserByNameSlug, userSlugByName } from 'lib/users';
import { getPostsByAuthorSlug } from 'lib/posts';
import { getTicketsByAuthorSlug } from 'lib/tickets';
import { AuthorJsonLd } from 'lib/json-ld';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import TemplatePostsSimple from 'templates/postsSimple';
import TemplateTicketSimple from 'templates/ticketsSimple';
import Title from 'components/Title';

import styles from 'styles/pages/Author.module.scss';

export default function Author({ user, posts, tickets }) {
  const { title, name, avatar, description, slug } = user;

  const { metadata } = usePageMetadata({
    metadata: {
      ...user,
      title,
      description:
        description || user.og?.description || `Read ${posts.length + tickets.length} posts and tickets from ${name}`,
    },
  });

  const postOptions = {
    excludeMetadata: ['author'],
  };

  return (
    <Layout>
      <AuthorJsonLd author={user} />
      <Section className={styles.section}>
        <Container className="container-lg">
          {tickets.length != 0 && (
            <div className="row">
              <div className="col">
                <h2 className="text-capitalize ps-2 mb-3">{user.name}s Tickets</h2>
                <TemplateTicketSimple
                  title={name}
                  Title={<Title title={name} thumbnail={avatar} />}
                  tickets={tickets}
                  slug={slug}
                  postOptions={postOptions}
                  metadata={metadata}
                  activeCat={name}
                />
              </div>
            </div>
          )}
          {posts.length != 0 && (
            <div className="row">
              <div className="col">
                <h2 className="text-capitalize ps-2 mb-3">{user.name}s Posts</h2>
                <TemplatePostsSimple
                  title={name}
                  Title={<Title title={name} thumbnail={avatar} />}
                  posts={posts}
                  postOptions={postOptions}
                  slug={slug}
                  metadata={metadata}
                />
              </div>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { user } = await getUserByNameSlug(params?.slug);
  const { posts } = await getPostsByAuthorSlug({
    slug: user?.slug,
    queryIncludes: 'archive',
  });
  const { tickets } = await getTicketsByAuthorSlug({
    slug: user?.slug,
    queryIncludes: 'archive',
  });
  return {
    props: {
      user,
      posts,
      tickets,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { authors } = await getAllAuthors();

  const paths = authors.map((author) => {
    const { name } = author;
    return {
      params: {
        slug: userSlugByName(name),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
