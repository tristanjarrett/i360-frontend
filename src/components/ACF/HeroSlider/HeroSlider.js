import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import useMediaQuery from '../../../hooks/media-query';
import ClassName from 'models/classname';
import Link from 'next/link';
import Image from 'next/image';
import Wave from 'components/Wave';
import Button from 'components/Button';

import 'keen-slider/keen-slider.min.css';
import styles from './HeroSlider.module.scss';

// Define Arrows
function Arrow(props) {
  const disabeld = props.disabled ? `${styles.arrow__disabled}` : '';
  return (
    <svg
      onClick={props.onClick}
      className={`${styles.arrow} ${props.left ? `${styles.arrow__left}` : `${styles.arrow__right}`} ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
}

const HeroSlider = ({ className, data }) => {
  const sliderClassName = new ClassName(styles.slider);
  sliderClassName.addIf(className, className);

  const mainStyles = sliderClassName.toString();

  const slides = data.heroSlider.slides;

  const noSlides = slides.length;

  const loop = data.heroSlider.loopSlides;

  const isBreakpoint = useMediaQuery(575);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [options, setOptions] = useState();
  // const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(options, [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 5000);
      }
      slider.on('created', () => {
        slider.container.addEventListener('mouseover', () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener('mouseout', () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on('dragStarted', clearNextTimeout);
      slider.on('animationEnded', nextTimeout);
      slider.on('updated', nextTimeout);
    },
  ]);

  useEffect(() => {
    setOptions({
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      // created() {
      //   setLoaded(true);
      // },
      // updated() {
      //   setLoaded(true);
      // },
      rtl: true,
      loop: loop === true ? true : false,
      drag: true,
      rubberband: true,
      renderMode: 'performance',
    });
  }, [slides, loop]);

  return (
    <>
      {slides && (
        <section className={`${mainStyles} container-fluid p-0`}>
          <div className="row no-gutters">
            <div className="col">
              <div className={sliderClassName.toString()}>
                <div className={styles.slider__nav}>
                  <div ref={sliderRef} className={`${styles.slider__inner} keen-slider`}>
                    {slides.map((slide, index) => {
                      return (
                        <div
                          className={`keen-slider__slide slide${index} ${styles.slide}`}
                          key={index}
                          style={{ backgroundColor: slide.backgroundColor || 'transparent' }}
                        >
                          {isBreakpoint ? (
                            <div className="mobile">
                              {slide?.mobileImage?.mediaDetails?.file && (
                                <Image
                                  src={slide.mobileImage.mediaDetails?.file}
                                  layout="fill"
                                  objectFit="cover"
                                  alt={slide.mobileImage.altText}
                                  priority
                                  sizes="(max-width: 512px) 100vw, 512px"
                                />
                              )}
                            </div>
                          ) : (
                            <div className="desktop">
                              {slide?.desktopImage?.mediaDetails?.file && (
                                <Image
                                  src={slide.desktopImage.mediaDetails?.file}
                                  layout="fill"
                                  objectFit="cover"
                                  alt={slide.desktopImage.altText}
                                  priority
                                  sizes="(max-width: 2000px) 100vw, 2000px"
                                />
                              )}
                            </div>
                          )}
                          <div className={styles.overlay}></div>
                          <div className={styles.inner}>
                            <div className={styles.content}>
                              {slide.subheading && <h2>{slide.subheading}</h2>}
                              {slide.heading && <h1>{slide.heading}</h1>}
                              {slide.text && (
                                <div className={styles.text} dangerouslySetInnerHTML={{ __html: slide.text }} />
                              )}
                              {slide?.buttonLink && (
                                <Button type="button" value={slide.button} className={styles.Button}>
                                  <Link href={slide.buttonLink}>
                                    <a>{slide.button}</a>
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {noSlides > 1 && (
                    <>
                      {instanceRef.current && (
                        <div className={styles.arrows}>
                          <Arrow
                            left
                            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                            disabled={currentSlide === 0}
                          />

                          <Arrow
                            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                            disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                          />
                        </div>
                      )}
                      {instanceRef.current && (
                        <div className={styles.dots}>
                          {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                            const isActive = currentSlide === idx;
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  instanceRef.current?.moveToIdx(idx);
                                }}
                                className={`${styles.dot} ${isActive ? `${styles.active}` : ''}`}
                              ></button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.wave}>
                  <Wave src="/assets/wave-grey-top.svg" alt="Wave Bottom" width="1920" height="210" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSlider;
