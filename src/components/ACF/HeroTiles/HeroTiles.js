import ClassName from 'models/classname';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import ImageObject from 'components/ImageObject';
import useMediaQuery from '../../../hooks/media-query';
import styles from './HeroTiles.module.scss';
import HeroTile from '../HeroTile';

const HeroTiles = ({ className, data }) => {
  const tilesClassName = new ClassName(styles.tiles);
  tilesClassName.addIf(className, className);

  const mainStyles = tilesClassName.toString();
  data = data?.tiles;
  const tiles = data?.tile;
  const noTiles = tiles?.length;

  const isBreakpoint = useMediaQuery(1024);

  return (
    <>
      {tiles && (
        <section className={`${mainStyles} ${data.isAfterHeroSlider === true ? styles.slider : ''}`}>
          <div className={`${styles.section}`}>
            <div className={`container ${styles.container}`}>
              <div className={styles.inner}>
                <div className={noTiles <= '3' ? styles.items : styles.itemsLg}>
                  {tiles &&
                    tiles.map((tile, index) => {
                      return (
                        <>
                          {tile.mobileOnly === true ? (
                            <div key={index} className={`${styles.tile} ${styles.mobileOnlyTile}`}>
                              {tile?.mobileOnlyTile?.map((link, i) => {
                                return (
                                  <>
                                    {link?.url && (
                                      <Link key={i} href={link?.url}>
                                        <a>
                                          {link?.icon?.mediaDetails?.file && (
                                            <div className={styles.icon}>
                                              <Image
                                                src={link.icon.mediaDetails?.file}
                                                layout="fixed"
                                                width="50"
                                                height="50"
                                                alt={link.heading}
                                              />
                                            </div>
                                          )}
                                          {link.heading}
                                          <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                            <div className={styles.chevron}>
                                              <FaChevronRight aria-label={link.heading} />
                                            </div>
                                          </IconContext.Provider>
                                        </a>
                                      </Link>
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          ) : tile.tileMasterLink === true ? (
                            <div key={index} className={styles.tile}>
                              <Link
                                href={
                                  !tile?.tileMasterLinkUrl?.uri
                                    ? tile?.tileMasterLinkHash
                                    : tile?.tileMasterLinkUrl?.uri
                                }
                              >
                                <a className={styles.masterlink}>
                                  <HeroTile
                                    title={tile.title}
                                    icon={tile.icon}
                                    text={tile.text}
                                    masterLink={tile.tileMasterLink}
                                  />
                                  <>
                                    {isBreakpoint ? (
                                      <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                        <div className={styles.masterLinkUrl}>
                                          <FaChevronRight aria-label={tile.title} />
                                        </div>
                                      </IconContext.Provider>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                </a>
                              </Link>
                            </div>
                          ) : (
                            <div key={index} className={styles.tile}>
                              <HeroTile
                                tile={tile}
                                title={tile.title}
                                icon={tile.icon}
                                text={tile.text}
                                hasLinks={tile.hasListOfLinks}
                                links={tile.links}
                                hasCtas={tile.hasBottomCtasWithIcons}
                                ctas={tile.bottomCtaWithIcon}
                                toggleOnMobile={tile.toggleOnMobile}
                              />
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {data.waveBottom === true && (
            <div className={styles.wave}>
              <ImageObject src="/assets/wave-grey-bottom.svg" alt="Wave Bottom" width="1920" height="210" />
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default HeroTiles;
