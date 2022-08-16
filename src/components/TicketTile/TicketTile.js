import Link from 'next/link';
import Button from 'components/Button';
import Image from 'next/image';
import ImageObject from 'components/ImageObject';
import { formatDateName } from 'lib/datetime';
import blurData from 'components/blurData';

import { ticketPathBySlug, sanitizeExcerpt } from 'lib/tickets';

import styles from './TicketTile.module.scss';

const TicketTile = ({ ticket = {} }) => {
  const { title, excerpt, slug, featuredImage, ticketBookingLink, ticketPrices, ticketHeader } = ticket;

  let prices = ticketPrices?.prices;

  const bookingLink = ticketBookingLink?.url;
  const ticketDates = ticketHeader?.dates;
  const ticketDatesNo = ticketDates?.length;

  const currentDate = new Date().getTime();

  return (
    <div className={styles.ticketCard}>
      <div className={styles.ticketImage}>
        <Link href={ticketPathBySlug(slug)}>
          <a className={styles.ticketDetails}>
            {featuredImage?.node?.mediaDetails?.file ? (
              <div className={styles.ticketImageWrap}>
                <Image
                  {...featuredImage}
                  src={featuredImage?.node?.mediaDetails?.file || featuredImage?.mediaDetails?.file}
                  alt={featuredImage.node.altText}
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
          <div className={styles.ticketTop}>
            <Link href={ticketPathBySlug(slug)}>
              <a className="d-block">
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
                {ticketDates?.map((date, index) => {
                  const newDate = new Date(date.date);
                  return (
                    <h5
                      key={index}
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
                  __html: sanitizeExcerpt(excerpt),
                }}
              />
            )}
          </div>
          <div className={styles.ticketBottom}>
            {prices && (
              <div className={styles.ticketPrice}>
                <p>
                  <span>
                    <small>
                      {prices[0].title} {prices[0].extraInfo}
                    </small>
                  </span>
                  <br />
                  <strong>£{prices[0].price}</strong>
                </p>
              </div>
            )}
            {bookingLink && (
              <div className={styles.ticketCardLink}>
                <Button type="button">
                  <Link href={bookingLink}>
                    <a target="_blank" rel="noreferrer" className="js-event-book-online">
                      Book Now
                    </a>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTile;
