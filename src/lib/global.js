import { getApolloClient } from 'lib/apollo-client';

import { GLOBAL_DATA } from 'data/global';

export async function getGlobalData() {
  const apolloClient = getApolloClient();

  let rawData;

  try {
    rawData = await apolloClient.query({
      query: GLOBAL_DATA,
    });
  } catch (e) {
    console.log(`[site][getSiteMetadata] Failed to query site data: ${e.message}`);
    throw e;
  }

  const generalData = rawData.data.allGlobalData.edges[0].node.global.data;
  let {
    sitewideNotification,
    sitewidePopup,
    contactEmail,
    ticketsColumnTitle,
    logo,
    headerCtas,
    navbarCtas,
    themeColours,
    footerWidgets,
    movingPodAssets,
  } = generalData;

  const globalData = {
    sitewideNotification,
    sitewidePopup,
    contactEmail,
    ticketsColumnTitle,
    logo,
    headerCtas,
    navbarCtas,
    themeColours,
    footerWidgets,
    movingPodAssets,
  };

  return {
    globalData,
  };
}
