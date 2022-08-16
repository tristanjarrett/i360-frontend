import { Helmet } from 'react-helmet';

import { getCareerBySlug, getAllCareers } from 'lib/careers';
import { ArticleJsonLd } from 'lib/json-ld-career';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';
import Image from 'next/image';
import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';

// import Wave from 'components/Wave';
import Link from 'next/link';
import Button from 'components/Button';
import { IconContext } from 'react-icons';
import { RiArrowGoBackFill } from 'react-icons/ri';

import styles from 'styles/pages/Careers.module.scss';

export default function Career({ career, socialImage }) {
  const { title, metaTitle, description, content, date, author, categories, featuredImage, slug, careersData } = career;

  const headerData = {
    imagePosition: careersData?.headerImagePosition,
    headerImage: careersData?.headerImage,
    featuredImage,
    title,
    metaTitle,
    date,
    author,
    content,
    slug,
    url: careersData.careerUrl,
  };

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!career.og) {
    career.og = {};
  }

  career.og.imageUrl = `${homepage}${socialImage}`;
  career.og.imageSecureUrl = career.og.imageUrl;
  career.og.imageWidth = 2000;
  career.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...career,
      title: metaTitle,
      description: description || career.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  const CareerHeader = ({ data, title }) => {
    return (
      <>
        {data && (
          <section
            className={`${styles.header} container-fluid p-0`}
            // style={{
            //   backgroundImage:
            //     data?.featuredImage?.node?.mediaDetails?.file !== undefined
            //       ? `url('https://i360.imgix.net/wp-content/uploads/${data?.featuredImage?.node?.mediaDetails?.file}')`
            //       : '',
            // }}
          >
            <div className={styles.overlay}></div>
            <Image
              src={data?.headerImage?.mediaDetails?.file || data?.featuredImage?.node?.mediaDetails?.file}
              alt={data?.heading}
              layout="fill"
              width={data?.featuredImage?.mediaDetails?.width}
              height={data?.featuredImage?.mediaDetails?.height}
              priority="eager"
              objectFit="cover"
              objectPosition={`${data?.imagePosition?.horizontal} ${data?.imagePosition?.vertical}`}
            />
            <div className={styles.inner}>
              <div className="row g-0">
                <div className="col">
                  <div className={styles.content}>
                    <h2>CAREERS</h2>
                    <h1>{title}</h1>
                    {data?.url && (
                      <div className="m-auto mb-4">
                        <Button type="button">
                          <Link href={data.url}>
                            <a className={styles.nowrap}>Apply Now</a>
                          </Link>
                        </Button>
                      </div>
                    )}
                    <div className={styles.back}>
                      <Link href="/about/careers">
                        <a>
                          <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                            <div>
                              <RiArrowGoBackFill aria-label="Back to Careers" />
                            </div>
                          </IconContext.Provider>{' '}
                          Back to Careers
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.wave}>
              <img src="/assets/wave-white-top.svg" alt="Wave Bottom" width="1920" height="210" />
            </div>
          </section>
        )}
      </>
    );
  };

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd career={career} siteTitle={siteMetadata.title} />

      <CareerHeader title={title} data={headerData} categories={categories} />

      <Content>
        <Section className={styles.section}>
          <Container className="container-sm">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div
                  className={styles.careerContent}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              </div>
            </div>
            {careersData?.careerUrl && (
              <>
                <div className={styles.careerDivider}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="m-auto text-center">
                  <Button type="button">
                    <Link href={careersData?.careerUrl}>
                      <a className={styles.nowrap}>Apply Now</a>
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { career } = await getCareerBySlug(params?.slug);

  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;
  return {
    props: {
      career,
      socialImage,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { careers } = await getAllCareers({
    queryIncludes: 'index',
  });

  const paths = careers
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
