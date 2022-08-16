import Link from 'next/link';
import Button from 'components/Button';
import Image from 'next/image';
import ImageObject from 'components/ImageObject';

import styles from './PartnerTile.module.scss';

const PartnerTile = ({ data }) => {
  return (
    <div className={styles.partnerCard}>
      <div className={styles.partnerImage}>
        <Link href={`/partners/${data?.slug}/`}>
          <a className={styles.partnerDetails}>
            {data?.partnersData?.partnersLogo?.mediaDetails?.file ? (
              <div className={styles.partnerImageWrap}>
                <Image
                  src={data?.partnersData?.partnersLogo?.mediaDetails?.file}
                  alt={data?.partnersData?.partnersLogo?.altText}
                  width="200"
                  height="120"
                  layout="fixed"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className={styles.partnerImageWrap}>
                <ImageObject src="/assets/placeholder.jpg" alt="Wave Bottom" width="506" height="307" />
              </div>
            )}
          </a>
        </Link>
      </div>
      <div className={styles.partnerInner}>
        <div className={styles.partnerContentWrapper}>
          <div className={styles.partnerTop}>
            <Link href={data?.slug}>
              <a>
                <h3 className={styles.partnerCardTitle}>{data?.title}</h3>
              </a>
            </Link>
            {data?.excerpt && (
              <div
                className={styles.partnerCardContent}
                dangerouslySetInnerHTML={{
                  __html: data?.excerpt,
                }}
              />
            )}
          </div>
          <div className={styles.partnerBottom}>
            <div className={styles.partnerCardLink}>
              <Button type="button" className={styles.Button}>
                <Link href={`/partners/${data?.slug}/`}>
                  <a>Read More</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerTile;
