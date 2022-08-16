import styles from './Main.module.scss';

const Main = ({ children, hasNotification }) => {
  return <main className={`${styles.main} ${hasNotification ? styles.hasNotification : ''}`}>{children}</main>;
};

export default Main;
