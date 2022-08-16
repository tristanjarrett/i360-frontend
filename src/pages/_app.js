import NextApp from 'next/app';
import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import Omnisend from 'components/Omnisend';
import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

import { getGlobalData } from 'lib/global';
import { getSiteMetadata, getRedirects } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getRecentTickets } from 'lib/tickets';
import { getTopLevelPages } from 'lib/pages';
import { getCategories } from 'lib/categories';
import NextNProgress from 'nextjs-progressbar';
import { getAllMenus, createMenuFromPages, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

import 'styles/globals.scss';
import variables from 'styles/_variables.module.scss';

function App({
  Component,
  pageProps = {},
  metadata,
  recentPosts,
  recentTickets,
  categories,
  menus,
  globalData,
  userAgent,
}) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-58X4GT' });
    hotjar.initialize(3029675, 6);
  }, []);

  const site = useSiteContext({
    metadata,
    recentPosts,
    recentTickets,
    categories,
    menus,
    globalData,
    pageProps,
    userAgent,
  });

  return (
    <SiteContext.Provider value={site}>
      <SearchProvider>
        <NextNProgress height={4} color={variables.progressbarColor} />
        <Component {...pageProps} key={pageProps?.page?.id ? pageProps?.page?.id : pageProps?.id} />
      </SearchProvider>
      <Omnisend />
    </SiteContext.Provider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  let userAgent = appContext.ctx.req ? appContext.ctx.req.headers['user-agent'] : navigator.userAgent;

  const { redirects } = await getRedirects();

  redirects.forEach((redirect) => {
    if (appContext.ctx.req.url == `/${redirect.origin}/`) {
      appContext.ctx.res.writeHead(301, { Location: `/${redirect.target}/` });
      appContext.ctx.res.end();
    }
  });

  const { posts: recentPosts } = await getRecentPosts({
    count: 8,
    queryIncludes: 'index',
  });

  const { tickets: recentTickets } = await getRecentTickets({
    count: 58,
    queryIncludes: 'index',
  });

  const { categories } = await getCategories({
    count: 100,
  });

  const { menus } = await getAllMenus();

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  });

  menus.push(defaultNavigation);

  const { globalData } = await getGlobalData();

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    recentTickets,
    categories,
    menus,
    globalData,
    redirects,
    userAgent,
  };
};

export default App;
