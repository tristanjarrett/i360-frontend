import ClassName from 'models/classname';
import useSite from 'hooks/use-site';
import Image from 'next/image';
import styles from './Content.module.scss';

const Content = ({ children, className, hasPod }) => {
  const contentClassName = new ClassName(styles.content);

  contentClassName.addIf(className, className);

  const mainStyles = contentClassName.toString();
  const { globalData } = useSite();
  const { movingPodAssets } = globalData;

  if (hasPod === true) {
    return (
      <>
        <div className={mainStyles}>
          <div className={styles.bgImage}>
            {movingPodAssets?.backgroundImage?.mediaDetails?.file && (
              <Image
                src={movingPodAssets.backgroundImage.mediaDetails?.file}
                alt={movingPodAssets.backgroundImage.altText}
                width={movingPodAssets.backgroundImage.mediaDetails.width}
                height={movingPodAssets.backgroundImage.mediaDetails.height}
                layout="fill"
                objectFit="cover"
                priority="eager"
              />
            )}
          </div>
          <div className={styles.pole}>
            {movingPodAssets?.pole?.mediaDetails?.file && (
              <Image
                src={movingPodAssets.pole.mediaDetails?.file}
                alt={movingPodAssets.pole.altText}
                width={movingPodAssets.pole.mediaDetails.width}
                height={movingPodAssets.pole.mediaDetails.height}
                layout="fixed"
                priority="eager"
              />
            )}
          </div>
          <div className={styles.pod}>
            {movingPodAssets?.pod?.mediaDetails?.file && (
              <Image
                src={movingPodAssets.pod.mediaDetails?.file}
                alt={movingPodAssets.pod.altText}
                width={movingPodAssets.pod.mediaDetails.width}
                height={movingPodAssets.pod.mediaDetails.height}
                layout="responsive"
                priority="eager"
              />
            )}
          </div>
          {children}
        </div>
      </>
    );
  } else {
    return <div className={mainStyles}>{children}</div>;
  }
};

export default Content;
