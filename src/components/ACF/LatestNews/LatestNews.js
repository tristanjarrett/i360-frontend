import ClassName from 'models/classname';
import PostCard from 'components/Posts/PostCard';
import Carousel from 'react-multi-carousel';
import { IconContext } from 'react-icons';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import 'react-multi-carousel/lib/styles.css';

import styles from './LatestNews.module.scss';

const LatestNews = ({ className, data, posts, device }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  const responsive = {
    desktop: {
      breakpoint: { max: 6000, min: 1440 },
      items: 4,
      slidesToSlide: 4,
    },
    laptop: {
      breakpoint: { max: 1440, min: 998 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 998, min: 540 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <section className={styles.customArrows}>
        <button className={styles.arrow_left} onClick={() => previous()}>
          <IconContext.Provider value={{ size: '20px' }}>
            <div className="text-end pe-2">
              <BsChevronLeft />
            </div>
          </IconContext.Provider>
        </button>
        <button className={styles.arrow_right} onClick={() => next()}>
          <IconContext.Provider value={{ size: '20px' }}>
            <div className="text-start ps-2">
              <BsChevronRight />
            </div>
          </IconContext.Provider>
        </button>
      </section>
    );
  };

  return (
    <section className={mainStyles}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>{data.subheading}</h2>
            <h1>{data.heading}</h1>
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        <Carousel
          deviceType={device}
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
          renderArrowsWhenDisabled={true}
          renderButtonGroupOutside={false}
          customButtonGroup={<ButtonGroup />}
          dotListClass={styles.custom_dots}
          itemClass={styles.carousel_item}
        >
          {posts.map((post) => {
            return (
              <div className={styles.post} key={post.slug}>
                <PostCard post={post} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default LatestNews;
