const fs = require('fs');
const he = require('he');
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client');
const RSS = require('rss');
const prettier = require('prettier');

const config = require('../package.json');

/**
 * createFile
 */

async function createFile(file, process, directory, location, verbose = false) {
  try {
    mkdirp(directory);
    verbose && console.log(`[${process}] Created directory ${directory}`);
    await promiseToWriteFile(location, file);
    verbose && console.log(`[${process}] Successfully wrote file to ${location}`);
  } catch (e) {
    throw new Error(`[${process}] Failed to create file: ${e.message}`);
  }
}

/**
 * promiseToWriteFile
 */

function promiseToWriteFile(location, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(location, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 * mkdirp
 */

function mkdirp(directory) {
  const split = directory.split('/');
  let temp = '.';

  split.forEach((dir) => {
    temp = `${temp}/${dir}`;

    if (!fs.existsSync(temp)) {
      fs.mkdirSync(temp);
    }
  });
}

/**
 * createApolloClient
 */

function createApolloClient(url) {
  return new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });
}

/**
 * getAllPosts
 */

async function getAllPosts(apolloClient, process, verbose = false) {
  const query = gql`
    {
      posts(first: 10000, where: { hasPassword: false }) {
        edges {
          node {
            title
            excerpt
            databaseId
            uri
            slug
            date
            modified
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  width
                  height
                  sizes {
                    width
                    sourceUrl
                    height
                  }
                }
                altText
                caption
                id
                srcSet
                sizes
              }
            }
          }
        }
      }
      # Tickets
      tickets(first: 10000, where: { hasPassword: false }) {
        edges {
          node {
            title
            excerpt
            databaseId
            uri
            slug
            date
            modified
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  width
                  height
                  sizes {
                    width
                    sourceUrl
                    height
                  }
                }
                altText
                caption
                id
                srcSet
                sizes
              }
            }
            # Ticket Booking Link
            ticketBookingLink {
              url
            }
            # Ticket Prices
            ticketPrices {
              prices {
                title
                extraInfo
                price
              }
            }
          }
        }
      }
      # FAQs
      faqs(first: 10000, where: { hasPassword: false }) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            uri
            date
            modified
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
      # Partners
      partners(first: 10000, where: { hasPassword: false }) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            uri
            date
            modified
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  width
                  height
                  sizes {
                    width
                    sourceUrl
                    height
                  }
                }
                altText
                caption
                id
                srcSet
                sizes
              }
            }
          }
        }
      }
      # Careers
      careers(first: 10000, where: { hasPassword: false }) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            uri
            date
            modified
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  width
                  height
                  sizes {
                    width
                    sourceUrl
                    height
                  }
                }
                altText
                caption
                id
                srcSet
                sizes
              }
            }
          }
        }
      }
    }
  `;

  let posts = [];
  let tickets = [];
  let faqs = [];
  let partners = [];
  let careers = [];
  let all = posts.concat(tickets, faqs, partners, careers);

  try {
    const data = await apolloClient.query({ query });
    const postNodes = [...data.data.posts.edges.map(({ node = {} }) => node)];
    const ticketNodes = [...data.data.tickets.edges.map(({ node = {} }) => node)];
    const faqNodes = [...data.data.faqs.edges.map(({ node = {} }) => node)];
    const partnerNodes = [...data.data.partners.edges.map(({ node = {} }) => node)];
    const careerNodes = [...data.data.careers.edges.map(({ node = {} }) => node)];

    posts = postNodes.map((post) => {
      const data = { ...post };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      // Clean up the featured image to make them more easy to access

      if (data.featuredImage) {
        data.featuredImage = data.featuredImage.node;
      }

      return data;
    });

    tickets = ticketNodes.map((ticket) => {
      const data = { ...ticket };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      if (data.featuredImage) {
        data.featuredImage = data.featuredImage.node;
      }

      if (data.ticketPrices) {
        data.ticketPrices = data.ticketPrices.prices;
      }

      return data;
    });

    faqs = faqNodes.map((faq) => {
      const data = { ...faq };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      return data;
    });

    partners = partnerNodes.map((partner) => {
      const data = { ...partner };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      // Clean up the featured image to make them more easy to access

      if (data.featuredImage) {
        data.featuredImage = data.featuredImage.node;
      }

      return data;
    });

    careers = careerNodes.map((career) => {
      const data = { ...career };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      // Clean up the featured image to make them more easy to access

      if (data.featuredImage) {
        data.featuredImage = data.featuredImage.node;
      }

      return data;
    });

    verbose && console.log(`[${process}] Successfully fetched posts and tickets from ${apolloClient.link.options.uri}`);
    return {
      posts,
      tickets,
      faqs,
      partners,
      careers,
      all,
    };
  } catch (e) {
    throw new Error(
      `[${process}] Failed to fetch posts and tickets from ${apolloClient.link.options.uri}: ${e.message}`
    );
  }
}

/**
 * getSiteMetadata
 */

async function getSiteMetadata(apolloClient, process, verbose = false) {
  const query = gql`
    {
      generalSettings {
        description
        language
        title
      }
    }
  `;

  let metadata = {};

  try {
    const data = await apolloClient.query({ query });
    metadata = { ...data.data.generalSettings };

    if (!metadata.language || metadata.language === '') {
      metadata.language = 'en';
    } else {
      metadata.language = metadata.language.split('_')[0];
    }

    verbose && console.log(`[${process}] Successfully fetched metadata from ${apolloClient.link.options.uri}`);
    return {
      metadata,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch metadata from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}

/**
 * getSitePages
 */

async function getPages(apolloClient, process, verbose = false) {
  const query = gql`
    {
      pages(first: 10000) {
        edges {
          node {
            slug
            modified
          }
        }
      }
    }
  `;

  let pages = [];

  try {
    const data = await apolloClient.query({ query });
    pages = [
      ...data.data.pages.edges.map(({ node = {} }) => {
        return {
          slug: node.slug,
          modified: node.modified,
        };
      }),
    ];

    verbose && console.log(`[${process}] Successfully fetched page slugs from ${apolloClient.link.options.uri}`);
    return {
      pages,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch page slugs from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}

/**
 * getFeedData
 */

async function getFeedData(apolloClient, process, verbose = false) {
  const metadata = await getSiteMetadata(apolloClient, process, verbose);
  const all = await getAllPosts(apolloClient, process, verbose);

  return {
    ...metadata,
    ...all,
  };
}

/**
 * getFeedData
 */

async function getSitemapData(apolloClient, process, verbose = false) {
  const all = await getAllPosts(apolloClient, process, verbose);
  const pages = await getPages(apolloClient, process, verbose);

  return {
    ...all,
    ...pages,
  };
}

/**
 * generateFeed
 */

function generateFeed({ posts = [], tickets = [], partners = [], careers = [], metadata = {} }) {
  const { homepage = '' } = config;

  const feed = new RSS({
    title: metadata.title || '',
    description: metadata.description,
    site_url: homepage,
    feed_url: `${homepage}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${metadata.title}`,
    language: metadata.language,
    pubDate: new Date(),
  });

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${homepage}/news/${post.slug}`,
      url: `${homepage}/news/${post.slug}`,
      date: post.date,
      description: post.excerpt,
      author: post.author,
      categories: post.categories || [],
    });
  });

  tickets.map((tickets) => {
    feed.item({
      title: tickets.title,
      guid: `${homepage}/tickets/${tickets.slug}`,
      url: `${homepage}/tickets/${tickets.slug}`,
      date: tickets.date,
      description: tickets.excerpt,
      author: tickets.author,
      categories: tickets.categories || [],
    });
  });

  partners.map((partner) => {
    feed.item({
      title: partner.title,
      guid: `${homepage}/about/commercial-partners/${partner.slug}`,
      url: `${homepage}/about/commercial-partners/${partner.slug}`,
      date: partner.date,
      description: partner.excerpt,
      author: partner.author,
      categories: partner.categories || [],
    });
  });

  careers.map((career) => {
    feed.item({
      title: career.title,
      guid: `${homepage}/about/careers/${career.slug}`,
      url: `${homepage}/about/careers/${career.slug}`,
      date: career.date,
      description: career.excerpt,
      author: career.author,
      categories: career.categories || [],
    });
  });

  return feed.xml({ indent: true });
}

/**
 * generateIndexSearch
 */

function generateIndexSearch({ posts, tickets, careers, partners }) {
  const all = posts.concat(tickets, careers, partners);
  const indexPosts = all.map((post = {}) => {
    // We need to decode the title because we're using the
    // rendered version which assumes this value will be used
    // within the DOM

    const title = he.decode(post.title);

    return {
      title,
      slug: post.slug,
      uri: post.uri.includes('/ticket/')
        ? post.uri.replace('/ticket/', '/tickets/')
        : post.uri.includes('/about/') || post.uri.includes('/partners/') || post.uri.includes('/careers/')
        ? post.uri
        : `/news/${post.slug}`,
      url: post.url,
      date: post.date,
    };
  });

  const indexJson = JSON.stringify({
    generated: Date.now(),
    posts: indexPosts,
  });

  return indexJson;
}

/**
 * getSitemapData
 */

function generateSitemap({ posts = [], pages = [], tickets = [], partners = [], careers = [] }, nextConfig = {}) {
  const { homepage = '' } = config;
  const { trailingSlash } = nextConfig;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
        ${pages
          .map((page) => {
            return `<url>
                      <loc>${homepage}/${page.slug}${trailingSlash ? '/' : ''}</loc>
                      <priority>0.3</priority>
                      <lastmod>${new Date(page.modified).toISOString()}</lastmod>
                    </url>
                `;
          })
          .join('')}
          ${posts
            .map((post) => {
              return `<url>
                        <loc>${homepage}/news/${post.slug}${trailingSlash ? '/' : ''}</loc>
                        <lastmod>${new Date(post.modified).toISOString()}</lastmod>
                      </url>
                  `;
            })
            .join('')}
            ${tickets
              .map((ticket) => {
                return `<url>
                          <loc>${homepage}/tickets/${ticket.slug}${trailingSlash ? '/' : ''}</loc>
                          <lastmod>${new Date(ticket.modified).toISOString()}</lastmod>
                        </url>
                    `;
              })
              .join('')}
              ${partners
                .map((partner) => {
                  return `<url>
                            <loc>${homepage}/about/commercial-partners/${partner.slug}${trailingSlash ? '/' : ''}</loc>
                            <lastmod>${new Date(partner.modified).toISOString()}</lastmod>
                          </url>
                      `;
                })
                .join('')}
                ${careers
                  .map((career) => {
                    return `<url>
                              <loc>${homepage}/about/careers/${career.slug}${trailingSlash ? '/' : ''}</loc>
                              <lastmod>${new Date(career.modified).toISOString()}</lastmod>
                            </url>
                        `;
                  })
                  .join('')}
    </urlset>
    `;

  const sitemapFormatted = prettier.format(sitemap, {
    printWidth: 120,
    parser: 'html',
  });

  return sitemapFormatted;
}

/**
 * generateRobotsTxt
 */

async function generateRobotsTxt({ outputDirectory, outputName }) {
  const { homepage = '' } = config;

  try {
    // Build sitemap URL at root directory
    let sitemapUrl = new URL(outputName, homepage);

    // Check if output directory is not root directory
    if (outputDirectory !== './public') {
      // Check if output directory is within './public' folder
      if (outputDirectory.startsWith('./public')) {
        // Update sitemap URL with new directory
        sitemapUrl.pathname = resolvePublicPathname(outputDirectory, outputName);
      } else {
        throw new Error('Sitemap should be within ./public folder.');
      }
    }

    // Robots content using sitemap final URL
    const robots = `User-agent: *\nSitemap: ${sitemapUrl}`;

    // Create robots.txt always at root directory
    await createFile(robots, 'Robots.txt', './public', './public/robots.txt');
  } catch (e) {
    throw new Error(`[Robots.txt] Failed to create robots.txt: ${e.message}`);
  }
}

/**
 * resolvePathname
 */

function resolvePublicPathname(outputDirectory, outputName) {
  const directory = outputDirectory.split('/');
  const index = directory.indexOf('public');
  const path = directory
    .map((path, i) => {
      // If actual folder is a 'public' direct subfolder and is not empty, add to pathname
      if (i > index && path) {
        return `/${path}`;
      }
    })
    .join('');

  return `${path}/${outputName}`;
}

/**
 * removeLastTrailingSlash
 */

function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

/**
 * terminalColor
 */

function terminalColor(text, level) {
  switch (level) {
    /** green */
    case 'info':
    default:
      return `\x1b[32m${text}\x1b[0m`;
    /** yellow */
    case 'warn':
      return `\x1b[33m${text}\x1b[0m`;
    /** red */
    case 'error':
      return `\x1b[31m${text}\x1b[0m`;
  }
}

module.exports = {
  createFile,
  promiseToWriteFile,
  mkdirp,
  createApolloClient,
  getAllPosts,
  generateIndexSearch,
  getSiteMetadata,
  getFeedData,
  generateFeed,
  getPages,
  getSitemapData,
  generateSitemap,
  generateRobotsTxt,
  removeLastTrailingSlash,
  resolvePublicPathname,
  terminalColor,
};
