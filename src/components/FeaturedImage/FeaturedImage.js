import ClassName from 'models/classname';

import ImageObject from 'components/ImageObject';

import styles from './FeaturedImage.module.scss';

const FeaturedImage = ({ className, ...rest }) => {
  const featuredImageClassName = new ClassName(styles.featuredImage);

  featuredImageClassName.addIf(className, className);

  return <ImageObject className={featuredImageClassName} {...rest} />;
};

export default FeaturedImage;
