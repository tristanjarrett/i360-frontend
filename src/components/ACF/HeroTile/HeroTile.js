import React from 'react';
import { useState } from 'react';
import ClassName from 'models/classname';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import useMediaQuery from '../../../hooks/media-query';
import styles from './HeroTile.module.scss';

const HeroTile = ({ className, title, text, icon, hasLinks, links, hasCtas, ctas, toggleOnMobile, masterLink }) => {
  const tilesClassName = new ClassName(styles.tile__inner);
  tilesClassName.addIf(className, className);

  const [isActive, setIsActive] = useState(false);

  const isBreakpoint = useMediaQuery(1024);

  const mainStyles = tilesClassName.toString();
  return (
    <section className={mainStyles}>
      {isBreakpoint && toggleOnMobile === true ? (
        <div className={`${styles.acc} ${isActive ? styles.active : ''}`}>
          <div className={styles.accToggle} onClick={() => setIsActive(!isActive)}>
            <h5>{title}</h5>
            {isActive ? (
              <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                <div>
                  <FaChevronUp />
                </div>
              </IconContext.Provider>
            ) : (
              <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                <div>
                  <FaChevronDown />
                </div>
              </IconContext.Provider>
            )}
          </div>
          {isActive && (
            <div className={styles.accContent}>
              <div className={styles.content}>
                {text && <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />}
                {hasLinks === true && (
                  <>
                    {links &&
                      links.map((link, index) => {
                        return (
                          <>
                            {link?.linkUrl?.uri ? (
                              <Link key={index} href={link?.linkUrl?.uri}>
                                <a className={styles.link}>
                                  {link.linkText}
                                  <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                    <div>
                                      <FaChevronRight aria-label={link.linkText} />
                                    </div>
                                  </IconContext.Provider>
                                </a>
                              </Link>
                            ) : (
                              link?.manualLink && (
                                <Link key={index} href={link?.manualLink}>
                                  <a className={styles.link}>
                                    {link.linkText}
                                    <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                      <div>
                                        <FaChevronRight aria-label={link.linkText} />
                                      </div>
                                    </IconContext.Provider>
                                  </a>
                                </Link>
                              )
                            )}
                          </>
                        );
                      })}
                  </>
                )}
              </div>
              {hasCtas === true && (
                <>
                  {ctas &&
                    ctas.map((cta, index) => {
                      return (
                        <>
                          {cta?.ctaLink && (
                            <Link key={index} href={cta?.ctaLink}>
                              <a className={`${styles.cta} d-flex flex-row justify-content-start align-items-center`}>
                                {cta.ctaIcon.mediaDetails?.file && (
                                  <Image
                                    src={cta.ctaIcon.mediaDetails?.file}
                                    layout="fixed"
                                    width={cta.ctaIcon.mediaDetails.width}
                                    height={cta.ctaIcon.mediaDetails.height}
                                    alt={cta.ctaText}
                                  />
                                )}
                                {cta.ctaText}
                              </a>
                            </Link>
                          )}
                        </>
                      );
                    })}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          {title && (
            <div className={`${styles.title} d-flex flex-row flex-nowrap justify-content-start align-items-center`}>
              {icon && <Image src={icon.mediaDetails?.file} layout="fixed" width="50" height="50" alt={title} />}
              <h5>{title}</h5>
            </div>
          )}
          <div className={styles.content}>
            {masterLink === true && !isBreakpoint ? (
              <div className="d-flex justify-content-start w-100">
                {text && (
                  <div
                    className={styles.text}
                    style={{ flex: '1 1 auto' }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                )}
                <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                  <div className="ml-auto" style={{ width: '15px', flex: '0 0 15px' }}>
                    <FaChevronRight />
                  </div>
                </IconContext.Provider>
              </div>
            ) : (
              <>{text && <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />}</>
            )}
            {hasLinks === true && (
              <>
                {links &&
                  links.map((link, index) => {
                    return (
                      <>
                        {link?.linkUrl?.uri ? (
                          <Link key={index} href={link?.linkUrl?.uri}>
                            <a className={styles.link}>
                              {link.linkText}
                              <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                <div>
                                  <FaChevronRight aria-label={link.linkText} />
                                </div>
                              </IconContext.Provider>
                            </a>
                          </Link>
                        ) : (
                          link?.manualLink && (
                            <Link key={index} href={link?.manualLink}>
                              <a className={styles.link}>
                                {link.linkText}
                                <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                  <div>
                                    <FaChevronRight aria-label={link.linkText} />
                                  </div>
                                </IconContext.Provider>
                              </a>
                            </Link>
                          )
                        )}
                      </>
                    );
                  })}
              </>
            )}
          </div>
          {hasCtas === true && (
            <>
              {ctas &&
                ctas.map((cta, index) => {
                  return (
                    <>
                      {cta?.ctaLink && (
                        <Link key={index} href={cta?.ctaLink}>
                          <a className={`${styles.cta} d-flex flex-row justify-content-start align-items-center`}>
                            {cta.ctaIcon.mediaDetails?.file && (
                              <Image
                                src={cta.ctaIcon.mediaDetails?.file}
                                layout="fixed"
                                width={cta.ctaIcon.mediaDetails.width}
                                height={cta.ctaIcon.mediaDetails.height}
                                alt={cta.ctaText}
                              />
                            )}
                            {cta.ctaText}
                          </a>
                        </Link>
                      )}
                    </>
                  );
                })}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default HeroTile;
