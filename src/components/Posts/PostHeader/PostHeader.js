// import Wave from 'components/Wave';
import Link from 'next/link';
import { formatDate } from 'lib/datetime';
import { readingTime } from 'lib/util';
import Image from 'next/image';
import styles from './PostHeader.module.scss';

const PostHeader = ({ data, title, categories }) => {
  let date = null;
  if (data.date) {
    date = formatDate(data.date).toString();
  }
  const time = readingTime(data.content);

  let cleanCat = [];

  if (categories.length > 1) {
    cleanCat = Array.from(categories.shift());
  } else {
    cleanCat = categories;
  }

  return (
    <>
      {data && (
        <section
          className={`${styles.header} container-fluid p-0`}
          // style={{
          //   backgroundImage:
          //     data?.newsPostData?.headerImage?.mediaDetails?.file !== undefined
          //       ? `url('https://i360.imgix.net/wp-content/uploads/${data?.newsPostData?.headerImage?.mediaDetails?.file}')`
          //       : data?.newsPostData?.headerImage?.mediaDetails?.file === undefined
          //       ? `url('https://i360.imgix.net/wp-content/uploads/${data?.featuredImage?.mediaDetails?.file}')`
          //       : '',
          // }}
        >
          <div className={styles.overlay}></div>
          <Image
            src={data?.newsPostData?.headerImage?.mediaDetails?.file || data?.featuredImage?.mediaDetails?.file}
            alt={data?.heading}
            layout="fill"
            width={data?.newsPostData?.mediaDetails?.width}
            height={data?.newsPostData?.mediaDetails?.height}
            priority="eager"
            objectFit="cover"
            objectPosition={`${data?.newsPostData?.imagePosition?.horizontal} ${data?.newsPostData?.imagePosition?.vertical}`}
            sizes="(max-width: 2000px) 100vw, 2000px"
          />
          <div className={styles.inner}>
            <div className="row g-0">
              <div className="col">
                <div className={styles.content}>
                  {cleanCat && (
                    <div className={styles.categories}>
                      {cleanCat.map((category, index) => {
                        return (
                          <div key={index} className={styles.category}>
                            <Link href={`/categories/${category.slug}`}>
                              <a title={category.name}>{category.name}</a>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <h1>{title}</h1>
                  <p className={styles.meta}>
                    {/* {data?.author?.name &&
                      `By 
                      ${data.author.name}
                      `} */}
                    {data.date &&
                      `${date}
                      `}
                    {data.content &&
                      ` |
                      ${time} min read
                      `}
                  </p>
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

export default PostHeader;
