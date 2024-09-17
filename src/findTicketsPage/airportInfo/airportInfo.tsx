import { FC } from 'react';
import styles from './airportInfo.module.css';

export type AirportInfoProps = {
    airport: string;
    airportUid: string;
    city: string;
}

const AirportInfo: FC<AirportInfoProps> = ({city, airport, airportUid}) => {
    return (
        <div className={styles.cities}>
            <p>{city},</p>
            <p>{airport}</p>
            <p className={styles.uid}>&#40;{airportUid}&#41;</p>
        </div>
    )
}

export default AirportInfo;