import ClassName from 'models/classname';
import ImageObject from 'components/ImageObject';
import TicketTile from 'components/TicketTile';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';
import styles from './TicketsTiles.module.scss';

const TicketsTiles = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  return (
    <section className={mainStyles}>
      <div
        className={styles.content}
        style={{
          backgroundColor: `${
            data.backgroundColour === 'white' ? 'white' : data.backgroundColour === 'grey' ? '#f5f5f5' : 'transparent'
          }`,
        }}
      >
        <div className="container">
          <div className="row d-flex flex-row flex-wrap g-0">
            {data?.specialOffers && (
              <div className={`col-12 col-lg-6 col-xl-4 ${styles.column}`}>
                <h4 className={`${styles.ticketCategory} text-center mb-4`}>
                  <span>Special Offers</span>
                  <IconContext.Provider value={{ color: '#E2211C', size: '30px' }}>
                    <div className="d-lg-none">
                      <FaCaretDown />
                    </div>
                  </IconContext.Provider>
                </h4>
                <TicketTile ticket={data.specialOffers[0]} />
                <div className={styles.ticketDetails}>
                  <Link href="/tickets/categories/special-offer/">
                    <a>
                      <span>View All Offers</span>
                      <IconContext.Provider value={{ color: '#E2211C', size: '15px' }}>
                        <div>
                          <FaChevronRight />
                        </div>
                      </IconContext.Provider>
                    </a>
                  </Link>
                </div>
              </div>
            )}
            {data?.whatsOn && (
              <div className={`col-12 col-lg-6 col-xl-4 ${styles.column}`}>
                <h4 className={`${styles.ticketCategory} text-center mb-4`}>
                  What&rsquo;s On
                  <IconContext.Provider value={{ color: '#E2211C', size: '30px' }}>
                    <div className="d-lg-none">
                      <FaCaretDown />
                    </div>
                  </IconContext.Provider>
                </h4>
                <TicketTile ticket={data.whatsOn[0]} />
                <div className={styles.ticketDetails}>
                  <Link href="/whats-on/">
                    <a>
                      <span>View All Events</span>
                      <IconContext.Provider value={{ color: '#E2211C', size: '15px' }}>
                        <div>
                          <FaChevronRight />
                        </div>
                      </IconContext.Provider>
                    </a>
                  </Link>
                </div>
              </div>
            )}
            {data?.tickets && (
              <div className={`col-12 col-lg-6 col-xl-4 ${styles.column}`}>
                <h4 className={`${styles.ticketCategory} text-center mb-4`}>
                  Flight Tickets
                  <IconContext.Provider value={{ color: '#E2211C', size: '30px' }}>
                    <div className="d-lg-none">
                      <FaCaretDown />
                    </div>
                  </IconContext.Provider>
                </h4>
                <TicketTile ticket={data.tickets[0]} />
                <div className={styles.ticketDetails}>
                  <Link href="/tickets/">
                    <a>
                      <span>View All Tickets</span>
                      <IconContext.Provider value={{ color: '#E2211C', size: '15px' }}>
                        <div>
                          <FaChevronRight />
                        </div>
                      </IconContext.Provider>
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {data.waveBottom === true && (
        <>
          {data.backgroundColour === 'grey' ? (
            <div className={styles.wave}>
              <ImageObject src="/assets/wave-grey-bottom.svg" alt="Wave Bottom" width="1920" height="210" />
            </div>
          ) : data.backgroundColour === 'white' ? (
            <div className={styles.wave}>
              <ImageObject src="/assets/wave-white-bottom.svg" alt="Wave Bottom" width="1920" height="210" />
            </div>
          ) : null}
        </>
      )}
    </section>
  );
};

export default TicketsTiles;
