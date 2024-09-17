import { useState, useEffect } from 'react';
import { DepartureAndArrival } from '../../types';import { setDuration } from '../../utils/utils';
import arrow from '../../assets/images/arrow-right.svg';
import clockIcon from '../../assets/images/clock-icon.svg';
import AirportInfo from '../airportInfo/airportInfo';
import TimeAndDate from '../timeAndDate/timeAndDate';
import styles from './ticket.module.css';

const Ticket = (ticketInfo: any) => {
    const [ isTransfer, setIsTransfer ] = useState<boolean>(false);
    const ticket = ticketInfo?.ticketInfo?.segments;
    const ticketDuration = ticketInfo?.ticketInfo?.duration;

    const departure: DepartureAndArrival = {
        airport: ticket[0]?.departureAirport?.caption,
        airportUid: ticket[0]?.departureAirport?.uid,
        city: ticket[0]?.departureCity?.caption,
    }
    const departureDate: Date = new Date(ticket[0]?.departureDate);

    
    const arrival: DepartureAndArrival = {
        airport: isTransfer ? ticket[1]?.arrivalAirport?.caption : ticket[0]?.arrivalAirport?.caption,
        airportUid: isTransfer ? ticket[1]?.arrivalAirport?.uid : ticket[0]?.arrivalAirport?.uid,
        city: isTransfer ? ticket[1]?.arrivalCity?.caption : ticket[0]?.arrivalCity?.caption
    }
    const arrivalDate: Date = isTransfer ? new Date(ticket[1]?.arrivalDate) : new Date(ticket[0]?.arrivalDate);
   
    const duration = setDuration(ticketDuration);

    useEffect(() => {
        if (ticket.length > 1) {
            setIsTransfer(true);
        } else {
            setIsTransfer(false);
        }
    }, [])

    return (
        <div className={styles.ticket}>
            <div className={styles.airports}>
                <AirportInfo city={departure.city} airport={departure.airport} airportUid={departure.airportUid} />
                <img src={arrow} className={styles.arrow}/>
                <AirportInfo city={arrival.city} airport={arrival.airport} airportUid={arrival.airportUid} />
            </div>
            <div className={styles.timing}>
                <TimeAndDate reverse={false} date={departureDate} side={'left'}/>
                <div className={styles.duration}>
                    <img src={clockIcon} className={styles.icon}/>
                    <p className={styles.houres}>{duration}</p>
                </div>
                <TimeAndDate reverse={true} date={arrivalDate} side={'right'}/>
            </div>
            
            <div className={styles.transfers}>
                <hr className={styles.line} />
                {isTransfer && <p className={styles.transfer}>1 пересадка</p>}
            </div>
            <p className={styles.company}>Рейс выполняет: {ticket[0]?.airline?.caption}</p>
        </div>
    )
}

export default Ticket;