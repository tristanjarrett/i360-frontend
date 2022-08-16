import Link from 'next/link';
import { IconContext } from 'react-icons';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Image from 'next/image';
import styles from './PartnerHeader.module.scss';

const PartnerHeader = ({ title, data }) => {
  return (
    <>
      {data && (
        <section
          className={`${styles.header} container-fluid p-0`}
          // style={{
          //   backgroundImage:
          //     data?.featuredImage?.mediaDetails?.file !== undefined
          //       ? `url('https://i360.imgix.net/wp-content/uploads/${data?.featuredImage?.mediaDetails?.file}')`
          //       : '',
          //   backgroundPositionX: data?.imagePosition?.horizontal,
          //   backgroundPositionY: data?.imagePosition?.vertical,
          // }}
        >
          <div className={styles.overlay}></div>
          <Image
            src={data?.featuredImage?.mediaDetails?.file}
            alt={data?.heading}
            layout="fill"
            width={data?.featuredImage?.mediaDetails?.width}
            height={data?.featuredImage?.mediaDetails?.height}
            priority="eager"
            objectFit="cover"
            objectPosition={`${data?.partnersData?.imagePosition?.horizontal} ${data?.partnersData?.imagePosition?.vertical}`}
            sizes="(max-width: 2000px) 100vw, 2000px"
          />
          <div className={styles.inner}>
            <div className="row g-0">
              <div className="col">
                <div className={styles.content}>
                  <h2>COMMERCIAL PARTNERS</h2>
                  <h1>{title}</h1>
                  <p className={styles.breadcrumbs}>
                    <>
                      <Link href="/about/">
                        <a>About Us</a>
                      </Link>
                      {' | '}
                      <Link href="/about/commercial-partners/">
                        <a>Commercial Partners</a>
                      </Link>
                      {' | '}
                      <Link href={`/partners/${data.slug}/`}>
                        <a>
                          <strong>{data.title}</strong>
                        </a>
                      </Link>
                    </>
                  </p>
                  <div className={styles.back}>
                    <Link href="/about/commercial-partners">
                      <a>
                        <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                          <div>
                            <RiArrowGoBackFill aria-label="Back to Partners" />
                          </div>
                        </IconContext.Provider>{' '}
                        Back to Partners
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.wave}>
            <img src="/assets/wave-white-top.svg" alt="Wave Bottom" width="1920" height="210" />
          </div>
        </section>
      )}
    </>
  );
};

export default PartnerHeader;
