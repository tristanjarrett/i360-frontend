// import Wave from 'components/Wave';
import useSite from 'hooks/use-site';
import ReactPlayer from 'react-player';
import { formatDateName } from 'lib/datetime';
import Image from 'next/image';
import styles from './TicketHeader.module.scss';

const TicketHeader = ({ data, title }) => {
  const currentDate = new Date().getTime();

  const { userAgent } = useSite();

  return (
    <>
      {data && (
        <section className={`${styles.header} container-fluid p-0`}>
          {data?.backgroundVideo ? (
            <div className={styles.playerWrapper}>
              {userAgent?.match(/iPhone|iPad|iPod/i) ? (
                <ReactPlayer
                  className={styles.reactPlayer}
                  url={data.backgroundVideo}
                  width="100%"
                  height="100%"
                  muted={true}
                  loop={true}
                  playing={true}
                  playsinline={true}
                  // light={true}
                />
              ) : (
                <ReactPlayer
                  className={styles.reactPlayer}
                  url={data.backgroundVideo}
                  width="100%"
                  height="100%"
                  muted={true}
                  playing={true}
                  playsinline={true}
                  loop={true}
                />
              )}
            </div>
          ) : (
            <>
              <div className={styles.overlay}></div>
              <Image
                src={data?.backgroundImage?.mediaDetails?.file}
                alt={data?.heading}
                layout="fill"
                width={data?.backgroundImage?.mediaDetails?.width}
                height={data?.backgroundImage?.mediaDetails?.height}
                priority="eager"
                objectFit="cover"
                objectPosition={`${data?.backgroundImagePosition?.horizontal} ${data?.backgroundImagePosition?.vertical}`}
                sizes="(max-width: 2000px) 100vw, 2000px"
              />
              <div className={styles.inner}>
                <div className="row g-0">
                  <div className="col">
                    <div className={styles.content}>
                      {data?.imageAsHeading?.mediaDetails?.file && (
                        <div className={styles.imageAsHeading}>
                          <div className={styles.imageAsHeadingInner}>
                            <Image
                              src={data.imageAsHeading.mediaDetails?.file}
                              alt={data.imageAsHeading.altText}
                              width={data.imageAsHeading.mediaDetails.width}
                              height={data.imageAsHeading.mediaDetails.height}
                              layout="responsive"
                              priority="eager"
                            />
                          </div>
                        </div>
                      )}
                      <h2>{data.subheading}</h2>
                      <h1 className={data?.imageAsHeading?.mediaDetails?.file ? styles.hide : ''}>
                        {!title ? data.heading : title}
                      </h1>
                      <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.description }} />
                      {data?.dates &&
                        data.dates.map((item, index) => {
                          const newDate = new Date(item.date);
                          return (
                            <div
                              key={index}
                              className={styles.date}
                              style={{ display: currentDate > newDate.getTime() ? 'none' : '' }}
                            >
                              <p className="mt-0 mb-2">
                                <strong>
                                  {formatDateName(newDate, 'day dd mm')} @ {item.time}
                                </strong>
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className={styles.wave}>
            <img src="/assets/wave-white-top.svg" alt="Wave Bottom" width="1920" height="210" />
          </div>
        </section>
      )}
    </>
  );
};

export default TicketHeader;
