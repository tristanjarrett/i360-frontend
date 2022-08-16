import Link from 'next/link';
import { FaMapPin, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import ImageObject from 'components/ImageObject';
import blurData from 'components/blurData';
// import Metadata from 'components/Metadata';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories, featuredImage, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  return (
    <div className={postCardStyle}>
      <div className={styles.postImage}>
        {isSticky && <FaMapPin aria-label="Sticky Post" />}
        {featuredImage ? (
          <Link href={postPathBySlug(slug)}>
            <a>
              <div className={styles.postCardImageWrap}>
                <Image
                  {...featuredImage}
                  src={featuredImage?.mediaDetails?.file}
                  alt={featuredImage.altText}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 50%"
                  placeholder="blur"
                  blurDataURL={blurData}
                  quality={1}
                  sizes="(max-width: 450px) 100vw, 450px"
                />
              </div>
            </a>
          </Link>
        ) : (
          <Link href={postPathBySlug(slug)}>
            <a>
              <div className={styles.postCardImageWrap}>
                <ImageObject src="/assets/placeholder.jpg" alt="Wave Bottom" width="506" height="307" />
              </div>
            </a>
          </Link>
        )}
      </div>
      <div className={styles.postCardText}>
        <span
          className={styles.postCardTitle}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        {excerpt && (
          <div
            className={styles.postCardContent}
            dangerouslySetInnerHTML={{
              __html: sanitizeExcerpt(excerpt),
            }}
          />
        )}
        {/* <Metadata className={styles.postCardMetadata} {...metadata} /> */}
        <Link href={postPathBySlug(slug)}>
          <a>
            <span>
              Read article <FaChevronRight color="#E2211C" />
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
