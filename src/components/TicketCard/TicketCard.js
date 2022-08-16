import Link from 'next/link';
import Button from 'components/Button';
import { IconContext } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';
import ImageObject from 'components/ImageObject';
import Image from 'next/image';
import blurData from 'components/blurData';
import { formatDateName } from 'lib/datetime';

import { ticketPathBySlug, sanitizeExcerpt } from 'lib/tickets';

import styles from './TicketCard.module.scss';

const TicketCard = ({ ticket = {} }) => {
  const { title, excerpt, slug, featuredImage, ticketBookingLink, ticketPrices, ticketHeader } = ticket;

  let prices = ticketPrices?.prices;

  const bookingLink = ticketBookingLink?.url;
  const ticketDates = ticketHeader?.dates;
  const ticketDatesNo = ticketDates?.length;

  const currentDate = new Date().getTime();

  return (
    <>
      {ticket && (
        <div className={styles.ticketCard}>
          <div className={styles.ticketImage}>
            <Link href={ticketPathBySlug(slug)}>
              <a className={styles.ticketDetails}>
                {featuredImage?.mediaDetails?.file || featuredImage?.node?.mediaDetails?.file ? (
                  <div className={styles.ticketImageWrap}>
                    <Image
                      {...featuredImage}
                      src={featuredImage?.mediaDetails?.file || featuredImage?.node?.mediaDetails?.file}
                      alt={featuredImage?.altText}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                      placeholder="blur"
                      blurDataURL={blurData}
                      quality={1}
                      sizes="(max-width: 450px) 100vw, 450px"
                    />
                  </div>
                ) : (
                  <div className={styles.ticketImageWrap}>
                    <ImageObject src="/assets/placeholder.jpg" alt="Wave Bottom" width="506" height="307" />
                  </div>
                )}
              </a>
            </Link>
          </div>
          <div className={styles.ticketInner}>
            <div className={styles.ticketContentWrapper}>
              <Link href={ticketPathBySlug(slug)}>
                <a>
                  <h3
                    className={styles.ticketCardTitle}
                    dangerouslySetInnerHTML={{
                      __html: title,
                    }}
                  />
                </a>
              </Link>
              {ticketDates && (
                <>
                  <h5 className={styles.ticketNextEvent}>Next event{ticketDatesNo > 1 ? 's' : ''}</h5>
                  {ticketDates?.map((date) => {
                    const newDate = new Date(date.date);
                    return (
                      <h5
                        key={Math.random().toString()}
                        className={styles.ticketDate}
                        style={{ display: currentDate > newDate.getTime() ? 'none' : '' }}
                      >
                        <span>
                          {formatDateName(newDate, 'day dd mm')} @ {date.time}
                        </span>
                      </h5>
                    );
                  })}
                </>
              )}
              {excerpt && (
                <div
                  className={styles.ticketCardContent}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeExcerpt(excerpt.substring(0, 250)),
                  }}
                />
              )}
            </div>
            {prices && (
              <div className={styles.ticketPrices}>
                <h4>Prices</h4>
                {prices.map((item) => {
                  return (
                    <>
                      {item?.featured === true ? (
                        <div key={Math.random().toString()} className={styles.ticketPrice}>
                          {item?.priceUrl?.url === true ? (
                            <Link href={item?.priceUrl?.url}>
                              <a>
                                <p>
                                  <span>{item.title}</span>
                                  <br />
                                  <small>{item.extraInfo}</small>
                                </p>
                              </a>
                            </Link>
                          ) : (
                            <p>
                              <span>{item.title}</span>
                              <br />
                              <small>{item.extraInfo}</small>
                            </p>
                          )}
                          <p>
                            <strong>
                              {item.price === 'Free' ||
                              item.price === 'free' ||
                              item.price === 'Free Entry' ||
                              item.price === 'Free entry' ||
                              item.price === 'free Entry' ||
                              item.price === 'free entry'
                                ? ''
                                : '£'}
                              {item.price}
                            </strong>
                          </p>
                        </div>
                      ) : null}
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className={styles.ticketCardLinks}>
            {bookingLink && (
              <Button type="button">
                <Link href={bookingLink}>
                  <a target="_blank" rel="noreferrer" className="js-event-book-online">
                    Book Now
                  </a>
                </Link>
              </Button>
            )}
            <Link href={ticketPathBySlug(slug)}>
              <a className={styles.ticketDetails}>
                <span>View Details</span>
                <IconContext.Provider value={{ color: '#E2211C', size: '20px' }}>
                  <div>
                    <FaChevronRight />
                  </div>
                </IconContext.Provider>
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketCard;
