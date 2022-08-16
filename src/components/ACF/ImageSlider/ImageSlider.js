import ClassName from 'models/classname';
import Image from 'next/image';
import ImageObject from 'components/ImageObject';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './ImageSlider.module.scss';

const ImageSlider = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  data = data?.imageSlider;

  const slides = data?.images;

  const responsive = {
    mobile: {
      breakpoint: { max: 6000, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      {data && (
        <section className={mainStyles}>
          {data.hasWaveTop === true &&
            (data.waveTopColour === 'grey' ? (
              <div className={styles.wave_top}>
                <ImageObject src="/assets/wave-grey-top.svg" alt="Wave Top" width="1920" height="210" />
              </div>
            ) : data.waveTopColour === 'white' ? (
              <div className={styles.wave_top}>
                <ImageObject src="/assets/wave-white-top.svg" alt="Wave Top" width="1920" height="210" />
              </div>
            ) : null)}
          <div
            className={styles.wrapper}
            style={{
              backgroundColor:
                data.backgroundColour === 'white'
                  ? 'white'
                  : data.backgroundColour === 'grey'
                  ? '#f5f5f5'
                  : 'transparent',
              paddingTop: `${
                data?.hasWaveTop === true ? '5em' : data?.removeTopBottomMargins?.top === true ? '3em' : '15%'
              }`,
              paddingBottom: `${
                data.hasWaveBottom === true ? '5em' : data?.removeTopBottomMargins?.bottom === true ? '3em' : '15%'
              }`,
            }}
          >
            {data.hasHeading === 'true' ||
              (data.hasText === 'true' && (
                <div className="row">
                  <div className="col text-center">
                    {data.hasHeading && <h2>{data.heading}</h2>}
                    {data.hasText && <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.text }} />}
                  </div>
                </div>
              ))}
            {slides && (
              <div className={`container-${data.containerSize}`}>
                <div className="row">
                  <div className="col">
                    <Carousel
                      swipeable={true}
                      draggable={true}
                      showDots={true}
                      responsive={responsive}
                      ssr={false}
                      infinite={true}
                      autoPlay={true}
                      autoPlaySpeed={10000}
                      keyBoardControl={true}
                      containerClass={styles.carousel_container}
                      arrows={false}
                      dotListClass={styles.custom_dots}
                      itemClass={styles.carousel_item}
                    >
                      {slides.map((item, index) => {
                        return (
                          <div key={index} className={`${styles.item} col-12`}>
                            {item?.image?.mediaDetails?.file && (
                              <Image
                                src={item?.image?.mediaDetails?.file}
                                alt={item?.image?.altText}
                                layout="fill"
                                objectFit="cover"
                              />
                            )}
                          </div>
                        );
                      })}
                    </Carousel>
                  </div>
                </div>
              </div>
            )}
          </div>
          {data.hasWaveBottom === true &&
            (data.waveBottomColour === 'grey' ? (
              <div className={styles.wave_bottom}>
                <ImageObject src="/assets/wave-grey-bottom.svg" alt="Wave Bottom" width="1920" height="210" />
              </div>
            ) : data.waveBottomColour === 'white' ? (
              <div className={styles.wave_bottom}>
                <ImageObject src="/assets/wave-white-bottom.svg" alt="Wave Bottom" width="1920" height="210" />
              </div>
            ) : null)}
        </section>
      )}
    </>
  );
};

export default ImageSlider;
