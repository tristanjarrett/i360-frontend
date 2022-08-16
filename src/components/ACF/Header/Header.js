import { useRouter } from 'next/router';
import useSite from 'hooks/use-site';
import ReactPlayer from 'react-player';
import useMediaQuery from '../../../hooks/media-query';
import ClassName from 'models/classname';
import Ctas from 'components/ACF/Ctas';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { RiArrowGoBackFill } from 'react-icons/ri';

import styles from './Header.module.scss';

const HeaderAcf = ({ className, data, title }) => {
  const headerClassName = new ClassName(styles.header);
  headerClassName.addIf(className, className);

  const mainStyles = headerClassName.toString();

  data = data?.header || data;
  const ctas = data?.cta;

  const router = useRouter();

  const { userAgent } = useSite();

  const isBreakpoint = useMediaQuery(575);

  return (
    <>
      {data &&
        (isBreakpoint ? (
          <section
            className={`${styles.mobileHeader} container-fluid ${data.smallHeader === true ? styles.small : 'full'}`}
          >
            <div className={styles.mobileImageWrap}>
              <div className={styles.mobileImage}>
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
                    {data?.backgroundImage?.mediaDetails?.file && (
                      <div className={styles.playerImage}>
                        <Image
                          src={data?.backgroundImage?.mediaDetails?.file}
                          alt={data?.heading}
                          layout="responsive"
                          width={data?.backgroundImage?.mediaDetails?.width}
                          height={data?.backgroundImage?.mediaDetails?.height}
                          priority="eager"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  data?.backgroundImage?.mediaDetails?.file && (
                    <Image
                      src={data?.backgroundImage?.mediaDetails?.file}
                      alt={data?.heading}
                      layout="responsive"
                      width={data?.backgroundImage?.mediaDetails?.width}
                      height={data?.backgroundImage?.mediaDetails?.height}
                      priority="eager"
                    />
                  )
                )}
                <div className={styles.mobileWave}>
                  {data.waveColour === 'grey' ? (
                    <img src="/assets/wave-grey-top.svg" alt="Wave Bottom" width="1920" height="210" />
                  ) : data.waveColour === 'white' ? (
                    <img src="/assets/wave-white-top.svg" alt="Wave Bottom" width="1920" height="210" />
                  ) : null}
                </div>
              </div>
              <div className={styles.mobileInner}>
                <div className="row">
                  <div className="col">
                    <div className={styles.content}>
                      {data.subheading && <h2>{data.subheading}</h2>}
                      <h1>{title != null ? title : data.heading}</h1>
                      {data?.hasBackLink && data?.backLinkUrl?.uri ? (
                        <div className={styles.back}>
                          <Link href={data?.backLinkUrl?.uri}>
                            <a>
                              <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                <div>
                                  <RiArrowGoBackFill aria-label={data?.backLinkUrl?.title} />
                                </div>
                              </IconContext.Provider>{' '}
                              Back to {data?.backLinkUrl?.title}
                            </a>
                          </Link>
                        </div>
                      ) : (
                        data?.hasBackLink === true && (
                          <span onClick={() => router.back()} role="button">
                            <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                              <div>
                                <RiArrowGoBackFill aria-label={data?.backLinkUrl?.title} />
                                {' Go back'}
                              </div>
                            </IconContext.Provider>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {ctas && <div className={styles.mobileCtas}>{ctas && <Ctas data={ctas} className={styles.ctas} />}</div>}
            {data.text && (
              <div className={styles.mobileContent}>
                {data.text && <div dangerouslySetInnerHTML={{ __html: data.text }} />}
              </div>
            )}
          </section>
        ) : (
          <section className={`${mainStyles} container-fluid ${data.smallHeader === true ? styles.small : 'full'}`}>
            <div className={styles.overlay}></div>
            {data?.backgroundVideo && (
              <div className={styles.playerWrapper}>
                <ReactPlayer
                  className={styles.reactPlayer}
                  url={data.backgroundVideo}
                  width="100%"
                  height="100%"
                  muted={true}
                  playing={true}
                  loop={true}
                />
              </div>
            )}
            <Image
              src={data?.backgroundImage?.mediaDetails?.file || '/assets/placeholder.jpg'}
              alt={data?.heading}
              layout="fill"
              width={data?.backgroundImage?.mediaDetails?.width}
              height={data?.backgroundImage?.mediaDetails?.height}
              priority="eager"
              objectFit="cover"
              objectPosition={`${data?.backgroundImagePosition?.horizontal} ${data?.backgroundImagePosition?.vertical}`}
            />
            {!data?.backgroundVideo ? (
              <div className={styles.inner}>
                <div className="row">
                  <div className="col">
                    <div
                      className={styles.content}
                      style={{ paddingBottom: `${data.noAfterContentBlock === true ? '4%' : 'calc(4% + 150px)'}` }}
                    >
                      {data.subheading && <h2>{data.subheading}</h2>}
                      <h1>{title != null ? title : data.heading}</h1>
                      {data.text && <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.text }} />}
                      {ctas && <Ctas data={ctas} className={styles.ctas} />}
                      {data?.hasBackLink && data?.backLinkUrl?.uri ? (
                        <div className={styles.back}>
                          <Link href={data?.backLinkUrl?.uri}>
                            <a>
                              <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                                <div>
                                  <RiArrowGoBackFill aria-label={data?.backLinkUrl?.title} />
                                </div>
                              </IconContext.Provider>{' '}
                              Back to {data?.backLinkUrl?.title}
                            </a>
                          </Link>
                        </div>
                      ) : (
                        data?.hasBackLink === true && (
                          <span onClick={() => router.back()} role="button">
                            <IconContext.Provider value={{ color: 'red', size: '15px' }}>
                              <div>
                                <RiArrowGoBackFill aria-label={data?.backLinkUrl?.title} />
                                {' Go back'}
                              </div>
                            </IconContext.Provider>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h1 style={{ opacity: '0', height: '0', margin: '0' }}>{title != null ? title : data.heading}</h1>
            )}
            <div className={styles.wave}>
              {data.waveColour === 'grey' ? (
                <img src="/assets/wave-grey-top.svg" alt="Wave Bottom" width="1920" height="210" />
              ) : data.waveColour === 'white' ? (
                <img src="/assets/wave-white-top.svg" alt="Wave Bottom" width="1920" height="210" />
              ) : null}
            </div>
          </section>
        ))}
    </>
  );
};

export default HeaderAcf;
