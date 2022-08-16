import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from 'components/Button';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import styles from './PopUp.module.scss';

const PopUp = ({ data }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const popUp = JSON.parse(localStorage.getItem('popUp'));
    if (popUp === 'popUp') {
      setVisible(false);
    } else {
      if (data.enable === true) {
        setVisible(true);
      }
    }
  }, [data.enable]);

  const onClose = () => {
    setVisible(false);
    localStorage.setItem('popUp', JSON.stringify('popUp'));
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <section className={`${styles.modal} ${visible === true ? styles.active : ''}`} onClick={handleCloseClick}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className={styles.modalContent}>
              <Button type="button" onClick={handleCloseClick} value="Close" className={styles.modalClose}>
                <IconContext.Provider value={{ size: '20px', color: 'white' }}>
                  <span>
                    <CgClose />
                  </span>
                </IconContext.Provider>
              </Button>
              <div dangerouslySetInnerHTML={{ __html: data.text }} />
              {data?.image?.mediaDetails?.file && (
                <Image
                  src={data.image.mediaDetails?.file}
                  layout="responsive"
                  height={data.image.mediaDetails.height}
                  width={data.image.mediaDetails.width}
                  alt={data.image.altText}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopUp;
