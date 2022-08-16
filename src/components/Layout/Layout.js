import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styles from './Layout.module.scss';

import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';

import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';
import PopUp from 'components/PopUp';
import Notification from 'components/Notification';
import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;

  const { homepage, metadata, globalData } = useSite();

  if (!metadata.og) {
    metadata.og = {};
  }

  metadata.og.url = `${homepage}${asPath}`;

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate: process.env.WORDPRESS_PLUGIN_SEO === true ? '%s' : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },

        // Favicon sizes and manifest generated via https://favicon.io/

        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    }),
  };

  const { sitewidePopup, sitewideNotification } = globalData;

  return (
    <div className={styles.layoutContainer}>
      <Helmet {...helmetSettings} />
      {sitewidePopup?.enable === true ? <PopUp data={sitewidePopup} /> : null}
      {sitewideNotification?.enable ? <Notification data={sitewideNotification} /> : null}
      <Nav hasNotification={sitewideNotification?.enable === true ? 'true' : null} />
      <Main hasNotification={sitewideNotification?.enable === true ? 'true' : null}>{children}</Main>
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        cookieName="cookieNotice"
        style={{ background: '#343434' }}
        buttonStyle={{ background: '#E2211C', color: 'white', fontSize: '16px' }}
        expires={150}
      >
        We use cookies to ensure that we give you the best experience on our website. If you continue to use this site
        we will assume that you are happy with it.{' '}
        <Link href="/privacy-policy/">
          <a>Privacy Policy</a>
        </Link>
      </CookieConsent>
      <Footer />
    </div>
  );
};

export default Layout;
