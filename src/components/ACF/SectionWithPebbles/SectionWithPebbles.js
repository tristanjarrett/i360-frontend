import ClassName from 'models/classname';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';
// import useMediaQuery from '../../../hooks/media-query';
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './SectionWithPebbles.module.scss';

const SectionWithPebbles = ({ className, data }) => {
  const itemsClassName = new ClassName(styles.items);
  itemsClassName.addIf(className, className);

  const mainStyles = itemsClassName.toString();

  data = data.sectionWp;

  const pebbles = data.pebble;

  // const isBreakpoint = useMediaQuery(768);

  // const responsive = {
  //   mobile: {
  //     breakpoint: { max: 768, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1,
  //   },
  // };

  return (
    <>
      {data && (
        <section
          className={mainStyles}
          style={{
            backgroundImage:
              data?.backgroundImage?.mediaDetails?.file !== undefined
                ? `url('https://i360.imgix.net/wp-content/uploads/${data?.backgroundImage?.mediaDetails?.file}')`
                : '',
            backgroundColor: data?.backgroundColor,
          }}
        >
          {data?.backgroundImage && <div className={styles.overlay}></div>}
          <div className={styles.content}>
            <div className={`container ${styles.container}`}>
              {data?.title ||
                data?.subtitle ||
                (data?.hasTopText && (
                  <div className={`row ${styles.heading}`}>
                    <div className="col text-center">
                      {data?.title && <h2>{data.title}</h2>}
                      {data?.subtitle && <h3>{data.subtitle}</h3>}
                      {data.hasTopText && (
                        <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.topText }} />
                      )}
                    </div>
                  </div>
                ))}
              <div className="row g-0">
                <>
                  {pebbles &&
                    pebbles.map((item, index) => {
                      return (
                        <div key={index} className={`${styles.item} col-12 col-lg-6`}>
                          {item?.image?.mediaDetails?.file && item?.ctaLink && (
                            <div className={styles.item__image}>
                              <Link href={item.ctaLink}>
                                <a>
                                  <Image
                                    src={item.image.mediaDetails?.file}
                                    alt={item.image.altText}
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                </a>
                              </Link>
                            </div>
                          )}
                          <div className={styles.item__content}>
                            <h4>{item.title}</h4>
                            <div className={styles.text}>
                              <p>{item.text}</p>
                            </div>
                            {item?.ctaLink && (
                              <Link href={item.ctaLink}>
                                <a className={styles.item__link}>
                                  <span>{item.ctaText}</span>
                                  <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                    <div>
                                      <FaChevronRight aria-label={item.ctaText} />
                                    </div>
                                  </IconContext.Provider>
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </>
              </div>
              {data.hasBottomText && (
                <div className="row">
                  <div className="col">
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.bottomText }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SectionWithPebbles;
