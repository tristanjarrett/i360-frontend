import { useState } from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaCaretDown } from 'react-icons/fa';
import styles from './TicketPrices.module.scss';

const TicketPrices = ({ data }) => {
  const [priceNum, setPriceNum] = useState(3);

  function handleClick() {
    setPriceNum((prevPriceNum) => prevPriceNum + 10);
  }

  return (
    <>
      {data && (
        <>
          <div className={styles.prices}>
            {data.slice(0, priceNum).map((item, index) => {
              return (
                <div key={index} className={styles.price}>
                  <div className={styles.ticketTitle}>
                    {item?.priceUrl?.url ? (
                      <Link href={item.priceUrl.url}>
                        <a className={styles.ticketPriceUrl}>
                          <span>{item.title}</span>
                          <br />
                          <small>{item.extraInfo}</small>
                        </a>
                      </Link>
                    ) : (
                      <>
                        <span>{item.title}</span>
                        <br />
                        <small>{item.extraInfo}</small>
                      </>
                    )}
                  </div>
                  <p className={styles.ticketPrice}>
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
                  {/* <p className={styles.ticketAdvPrice}>{item.advancePrice && <strong>£{item.advancePrice}</strong>}</p> */}
                </div>
              );
            })}
          </div>
          {data.length > 3 ? (
            priceNum < data.length ? (
              <div className={`d-flex flex-row ${styles.loadMore}`} onClick={handleClick}>
                <IconContext.Provider value={{ color: '#62BFCE', size: '20px' }}>
                  <span className={styles.masterLinkUrl}>
                    <FaCaretDown />
                  </span>
                </IconContext.Provider>
                <span>All prices...</span>
              </div>
            ) : null
          ) : null}
        </>
      )}
    </>
  );
};

export default TicketPrices;
