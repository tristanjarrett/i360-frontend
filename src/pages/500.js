import Link from 'next/link';
import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';
import { IconContext } from 'react-icons';
import { AiOutlineCloudServer } from 'react-icons/ai';

import styles from 'styles/pages/404.module.scss';

export default function Custom404() {
  return (
    <Layout>
      <Helmet>
        <title>500 | Page not found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Section className={styles.section}>
        <Container className={styles.center}>
          <IconContext.Provider value={{ color: 'red', size: '80px' }}>
            <div className="mb-4">
              <AiOutlineCloudServer />
            </div>
          </IconContext.Provider>
          <h1 className={styles.title}>
            <b>500</b>
            <br />
            Server error
          </h1>
          <span>Server has stopped responding or timed out.</span>
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
