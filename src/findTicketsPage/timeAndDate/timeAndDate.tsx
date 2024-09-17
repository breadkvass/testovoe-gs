import styles from './timeAndDate.module.css';
import { setTime, setDate } from '../../utils/utils';

function TimeAndDate({reverse, date, side}: {reverse: boolean, date: Date, side: 'left' | 'right'} ) {

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