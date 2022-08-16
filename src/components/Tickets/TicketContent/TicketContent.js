import styles from './TicketContent.module.scss';

const TicketContent = ({ data }) => {
  return (
    <>
      {data && (
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      )}
    </>
  );
};

export default TicketContent;
