import TicketCard from 'components/TicketCard';

import styles from 'styles/templates/Tickets.module.scss';

const DEFAULT_TICKET_OPTIONS = {};

export default function TemplateTicket({ tickets, ticketOptions = DEFAULT_TICKET_OPTIONS }) {
  return (
    <>
      {Array.isArray(tickets) && (
        <>
          <ul className={`${styles.tickets} row d-flex flex-row flex-wrap`}>
            {tickets.map((ticket) => {
              return (
                <li key={ticket.databaseId.toString()} className={`${styles.ticket} col-12 col-md-6 col-xl-4`}>
                  <TicketCard ticket={ticket} options={ticketOptions} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
