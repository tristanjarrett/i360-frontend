import ClassName from 'models/classname';
import Link from 'next/link';
import Button from 'components/Button';
import Image from 'next/image';
import ImageObject from 'components/ImageObject';
import blurData from 'components/blurData';
import styles from './SectionWithBackgroundAndText.module.scss';

const SectionWithBackgroundAndCenteredText = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  data = data.sectionWbat;

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
            className={styles.wrapper}
            style={{
              backgroundColor: data?.backgroundColor,
            }}
          >
            {data?.backgroundImage && <div className={styles.overlay}></div>}
            {data?.backgroundImage && (
              <Image
                src={data?.backgroundImage?.mediaDetails?.file}
                alt={data?.heading}
                layout="fill"
                width={data?.backgroundImage?.mediaDetails?.width}
                height={data?.backgroundImage?.mediaDetails?.height}
                priority="eager"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            )}
            <div
              className={styles.content}
              style={{
                paddingTop: `${
                  data?.hasWaveTop === true ? '3rem' : data?.removeTopBottomMargins?.top === true ? '3rem' : '120px'
                }`,
                paddingBottom: `${
                  data.hasWaveBottom === true
                    ? '3rem'
                    : data?.removeTopBottomMargins?.bottom === true
                    ? '3rem'
                    : '120px'
                }`,
              }}
            >
              <div className="container-sm">
                {data.hasImage === true && (
                  <div className="row align-items-center">
                    <div
                      className={`col-12 ${
                        data.imagePosition === 'Left'
                          ? 'col-lg-6 order-1 order-lg-1'
                          : data.imagePosition === 'Right'
                          ? 'col-lg-6 order-1 order-lg-2'
                          : ''
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
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={`col-12 ${
                        data.imagePosition === 'Left'
                          ? 'col-lg-6 order-2 order-lg-2'
                          : data.imagePosition === 'Right'
                          ? 'col-lg-6 order-1 order-lg-1'
                          : ''
                      }`}
                      style={{
                        textAlign: `${
                          data.textAlignment === 'Center'
                            ? 'center'
                            : data.textAlignment === 'Right'
                            ? 'right'
                            : data.textAlignment === 'Left'
                            ? 'left'
                            : 'inherit'
                        }`,
                      }}
                    >
                      {data.subtitle && (
                        <h3 style={{ color: `${data?.textColour ? data?.textColour : 'white'}` }}>{data.subtitle}</h3>
                      )}
                      {data.heading && (
                        <h2
                          className={`${
                            data.headingSize === 'xl'
                              ? 'fs-1'
                              : data.headingSize === 'lg'
                              ? 'fs-2'
                              : data.headingSize === 'md'
                              ? 'fs-3'
                              : data.headingSize === 'sm'
                              ? 'fs-4'
                              : ''
                          }`}
                          style={{ color: `${data?.textColour ? data?.textColour : 'white'}` }}
                        >
                          {data.heading}
                        </h2>
                      )}
                      {data.text && (
                        <div
                          className={styles.text}
                          style={{ color: `${data?.textColour ? data?.textColour : 'white'}` }}
                          dangerouslySetInnerHTML={{ __html: data.text }}
                        />
                      )}
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
                )}
                {data.hasImage === null && (
                  <div
                    className="row"
                    style={{
                      justifyContent:
                        data.contentPosition === 'left'
                          ? 'flex-start'
                          : data.contentPosition === 'right'
                          ? 'flex-end'
                          : data.contentPosition === 'center'
                          ? 'center'
                          : '',
                    }}
                  >
                    <div
                      className={`col-12 ${
                        data.contentSize === 'full'
                          ? ''
                          : data.contentSize === 'half'
                          ? 'col-lg-6'
                          : data.contentSize === 'third'
                          ? 'col-lg-8'
                          : ''
                      }`}
                      style={{
                        textAlign: `${
                          data.textAlignment === 'Center'
                            ? 'center'
                            : data.textAlignment === 'Right'
                            ? 'right'
                            : data.textAlignment === 'Left'
                            ? 'left'
                            : 'inherit'
                        }`,
                      }}
                    >
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
                      {data.subtitle && (
                        <h3 style={{ color: `${data?.textColour ? data?.textColour : 'white'}` }}>{data.subtitle}</h3>
                      )}
                      {data.heading && (
                        <h2
                          className={`${
                            data.headingSize === 'xl'
                              ? 'fs-1'
                              : data.headingSize === 'lg'
                              ? 'fs-2'
                              : data.headingSize === 'md'
                              ? 'fs-3'
                              : data.headingSize === 'sm'
                              ? 'fs-4'
                              : ''
                          }`}
                          style={{ color: `${data?.textColour ? data?.textColour : 'white'}` }}
                        >
                          {data.heading}
                        </h2>
                      )}
                      {data.text && (
                        <div
                          className={styles.text}
                          style={{ color: `${data?.textColour ? data?.textColour : 'white'}` }}
                          dangerouslySetInnerHTML={{ __html: data.text }}
                        />
                      )}
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
                )}
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

export default SectionWithBackgroundAndCenteredText;
