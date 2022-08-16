import ClassName from 'models/classname';
import Ctas from 'components/ACF/Ctas';
import ImageObject from 'components/ImageObject';
import styles from './ContentAfterHeader.module.scss';

const ContentAfterHeader = ({ className, data }) => {
  const containerClassName = new ClassName(styles.container);
  containerClassName.addIf(className, className);

  const mainStyles = containerClassName.toString();
  data = data.contentAfterHeader;
  const ctas = data.cta;
  return (
    <section className={mainStyles}>
      <div
        className={`${styles.section}`}
        style={{
          backgroundColor:
            data?.backgroundColour === 'grey' ? '#f5f5f5' : data?.backgroundColour === 'white' ? 'white' : 'initial',
        }}
      >
        <div className={`container ${styles.container}`}>
          <div className={styles.content}>
            <div className={styles.inner}>
              <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.content }} />
              <Ctas data={ctas} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wave}>
        {data.waveColour === 'grey' ? (
          <ImageObject src="/assets/wave-grey-bottom.svg" alt="Wave Bottom" width="1920" height="210" />
        ) : (
          <ImageObject src="/assets/wave-white-bottom.svg" alt="Wave Bottom" width="1920" height="210" />
        )}
      </div>

      {/* <div className={styles.wave} />
      {data.waveColour === 'grey' ? (
        <svg height="0" width="0">
          <defs>
            <clipPath id="svgPath" clipPathUnits="objectBoundingBox" transform="scale(0.0008060014, 0.00532197977)">
              <path
                d="M0,1030.743s439.766-108.968,911.268,0S1920.856,868.676,1920.856,868.676H0Z"
                transform="translate(-300 -868.676)"
                fill="#f5f5f5"
              />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg height="0" width="0">
          <defs>
            <clipPath id="svgPath" clipPathUnits="objectBoundingBox" transform="scale(0.0008060014, 0.00532197977)">
              <path
                d="M0,1030.743s439.766-108.968,911.268,0S1920.856,868.676,1920.856,868.676H0Z"
                transform="translate(-300 -868.676)"
                fill="#fff"
              />
            </clipPath>
          </defs>
        </svg>
      )} */}
    </section>
  );
};

export default ContentAfterHeader;
