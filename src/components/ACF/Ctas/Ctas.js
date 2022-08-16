import ClassName from 'models/classname';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Ctas.module.scss';

const Ctas = ({ className, data }) => {
  const ctasClassName = new ClassName(styles.ctas);
  ctasClassName.addIf(className, className);

  const mainStyles = ctasClassName.toString();

  return (
    <section className={mainStyles}>
      {data &&
        data?.map((item, index) => {
          if (item.buttonStyle === 'Link With Icon') {
            return (
              <>
                {item?.ctaLink && item.isDownloadLink === true ? (
                  <Link href={item?.ctaLink} key={index}>
                    <a
                      className={`d-flex flex-row flex-no-wrap justify-content-start align-items-center 
                    ${styles.link} ${
                        item.linkColour === 'Light' ? styles.light : item.linkColour === 'Dark' ? styles.dark : ''
                      }`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon && (
                        <Image
                          src={item?.icon?.mediaDetails?.file}
                          layout="fixed"
                          width={item.icon.mediaDetails.width}
                          height={item.icon.mediaDetails.height}
                          alt={item.ctaText}
                        />
                      )}
                      {item.ctaText}
                    </a>
                  </Link>
                ) : (
                  <Link href={item?.ctaLink} key={index}>
                    <a
                      className={`d-flex flex-row flex-no-wrap justify-content-start align-items-center 
                    ${styles.link} ${
                        item.linkColour === 'Light' ? styles.light : item.linkColour === 'Dark' ? styles.dark : ''
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon && (
                        <Image
                          src={item?.icon?.mediaDetails?.file}
                          layout="fixed"
                          width={item.icon.mediaDetails.width}
                          height={item.icon.mediaDetails.height}
                          alt={item.ctaText}
                        />
                      )}
                      {item.ctaText}
                    </a>
                  </Link>
                )}
              </>
            );
          } else {
            return (
              <>
                {item?.ctaLink && (
                  <Link key={index} value={item.ctaText} href={item?.ctaLink}>
                    {item?.ctaLink?.includes('http') === true ? (
                      item?.isDownloadLink === true ? (
                        <a
                          className={`${styles.btn} ${
                            item.buttonStyle === 'Primary'
                              ? styles.btn__primary
                              : item.buttonStyle === 'Secondary'
                              ? styles.btn__secondary
                              : ''
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          {item.hasIcon === true && (
                            <>
                              {item.icon && (
                                <span className={styles.btnIcon}>
                                  <Image
                                    src={item?.icon?.mediaDetails?.file}
                                    layout="fixed"
                                    quality="100"
                                    width="25"
                                    height="25"
                                    alt={item.ctaText}
                                  />
                                </span>
                              )}
                            </>
                          )}
                          <span className={styles.btnText}>{item.ctaText}</span>
                        </a>
                      ) : (
                        <a
                          className={`${styles.btn} ${
                            item.buttonStyle === 'Primary'
                              ? styles.btn__primary
                              : item.buttonStyle === 'Secondary'
                              ? styles.btn__secondary
                              : ''
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.hasIcon === true && (
                            <>
                              {item.icon && (
                                <span className={styles.btnIcon}>
                                  <Image
                                    src={item?.icon?.mediaDetails?.file}
                                    layout="fixed"
                                    quality="100"
                                    width="25"
                                    height="25"
                                    alt={item.ctaText}
                                  />
                                </span>
                              )}
                            </>
                          )}
                          <span className={styles.btnText}>{item.ctaText}</span>
                        </a>
                      )
                    ) : (
                      <a
                        className={`${styles.btn} ${
                          item.buttonStyle === 'Primary'
                            ? styles.btn__primary
                            : item.buttonStyle === 'Secondary'
                            ? styles.btn__secondary
                            : ''
                        }`}
                      >
                        {item.hasIcon === true && (
                          <>
                            {item.icon && (
                              <span className={styles.btnIcon}>
                                <Image
                                  src={item.icon.mediaDetails?.file}
                                  layout="fixed"
                                  quality="100"
                                  width="25"
                                  height="25"
                                  alt={item.ctaText}
                                />
                              </span>
                            )}
                          </>
                        )}
                        <span className={styles.btnText}>{item.ctaText}</span>
                      </a>
                    )}
                  </Link>
                )}
              </>
            );
          }
        })}
    </section>
  );
};

export default Ctas;
