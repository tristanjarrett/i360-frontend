import Link from 'next/link';
import Image from 'next/image';

import useSite from 'hooks/use-site';

import Section from 'components/Section';
import Container from 'components/Container';
import ImageObject from 'components/ImageObject';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata = {}, globalData } = useSite();
  const { title } = metadata;

  const { footerWidgets } = globalData;

  return (
    <footer className={styles.footer} id="Footer">
      <div className={styles.wave}>
        <ImageObject src="/assets/wave-grey-top.svg" alt="Wave Top" width="1920" height="80" />
      </div>

      <Section className={styles.footerInner}>
        <Container className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-xl-3 mb-5 mb-xl-0">
              <div className={styles.footerCtas}>
                {footerWidgets?.ctas &&
                  footerWidgets.ctas.map((cta, index) => {
                    return (
                      <Link key={index} href={cta.link}>
                        <a className={styles.footerCta} title={cta?.icon?.altText}>
                          <span className={styles.footerCtaIcon}>
                            {cta?.icon?.mediaDetails?.file && (
                              <Image
                                src={cta.icon.mediaDetails?.file}
                                alt={cta.icon.altText}
                                width="25"
                                height="25"
                                layout="fixed"
                                quality="100"
                              />
                            )}
                          </span>
                          <span className={styles.footerCtaText}>{cta.text}</span>
                        </a>
                      </Link>
                    );
                  })}
              </div>
            </div>
            <div className={`col-12 col-sm-6 col-xl-3 mb-5 mb-xl-0 ${styles.footerCompay}`}>
              <h4 className="d-flex align-items-center">
                <span className={styles.headingCta}>
                  {footerWidgets?.companyInfo?.icon?.mediaDetails?.file && (
                    <Image
                      src={footerWidgets.companyInfo.icon.mediaDetails?.file}
                      alt={footerWidgets.companyInfo.icon.altText}
                      loading="eager"
                      width="45"
                      height="45"
                      layout="fixed"
                      quality="100"
                    />
                  )}
                </span>
                {footerWidgets.companyInfo.title}
              </h4>
              <div dangerouslySetInnerHTML={{ __html: footerWidgets.companyInfo.address }} />
              <p>{footerWidgets.companyInfo.phoneNumber}</p>
              <div className={`${styles.footerSocial} d-flex flex-row align-items-end justify-content-start`}>
                {footerWidgets?.socialIcons &&
                  footerWidgets?.socialIcons.map((item, index) => {
                    return (
                      <Link key={index} title={item.name} href={item.link} className={styles.footerSocialLink}>
                        <a className="d-block pe-3">
                          {item?.icon?.mediaDetails?.file && (
                            <Image
                              src={item.icon.mediaDetails?.file}
                              alt={item.icon.altText}
                              width={item.icon.mediaDetails.width}
                              height={item.icon.mediaDetails.height}
                              layout="fixed"
                              quality="100"
                            />
                          )}
                        </a>
                      </Link>
                    );
                  })}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3 mb-5 mb-xl-0">
              <h4 className="d-flex align-items-center">
                <span className={styles.headingCta}>
                  {footerWidgets?.quickLinks?.icon?.mediaDetails?.file && (
                    <Image
                      src={footerWidgets.quickLinks.icon.mediaDetails?.file}
                      alt={footerWidgets.quickLinks.icon.altText}
                      width="45"
                      height="45"
                      layout="fixed"
                    />
                  )}
                </span>
                {footerWidgets.quickLinks.title}
              </h4>
              {footerWidgets.quickLinks && (
                <div className={styles.quickLinks}>
                  {footerWidgets?.quickLinks?.links.map((link, index) => {
                    return (
                      <Link key={index} href={link.uri}>
                        <a title={link.title}>{link.title}</a>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={`col-12 col-sm-6 col-xl-3 mb-5 mb-xl-0 ${styles.footerApp}`}>
              <div id="newsletter" className={styles.footerOmnisend}>
                <h4>Subscribe to newsletter</h4>
                <div id="omnisend-embedded-v2-62669e3130a2f3deb5c227ba"></div>
              </div>
              <h4>{footerWidgets.downloadOurApp.title}</h4>
              {footerWidgets.downloadOurApp &&
                footerWidgets.downloadOurApp.appProvider.map((app, index) => {
                  return (
                    <Link key={index} href={app.link}>
                      <a target="_blank" rel="noopener">
                        {app?.image?.mediaDetails?.file && (
                          <Image
                            src={app.image.mediaDetails?.file}
                            alt={app.image.altText}
                            width={app.image.mediaDetails.width}
                            height={app.image.mediaDetails.height}
                            layout="responsive"
                          />
                        )}
                      </a>
                    </Link>
                  );
                })}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="section__lightgrey">
        <Container className="container">
          <div className={styles.footerDivider} />
        </Container>
      </Section>

      <Section className={styles.footerLegal}>
        <Container className="container">
          <div className="row">
            <div className="col-12 col-sm-6 mb-5 mb-sm-0">
              <Link href="/">
                <a title={title} className={styles.footerLogo}>
                  {footerWidgets?.footerLogo?.mediaDetails?.file && (
                    <Image
                      src={footerWidgets.footerLogo.mediaDetails?.file}
                      alt={footerWidgets.footerLogo.altText}
                      width={footerWidgets.footerLogo.mediaDetails.width}
                      height={footerWidgets.footerLogo.mediaDetails.height}
                      layout="responsive"
                    />
                  )}
                </a>
              </Link>
              <div>
                <p className="text-start">{footerWidgets.tagline}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 ms-auto">
              {footerWidgets.bottomFooterLinks && (
                <div className={styles.bottomFooterLinks}>
                  {footerWidgets?.bottomFooterLinks?.map((link, index) => {
                    return (
                      <Link key={index} href={link.uri}>
                        <a title={link.title}>{link.title}</a>
                      </Link>
                    );
                  })}
                </div>
              )}
              <p className="text-sm-end">
                &copy; {new Date().getFullYear()} {title} | Website by:{' '}
                <a href="http://solution17.co.uk">
                  {' '}
                  <b>Solution 17</b>
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
