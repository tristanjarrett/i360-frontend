import ClassName from 'models/classname';
import Link from 'next/link';
import Image from 'next/image';
import Button from 'components/Button';
import ImageObject from 'components/ImageObject';
import blurData from 'components/blurData';

import styles from './SectionWithTextAndImage.module.scss';

const SectionWithTextAndImage = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  data = data?.sectionWtai || data;

  return (
    <>
      {data && (
        <section className={mainStyles} id={data.sectionId}>
          {data.hasWaveTop === true &&
            (data.waveTopColour === 'grey' ? (
              <div className={styles.wave_top}>
                <ImageObject src="/assets/wave-grey-top.svg" alt="Wave Top" width="1920.354" height="80.336" />
              </div>
            ) : data.waveTopColour === 'white' ? (
              <div className={styles.wave_top}>
                <ImageObject src="/assets/wave-white-top.svg" alt="Wave Top" width="1920.354" height="80.336" />
              </div>
            ) : null)}
          <div
            className={`${styles.wrapper}
       ${data.backgroundColour === 'grey' ? styles.grey : data.backgroundColour === 'white' ? styles.white : ''}`}
            style={{
              paddingTop: `${
                data?.hasWaveTop === true ? '3rem' : data?.removeTopBottomMargins?.top === true ? '3rem' : '120px'
              }`,
              paddingBottom: `${
                data.hasWaveBottom === true ? '3rem' : data?.removeTopBottomMargins?.bottom === true ? '3rem' : '120px'
              }`,
            }}
          >
            <div className="container p-0 p-lg-3">
              <div className="row gx-5 align-items-center">
                <div
                  className={`col-12 col-lg-6 ${
                    data.imagePosition === 'Left'
                      ? 'order-1 order-lg-1'
                      : data.imagePosition === 'Right'
                      ? 'order-1 order-lg-2'
                      : 'order-1 order-lg-1'
                  }`}
                >
                  {data?.image && (
                    <div
                      className={`${
                        data.imagePosition === 'Left'
                          ? styles.pebble_left
                          : data.imagePosition === 'Right'
                          ? styles.pebble_right
                          : ''
                      }`}
                    >
                      <Image
                        src={data.image.mediaDetails?.file}
                        alt={data.image.altText}
                        width={data.image.mediaDetails.width}
                        height={data.image.mediaDetails.height}
                        layout="responsive"
                        styles={{ minheight: '400px' }}
                        placeholder="blur"
                        blurDataURL={blurData}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`col-12 col-lg-6 ${
                    data.imagePosition === 'Left'
                      ? 'order-2 order-lg-2'
                      : data.imagePosition === 'Right'
                      ? 'order-1 order-lg-1'
                      : 'order-1 order-lg-2'
                  }`}
                >
                  <div className={styles.content}>
                    {data?.imageAsHeading?.mediaDetails?.file && (
                      <div className={styles.imageAsHeading}>
                        <Image
                          src={data.imageAsHeading.mediaDetails?.file}
                          alt={data.imageAsHeading.altText}
                          width={data.imageAsHeading.mediaDetails.width}
                          height={data.imageAsHeading.mediaDetails.height}
                          layout="responsive"
                          placeholder="blur"
                          blurDataURL={blurData}
                        />
                      </div>
                    )}
                    {data?.subheading && <h3>{data.subheading}</h3>}
                    {data?.heading && <h2>{data.heading}</h2>}
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.text }} />
                    {data.ctaLink && (
                      <Button type="button" value={data.ctaText} className={styles.Button}>
                        <Link href={data.ctaLink}>
                          {data.ctaLink.includes('http') === true ? (
                            <a
                              href={data.ctaLink}
                              className={styles.data__link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {data.ctaText}
                            </a>
                          ) : (
                            <a href={data.ctaLink} className={styles.data__link}>
                              {data.ctaText}
                            </a>
                          )}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data.hasWaveBottom === true &&
            (data.waveBottomColour === 'grey' ? (
              <div className={styles.wave_bottom}>
                <ImageObject src="/assets/wave-grey-bottom.svg" alt="Wave Bottom" width="1920.354" height="80.336" />
              </div>
            ) : data.waveBottomColour === 'white' ? (
              <div className={styles.wave_bottom}>
                <ImageObject src="/assets/wave-white-bottom.svg" alt="Wave Bottom" width="1920.354" height="80.336" />
              </div>
            ) : null)}
        </section>
      )}
    </>
  );
};

export default SectionWithTextAndImage;
