import ClassName from 'models/classname';
import Image from 'next/image';
import Link from 'next/link';
import useMediaQuery from '../../../hooks/media-query';
import styles from './PromoBanner.module.scss';

const PromoBanner = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  const isBreakpoint = useMediaQuery(575);

  return (
    <section className={mainStyles}>
      <div className={`container-${data.containerSize}`}>
        <div className="row">
          <div className="col">
            {data.link ? (
              <Link href={data.link}>
                {data?.link?.includes('http') === true ? (
                  <a href={data.link} className={styles.data__link} target="_blank" rel="noopener noreferrer">
                    {isBreakpoint
                      ? data?.mobileImage?.mediaDetails?.file && (
                          <Image
                            src={data.mobileImage.mediaDetails?.file}
                            alt={data.mobileImage.altText}
                            width={data.mobileImage.mediaDetails.width}
                            height={data.mobileImage.mediaDetails.height}
                            layout="responsive"
                          />
                        )
                      : data?.desktopImage?.mediaDetails?.file && (
                          <Image
                            src={data.desktopImage.mediaDetails?.file}
                            alt={data.desktopImage.altText}
                            width={data.desktopImage.mediaDetails.width}
                            height={data.desktopImage.mediaDetails.height}
                            layout="responsive"
                          />
                        )}
                  </a>
                ) : (
                  <a href={data.link} className={styles.data__link}>
                    {isBreakpoint
                      ? data?.mobileImage?.mediaDetails?.file && (
                          <Image
                            src={data.mobileImage.mediaDetails?.file}
                            alt={data.mobileImage.altText}
                            width={data.mobileImage.mediaDetails.width}
                            height={data.mobileImage.mediaDetails.height}
                            layout="responsive"
                          />
                        )
                      : data?.desktopImage?.mediaDetails?.file && (
                          <Image
                            src={data.desktopImage.mediaDetails?.file}
                            alt={data.desktopImage.altText}
                            width={data.desktopImage.mediaDetails.width}
                            height={data.desktopImage.mediaDetails.height}
                            layout="responsive"
                          />
                        )}
                  </a>
                )}
              </Link>
            ) : (
              <>
                {isBreakpoint
                  ? data?.mobileImage?.mediaDetails?.file && (
                      <Image
                        src={data.mobileImage.mediaDetails?.file}
                        alt={data.mobileImage.altText}
                        width={data.mobileImage.mediaDetails.width}
                        height={data.mobileImage.mediaDetails.height}
                        layout="responsive"
                      />
                    )
                  : data?.desktopImage?.mediaDetails?.file && (
                      <Image
                        src={data.desktopImage.mediaDetails?.file}
                        alt={data.desktopImage.altText}
                        width={data.desktopImage.mediaDetails.width}
                        height={data.desktopImage.mediaDetails.height}
                        layout="responsive"
                      />
                    )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
