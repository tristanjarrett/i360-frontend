import { React } from 'react';
import ClassName from 'models/classname';
import Container from 'components/Container';
import Link from 'next/link';
import Image from 'next/image';
// import ImageObject from 'components/ImageObject';
import Button from 'components/Button';
import styles from './ParallaxSection.module.scss';

const ParallaxSection = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  const layers = data.parallax.layer;

  return (
    <>
      {data.parallax && (
        <section className={mainStyles}>
          <div
            className={styles.wrapper}
            style={{
              backgroundColor: `${data.parallax?.backgroundColour}`,
            }}
          >
            <Container className="container">
              {layers && (
                <div className={styles.layers}>
                  {layers.map((item, index) => {
                    const width = 100 - item.horizontal;
                    return (
                      <div
                        key={index}
                        className={styles.layer}
                        style={{
                          top: `${item.vertical === null ? 0 : item.vertical}%`,
                          left: `${item.horizontal === null ? '0' : item.horizontal}%`,
                          opacity: item.opacity,
                          maxWidth: `${item?.image?.mediaDetails?.width}px`,
                          height: `${item?.image?.mediaDetails?.height}px`,
                          width: `${width}%`,
                        }}
                      >
                        {item?.image?.mediaDetails?.file && (
                          <Image
                            src={item.image.mediaDetails?.file}
                            alt={item.image.altText}
                            width={item?.image?.mediaDetails?.width}
                            height={item?.image?.mediaDetails?.height}
                            layout="responsive"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className={styles.content}>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <h3>{data.parallax.subheading}</h3>
                      <h2>{data.parallax.heading}</h2>
                      <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.parallax.text }} />
                      {data.parallax.ctaLink && (
                        <Button type="button" value={data.parallax.ctaText}>
                          <Link href={data.parallax.ctaLink}>
                            <a href={data.parallax.ctaLink} className={styles.data__link}>
                              {data.parallax.ctaText}
                            </a>
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </section>
      )}
    </>
  );
};

export default ParallaxSection;
