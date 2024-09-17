import { FC, ChangeEvent } from 'react';
import styles from './sorter.module.css';

export type SorterType = 'price_asc' | 'price_desc' | 'duration';

type SorterProps = {
    onChange: (selectedSorter: SorterType) => void,
    sorter: SorterType
}

const Sorter: FC<SorterProps> = ({onChange, sorter}) => {

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value as SorterType)
    }

    return (
        <div className={styles.sorter}>
            <h4 className={styles.title}>Сортировать</h4>
            <label className={styles.label} htmlFor="ascPrice">- по возрастанию цены
                <input type="radio" id="ascPrice" name="sorter" value="price_asc" onChange={changeHandler} checked={sorter === 'price_asc'} />
            </label>
            <label className={styles.label} htmlFor="descPrice">- по убыванию цены
                <input type="radio" id="descPrice" name="sorter" value="price_desc" onChange={changeHandler} checked={sorter === 'price_desc'} />
            </label>
            <label className={styles.label} htmlFor="duration">- по времени в пути
                <input type="radio" id="duration" name="sorter" value="duration" onChange={changeHandler} checked={sorter === 'duration'} />
            </label>
        </div>
    )
}

export default Sorter;