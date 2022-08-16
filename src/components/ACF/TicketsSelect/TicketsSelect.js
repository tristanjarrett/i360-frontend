import ClassName from 'models/classname';
import TicketCard from 'components/TicketCard';
import styles from './TicketsSelect.module.scss';

const TicketsSelect = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);

  const mainStyles = sectionClassName.toString();

  return (
    <>
      {data && (
        <section className={mainStyles}>
          <div className="container">
            <div className="row">
              <div className="col">
                {data && (
                  <div className={`${styles.tickets} row d-flex flex-row flex-wrap`}>
                    {data?.selectTickets &&
                      data?.selectTickets?.map((ticket, index) => {
                        return (
                          <div key={index} className={`${styles.ticket} col-12 col-md-6 col-xl-4 mb-4`}>
                            <TicketCard ticket={ticket} />
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      ;
    </>
  );
};

export default TicketsSelect;
