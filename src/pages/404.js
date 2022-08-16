import Link from 'next/link';
import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';
import { IconContext } from 'react-icons';
import { MdNearbyError } from 'react-icons/md';

import styles from 'styles/pages/404.module.scss';

export default function Custom404() {
  return (
    <Layout>
      <Helmet>
        <title>404 | Page not found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Section className={styles.section}>
        <Container className={styles.center}>
          <IconContext.Provider value={{ color: 'red', size: '80px' }}>
            <div className="mb-4">
              <MdNearbyError />
            </div>
          </IconContext.Provider>
          <h1 className={styles.title}>
            <b>404</b>
            <br />
            Page Not Found
          </h1>
          <span>The page you were looking for could not be found.</span>
          <p>
            <Button type="button" className={styles.button}>
              <Link href="/">
                <a>Go back home</a>
              </Link>
            </Button>
          </p>
        </Container>
      </Section>
    </Layout>
  );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 10,
  };
}
