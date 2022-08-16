import ClassName from 'models/classname';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Cta.module.scss';

const Cta = ({ className, data }) => {
  const ctasClassName = new ClassName(styles.ctas);
  ctasClassName.addIf(className, className);

  const mainStyles = ctasClassName.toString();

  return (
    <section className={mainStyles}>
      {data.buttonStyle === 'Link With Icon' ? (
        <>
          {data?.ctaLink && data.isDownloadLink === true ? (
            <Link href={data?.ctaLink}>
              <a
                className={`d-flex flex-row flex-no-wrap justify-content-start align-datas-center 
                    ${styles.link} ${
                  data.linkColour === 'Light' ? styles.light : data.linkColour === 'Dark' ? styles.dark : ''
                }`}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.icon && (
                  <Image
                    src={data?.icon?.mediaDetails?.file}
                    layout="fixed"
                    width={data.icon.mediaDetails.width}
                    height={data.icon.mediaDetails.height}
                    alt={data.ctaText}
                  />
                )}
                {data.ctaText}
              </a>
            </Link>
          ) : (
            <Link href={data?.ctaLink}>
              <a
                className={`d-flex flex-row flex-no-wrap justify-content-start align-datas-center 
                    ${styles.link} ${
                  data.linkColour === 'Light' ? styles.light : data.linkColour === 'Dark' ? styles.dark : ''
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.icon && (
                  <Image
                    src={data?.icon?.mediaDetails?.file}
                    layout="fixed"
                    width={data.icon.mediaDetails.width}
                    height={data.icon.mediaDetails.height}
                    alt={data.ctaText}
                  />
                )}
                {data.ctaText}
              </a>
            </Link>
          )}
        </>
      ) : (
        <>
          {data?.ctaLink && (
            <Link value={data.ctaText} href={data?.ctaLink}>
              {data?.ctaLink?.includes('http') === true ? (
                data?.isDownloadLink === true ? (
                  <a
                    className={`${styles.btn} ${
                      data.buttonStyle === 'Primary'
                        ? styles.btn__primary
                        : data.buttonStyle === 'Secondary'
                        ? styles.btn__secondary
                        : ''
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {data.hasIcon === true && (
                      <>
                        {data.icon && (
                          <span className={styles.btnIcon}>
                            <Image
                              src={data?.icon?.mediaDetails?.file}
                              layout="fixed"
                              quality="100"
                              width="25"
                              height="25"
                              alt={data.ctaText}
                            />
                          </span>
                        )}
                      </>
                    )}
                    <span className={styles.btnText}>{data.ctaText}</span>
                  </a>
                ) : (
                  <a
                    className={`${styles.btn} ${
                      data.buttonStyle === 'Primary'
                        ? styles.btn__primary
                        : data.buttonStyle === 'Secondary'
                        ? styles.btn__secondary
                        : ''
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.hasIcon === true && (
                      <>
                        {data.icon && (
                          <span className={styles.btnIcon}>
                            <Image
                              src={data?.icon?.mediaDetails?.file}
                              layout="fixed"
                              quality="100"
                              width="25"
                              height="25"
                              alt={data.ctaText}
                            />
                          </span>
                        )}
                      </>
                    )}
                    <span className={styles.btnText}>{data.ctaText}</span>
                  </a>
                )
              ) : (
                <a
                  className={`${styles.btn} ${
                    data.buttonStyle === 'Primary'
                      ? styles.btn__primary
                      : data.buttonStyle === 'Secondary'
                      ? styles.btn__secondary
                      : ''
                  }`}
                >
                  {data.hasIcon === true && (
                    <>
                      {data.icon && (
                        <span className={styles.btnIcon}>
                          <Image
                            src={data?.icon?.mediaDetails?.file}
                            layout="fixed"
                            quality="100"
                            width="25"
                            height="25"
                            alt={data.ctaText}
                          />
                        </span>
                      )}
                    </>
                  )}
                  <span className={styles.btnText}>{data.ctaText}</span>
                </a>
              )}
            </Link>
          )}
        </>
      )}
    </section>
  );
};

export default Cta;
