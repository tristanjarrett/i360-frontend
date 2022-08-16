import { useState } from 'react';
import styles from './Accordion.module.scss';

const Accordion = ({ data }) => {
  const heading = data?.title;
  const content = data?.content;
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={`${styles.item} ${isActive ? styles.active : ''}`}>
      <div
        className={`${styles.toggle} ${isActive ? styles.active : ''} faq_open_close`}
        onClick={() => setIsActive(!isActive)}
      >
        <h4>{heading}</h4>
        <span>{isActive ? '-' : '+'}</span>
      </div>
      {isActive && <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  );
};

export default Accordion;
