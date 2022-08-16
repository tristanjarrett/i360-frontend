import ClassName from 'models/classname';

import styles from './Wave.module.scss';

const Wave = ({
  children,
  className,
  width = '100%',
  height = 'auto',
  src,
  alt,
  srcSet,
  sizes,
  dangerouslySetInnerHTML,
  fill,
}) => {
  const imageClassName = new ClassName(styles.image);

  imageClassName.addIf(className, className);

  return (
    <figure className={imageClassName.toString()}>
      <div className={styles.featuredImageImg}>
        <img width={width} height={height} src={src} alt={alt || ''} srcSet={srcSet} sizes={sizes} fill={fill} />
      </div>
      {children && <figcaption>{children}</figcaption>}
      {dangerouslySetInnerHTML && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: dangerouslySetInnerHTML,
          }}
        />
      )}
    </figure>
  );
};

export default Wave;
