import React, { useState, useEffect } from 'react';
import ClassName from 'models/classname';
import useMediaQuery from '../../../hooks/media-query';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaCaretDown } from 'react-icons/fa';
import styles from './Categories.module.scss';

const Categories = ({ className, data, active }) => {
  const sectionClassName = new ClassName(styles.categories);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  const isBreakpoint = useMediaQuery(575);

  data = data?.categories || data;

  // const onSelectChange = (e) => {
  //   e.preventDefault();
  // };

  const [isActive, setActive] = useState('false');

  const handleToggle = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data && (
        <section className={styles.section}>
          <div className="container-lg">
            <div className="row">
              <div className="col">
                {Array.isArray(data) && (
                  <div className={mainStyles}>
                    {isBreakpoint ? (
                      <>
                        <h6>Filter Tickets</h6>
                        <ul
                          onClick={handleToggle}
                          className={`${styles.select} ${isActive === true ? styles.active : ''}`}
                        >
                          <IconContext.Provider value={{ size: '20px' }}>
                            <div className={styles.icon}>
                              <FaCaretDown />
                            </div>
                          </IconContext.Provider>
                          <li className={`${active != null ? '' : styles.active}`}>
                            <Link href="/tickets/">
                              <a>All Tickets</a>
                            </Link>
                          </li>
                          {data.map((item, index) => {
                            return (
                              <li key={index + 1} className={`${active === item.name ? styles.active : ''}`}>
                                <Link
                                  key={index}
                                  href={`/tickets/categories/${item.name.replace(/\W+/g, '-').toLowerCase()}`}
                                >
                                  <a>{item.name}</a>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <>
                        <div key={0} className={`${styles.item} ${active != null ? '' : styles.item__active}`}>
                          <Link href="/tickets/">
                            <a>All Tickets</a>
                          </Link>
                        </div>
                        {data.map((item, index) => {
                          return (
                            <div
                              key={index + 1}
                              className={`${styles.item} ${active === item.name ? styles.item__active : ''}`}
                            >
                              <Link
                                key={index}
                                href={`/tickets/categories/${item.name.replace(/\W+/g, '-').toLowerCase()}`}
                              >
                                <a>{item.name}</a>
                              </Link>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Categories;
