import ClassName from 'models/classname';
import Accordion from 'components/Accordion';
import ImageObject from 'components/ImageObject';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaAngleRight } from 'react-icons/fa';
import styles from './Faqs.module.scss';

const Faqs = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  return (
    <section className={mainStyles}>
      {data.hasWaveTop === true &&
        (data.waveTopColour === 'grey' ? (
          <div className={styles.wave_top}>
            <ImageObject src="/assets/wave-grey-top.svg" alt="Wave Top" width="1920.354" height="80.336" />
          </div>
        ) : data.waveTopColour === 'white' ? (
          <div className={styles.wave_top}>
            <ImageObject src="/assets/wave-white-top.svg" alt="Wave Top" width="1920.354" height="80.336" />
          </div>
        ) : null)}
      <div
        className={`${styles.wrapper}
       ${data.backgroundColour === 'grey' ? styles.grey : data.backgroundColour === 'white' ? styles.white : ''}`}
        style={{
          paddingTop: `${
            data?.hasWaveTop === true ? '3rem' : data?.removeTopBottomMargins?.top === true ? '3rem' : '120px'
          }`,
          paddingBottom: `${
            data.hasWaveBottom === true ? '3rem' : data?.removeTopBottomMargins?.bottom === true ? '3rem' : '120px'
          }`,
        }}
      >
        <div className={styles.inner}>
          <div className="container">
            <div className="row">
              <div className="col">
                <h3 className="mb-3 d-flex justify-content-start">
                  {data.title}
                  <Link href="/about/faqs/">
                    <a className={styles.faqsLink}>
                      More FAQs
                      <IconContext.Provider value={{ color: 'red', size: '20px' }}>
                        <div className={styles.icon}>
                          <FaAngleRight />
                        </div>
                      </IconContext.Provider>
                    </a>
                  </Link>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {data &&
                  data.items.map((item) => {
                    return <Accordion key={item.id} className={styles.faq} data={item} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {data.hasWaveBottom === true &&
        (data.waveBottomColour === 'grey' ? (
          <div className={styles.wave_bottom}>
            <ImageObject src="/assets/wave-grey-bottom.svg" alt="Wave Bottom" width="1920.354" height="80.336" />
          </div>
        ) : data.waveBottomColour === 'white' ? (
          <div className={styles.wave_bottom}>
            <ImageObject src="/assets/wave-white-bottom.svg" alt="Wave Bottom" width="1920.354" height="80.336" />
          </div>
        ) : null)}
    </section>
  );
};

export default Faqs;
