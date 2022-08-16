import ClassName from 'models/classname';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa';
import ImageObject from 'components/ImageObject';
import styles from './HeroNavigation.module.scss';

const HeroNavigation = ({ className, data }) => {
  const tilesClassName = new ClassName(styles.tiles);
  tilesClassName.addIf(className, className);

  const mainStyles = tilesClassName.toString();
  data = data?.tiles;
  const tiles = data?.tile;
  const noTiles = tiles?.length;

  return (
    <>
      {tiles && (
        <section className={mainStyles}>
          <div
            className={`${styles.section}
       ${data.backgroundColour === 'grey' ? styles.grey : data.backgroundColour === 'white' ? styles.white : ''}`}
          >
            <div className={`container ${styles.container}`}>
              <div className={styles.inner}>
                <div className={noTiles <= '3' ? styles.items : styles.itemsLg}>
                  {tiles &&
                    tiles.map((tile, index) => {
                      return (
                        <div
                          key={index}
                          className={`${styles.tile}
                        ${
                          data.backgroundColour === 'grey'
                            ? styles.tileGrey
                            : data.backgroundColour === 'white'
                            ? styles.tileWhite
                            : ''
                        }`}
                        >
                          <Link href={`#${tile?.tileLinkHash}`}>
                            <a className={styles.masterlink}>
                              <h5>{tile.title}</h5>
                              <IconContext.Provider value={{ color: 'red', size: '1rem' }}>
                                <div className={styles.masterLinkUrl}>
                                  <FaChevronDown aria-label={tile.title} />
                                </div>
                              </IconContext.Provider>
                            </a>
                          </Link>
                        </div>
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

export default HeroNavigation;
