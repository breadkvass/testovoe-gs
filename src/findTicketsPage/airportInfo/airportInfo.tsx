import styles from './airportInfo.module.css';
import { DepartureAndArrival } from '../../types';

function AirportInfo({city, airport, airportUid}: DepartureAndArrival) {
    return (
        <div className={styles.cities}>
            <p>{city},</p>
            <p>{airport}</p>
            <p className={styles.uid}>&#40;{airportUid}&#41;</p>
        </div>
    )
}

export default AirportInfo;