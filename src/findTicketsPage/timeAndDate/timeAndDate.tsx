import { FC } from 'react';
import { setTime, setDate } from '../../utils/utils';
import styles from './timeAndDate.module.css';

export type TimeAndDateProps = {
    reverse: boolean,
    date: Date,
    side: 'left' | 'right'
}

const TimeAndDate: FC<TimeAndDateProps> = ({reverse, date, side}) =>{

    let styleDate = styles.date;
    let styleSide = side === 'left' ? styles.left : styles.right;
    let reverseStyle = reverse !== false ? styles.reverse : null;

    return (
        <div className={styleDate + ' ' + styleSide + ' ' + reverseStyle}>
            <p>{setTime(date)}</p>
            <p className={styles.small}>{setDate(date)}</p>
        </div>
    )
}

export default TimeAndDate;