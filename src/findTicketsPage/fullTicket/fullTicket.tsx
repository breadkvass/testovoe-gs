import { FC } from 'react';
import logo from '../../assets/images/logo.png';
import Ticket from '../ticket/ticket';
import styles from './fullTicket.module.css';

const FullTicket: FC<any> = (flight) => {
    
    const flightInfo = flight.flight?.flight;

    const price = flightInfo?.price?.passengerPrices[0]?.singlePassengerTotal?.amount;
    const ticketThere = flightInfo?.legs[0];
    const ticketBack = flightInfo?.legs[1];

    return (
        <li className={styles.full}>
            <div className={styles.title}>
                <img className={styles.logo} src={logo} />
                <div className={styles.price}>
                    <p className={styles.result}>{price} &#8381;</p>
                    <p className={styles.desc}>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <div className={styles.info}>
                <Ticket ticketInfo={ticketThere} />
                <div className={styles.separator}></div>
                <Ticket ticketInfo={ticketBack} />
            </div>
            <button className={styles.button}>Выбрать</button>
        </li>
    )
}
  
export default FullTicket;