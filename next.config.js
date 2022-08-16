const withPlugins = require('next-compose-plugins');

const indexSearch = require('./plugins/search-index');
const feed = require('./plugins/feed');
const sitemap = require('./plugins/sitemap');
const socialImages = require('./plugins/socialImages');
const withPreact = require('next-plugin-preact');

const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivityPosition: 'bottom-left',
    buildActivity: true,
  },
  swcMinify: true,
};

module.exports = withPlugins(
  [[withPreact], [indexSearch], [feed], [sitemap], [socialImages]],
  {
    // By default, Next.js removes the trailing slash. One reason this would be good
    // to include is by default, the `path` property of the router for the homepage
    // is `/` and by using that, would instantly create a redirect
    trailingSlash: true,

    // By enabling verbose logging, it will provide additional output details for
    // diagnostic purposes. By default is set to false.
    verbose: true,

    env: {
      WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
      WORDPRESS_MENU_LOCATION_NAVIGATION: process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || 'PRIMARY',
      WORDPRESS_PLUGIN_SEO: parseEnvValue(process.env.WORDPRESS_PLUGIN_SEO, true),

      // Sets default number of tickets per page
      TICKETS_PER_PAGE: 30,

      // Sets default number of partners per page
      PARTNERS_PER_PAGE: 30,

      // Sets default number of faqs per page
      FAQS_PER_PAGE: 100,

      // Preview Secret Key
      WORDPRESS_PREVIEW_SECRET: process.env.WORDPRESS_PREVIEW_SECRET,
      WORDPRESS_AUTH_REFRESH_TOKEN: process.env.WORDPRESS_AUTH_REFRESH_TOKEN,

      NEXTAUTH_URL: process.env.NEXTAUTH_URL,

      WORDPRESS_APPLICATION_USERNAME: process.env.WORDPRESS_APPLICATION_USERNAME,
      WORDPRESS_APPLICATION_PASSWORD: process.env.WORDPRESS_APPLICATION_PASSWORD,

      // The image directory for open graph images will be saved at the location above
      // with `public` prepended. By default, images will be saved at /public/images/og
      // and available at /images/og. If changing, make sure to update the .gitignore

      OG_IMAGE_DIRECTORY: '/images/og',

      NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,

      NEXT_PUBLIC_GTM: process.env.NEXT_PUBLIC_GTM,
    },

    images: {
      domains: ['i360.imgix.net'],
      loader: 'imgix',
      path: 'https://i360.imgix.net/wp-content/uploads',
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024, 1920],
      deviceSizes: [375, 420, 640, 750, 828, 1080, 1200, 1920],
      formats: ['image/avif', 'image/webp'],
      dangerouslyAllowSVG: true,
      // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      minimumCacheTTL: 60,
    },
    async redirects() {
      return [
        // Path Matching - will match `/latest-news/a`, but not `/latest-news/a/b`
        {
          source: '/walk-360/',
          destination: '/tickets/walk-360/',
          permanent: true,
        },
        {
          source: '/climb-360/',
          destination: '/tickets/climb-360/',
          permanent: true,
        },
        {
          source: '/drop-360/',
          destination: '/tickets/drop-360/',
          permanent: true,
        },
        {
          source: '/annual-pass/',
          destination: '/tickets/annual-pass-ticket/',
          permanent: true,
        },
        {
          source: '/residents/',
          destination: '/tickets/resident-membership/',
          permanent: true,
        },
        {
          source: '/redeem/',
          destination: 'https://maximcloud.co.uk/brightoni360/redeem/',
          permanent: true,
        },
        {
          source: '/latest-news/',
          destination: '/news/',
          permanent: true,
        },
        {
          source: '/latest-news/videos/',
          destination: '/news/',
          permanent: true,
        },
        {
          source: '/about-us/our-story-4/sustainability/',
          destination: '/about/sustainability/',
          permanent: true,
        },
        {
          source: '/venue-hire/meetings/',
          destination: '/venue-hire/meetings-conferences/',
          permanent: true,
        },
        {
          source: '/venue-hire/weddings/',
          destination: '/venue-hire/weddings-proposals/',
          permanent: true,
        },
        {
          source: '/plan-your-visit/opening-hours-prices/',
          destination: '/plan-your-visit/opening-hours/',
          permanent: true,
        },
        {
          source: '/plan-your-visit/tickets/',
          destination: '/tickets/',
          permanent: true,
        },
        {
          source: '/plan-your-visit/whats-on/',
          destination: '/whats-on/',
          permanent: true,
        },
        {
          source: '/plan-your-visit/how-to-find-us/',
          destination: '/plan-your-visit/getting-here/',
          permanent: true,
        },
        {
          source: '/plan-your-visit/gift-vouchers/',
          destination: '/plan-your-visit/getting-here/',
          permanent: true,
        },
        {
          source: '/eat-and-drink/',
          destination: '/eat-drink/',
          permanent: true,
        },
        {
          source: '/eat-and-drink/our-chefs/',
          destination: '/eat-drink/',
          permanent: true,
        },
        {
          source: '/eat-and-drink/restaurants/',
          destination: '/eat-drink/west-beach-bar-kitchen/',
          permanent: true,
        },
        {
          source: '/eat-and-drink/sky-bar/',
          destination: '/eat-drink/nyetimber-sky-bar/',
          permanent: true,
        },
        {
          source: '/eat-and-drink/',
          destination: '/eat-drink/',
          permanent: true,
        },
        {
          source: '/plan-your-visit/visiting-brighton/',
          destination: '/news/top-things-active-city-break-brighton/',
          permanent: true,
        },
        {
          source: '/cdn-cgi/l/email-protection',
          destination: '/',
          permanent: true,
        },
        {
          source: '/ba-i360-app/#Footer',
          destination: '/',
          permanent: true,
        },
        {
          source: '/terms-conditions/',
          destination: '/terms-and-conditions/',
          permanent: true,
        },
        {
          source: '/contact/',
          destination: '/contact-us/',
          permanent: true,
        },
        {
          source: '/partners/',
          destination: '/about/commercial-partners/',
          permanent: true,
        },
        {
          source: '/careers/',
          destination: '/about/careers/',
          permanent: true,
        },
        {
          source: '/latest-news/faqs/',
          destination: '/about/faqs/',
          permanent: true,
        },
        {
          source: '/news/faqs/',
          destination: '/about/faqs/',
          permanent: true,
        },
        {
          source: '/event/yoga-in-the-sky/2022-06-26/',
          destination: '/tickets/yoga-in-the-sky/',
          permanent: true,
        },
        {
          source: '/event/nyetimber-tasting-sky-dining/',
          destination: '/tickets/nyetimber-tasting-sky-dining/',
          permanent: true,
        },
        {
          source: '/event/summer-solstice-sunrise-flight-2/',
          destination: '/tickets/summer-solstice-sunrise-flight/',
          permanent: true,
        },
        {
          source: '/event/brighton-gin-tasting-flight/2022-07-14/',
          destination: '/tickets/brighton-gin-tasting-flight/',
          permanent: true,
        },
        // Wildcard Path Matching - will match `/whats-on/a`
        {
          source: '/latest-news/faqs/:slug',
          destination: '/about/faqs/:slug',
          permanent: true,
        },
        {
          source: '/news/faqs/:slug',
          destination: '/about/faqs/:slug',
          permanent: true,
        },
        {
          source: '/about/faqs/:slug',
          destination: '/about/faqs/',
          permanent: true,
        },
        {
          source: '/about/careers/:slug',
          destination: '/careers/:slug',
          permanent: true,
        },
        {
          source: '/about/commercial-partners/:slug',
          destination: '/partners/:slug',
          permanent: true,
        },
        {
          source: '/posts/:slug',
          destination: '/news/:slug',
          permanent: true,
        },
        {
          source: '/ticket/:slug',
          destination: '/tickets/:slug',
          permanent: true,
        },
        {
          source: '/ticket/i360/:slug',
          destination: '/tickets/:slug',
          permanent: true,
        },
        // Wildcard Path Matching - will match `/whats-on/a` and `/whats-on/a/b`
        {
          source: '/plan-your-visit/whats-on/:slug*',
          destination: '/whats-on/',
          permanent: true,
        },
        {
          source: '/venue-hire/event-spaces/:slug',
          destination: '/venue-hire/private-events/',
          permanent: true,
        },
        {
          source: '/venue-hire/celebrations/:slug',
          destination: '/venue-hire/private-events/',
          permanent: true,
        },
        {
          source: '/latest-news/:slug',
          destination: '/news/:slug',
          permanent: true,
        },
        {
          source: '/latest-news/2014/',
          destination: '/news/2014/',
          permanent: true,
        },
        {
          source: '/latest-news/2014/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2015/',
          destination: '/news/2015/',
          permanent: true,
        },
        {
          source: '/latest-news/2015/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2016/',
          destination: '/news/2016/',
          permanent: true,
        },
        {
          source: '/latest-news/2016/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2017/',
          destination: '/news/2017/',
          permanent: true,
        },
        {
          source: '/latest-news/2017/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2018/',
          destination: '/news/2018/',
          permanent: true,
        },
        {
          source: '/latest-news/2018/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2019/',
          destination: '/news/2019/',
          permanent: true,
        },
        {
          source: '/latest-news/2019/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2020/',
          destination: '/news/2020/',
          permanent: true,
        },
        {
          source: '/latest-news/2020/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2021/',
          destination: '/news/2021/',
          permanent: true,
        },
        {
          source: '/latest-news/2021/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/2022/',
          destination: '/news/2022/',
          permanent: true,
        },
        {
          source: '/latest-news/2022/:slug*',
          destination: '/news/2022/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/latest-news/blog/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/events/:slug*',
          destination: '/whats-on/',
          permanent: true,
        },
        {
          source: '/event/:slug*',
          destination: '/whats-on/',
          permanent: true,
        },
        {
          source: '/the-experience/:slug*',
          destination: '/experience-i360/',
          permanent: true,
        },
        {
          source: '/walk360/',
          destination: '/tickets/walk-360/',
          permanent: true,
        },
        // Regex Path Matching - The regex below will match `/post/123` but not `/post/abc`
        {
          source: '/:slug(\\?[a-zA-Z]=)',
          destination: '/',
          permanent: true,
        },
        {
          source: '/:slug(\\?pos[a-zA-Z]=type=)',
          destination: '/',
          permanent: true,
        },
      ];
    },
  },
  nextConfig
);

/**
 * parseEnv
 * @description Helper function to check if a variable is defined and parse booelans
 */

function parseEnvValue(value, defaultValue) {
  if (typeof value === 'undefined') return defaultValue;
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return value;
}
