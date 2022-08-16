// import ClassName from 'models/classname';
import styles from './NavListItem.module.scss';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

const NavListItem = ({ className, item }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const nestedItems = (item.children || []).map((item) => {
    return <NavListItem key={item.id} item={item} />;
  });

  return (
    <li key={item.id} ref={ref}>
      {!item.path.includes('http') && !item.target && (
        <Link href={item.path}>
          <a title={item.title}>
            {item.label}
            {nestedItems.length > 0 && (
              <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                <div className={styles.icon}>
                  <FaAngleRight />
                </div>
              </IconContext.Provider>
            )}
          </a>
        </Link>
      )}
      {item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target}>
          {item.label}
          {nestedItems.length > 0 && (
            <IconContext.Provider value={{ color: 'white', size: '20px' }}>
              <div className={styles.icon}>
                <FaAngleRight />
              </div>
            </IconContext.Provider>
          )}
        </a>
      )}

      {nestedItems.length > 0 && (
        <>
          <button aria-expanded={dropdown ? 'true' : 'false'} onClick={() => setDropdown((prev) => !prev)}>
            <IconContext.Provider value={{ size: '20px' }}>
              <div>
                <FaAngleDown />
              </div>
            </IconContext.Provider>
          </button>
          <ul className={`${className} dropdown ${dropdown ? styles.show : ''}`}>{nestedItems}</ul>
        </>
      )}
    </li>
  );
};

export default NavListItem;
