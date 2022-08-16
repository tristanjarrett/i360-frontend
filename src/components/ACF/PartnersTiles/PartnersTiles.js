import ClassName from 'models/classname';
import PartnerTile from 'components/Partners/PartnerTile';
import styles from './PartnersTiles.module.scss';

const PartnersTiles = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  return (
    <section className={mainStyles}>
      <div className="container">
        <div className="row">
          {data.partners &&
            data.partners.map((partner, index) => {
              return (
                <div key={index} className="col-12 col-sm-6 col-lg-4 mb-4">
                  <PartnerTile data={partner} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default PartnersTiles;
