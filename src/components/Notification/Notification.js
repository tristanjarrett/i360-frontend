import ClassName from 'models/classname';
import styles from './Notification.module.scss';

const Notification = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  return (
    <section className={mainStyles}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div dangerouslySetInnerHTML={{ __html: data.text }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notification;
