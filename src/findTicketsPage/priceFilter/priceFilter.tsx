import { FC, ChangeEvent } from 'react';
import styles from './priceFilter.module.css';

type PriceFilterProps = {
    minPrice: number | null;
    onMinPriceChange: (value: number | null) => void;
    maxPrice: number | null;
    onMaxPriceChange: (value: number | null) => void;
}

const PriceFilter: FC<PriceFilterProps> = ({minPrice, onMinPriceChange, maxPrice, onMaxPriceChange}) => {

    const parseNumber = (value: string) => {
        const parsed = Number.parseInt(value);
        if (Number.isNaN(parsed)) {
          return null;
        }
        return parsed;
    }

    const minPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onMinPriceChange(parseNumber(event.target.value));
    }

    const maxPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onMaxPriceChange(parseNumber(event.target.value));
    }
    
    return (
        <div className={styles.filter}>
            <h4 className={styles.title}>Цена</h4>
            <div className={styles.label}>
                <p>От</p>
                <input type="number" name="minPrice" placeholder='0' onChange={minPriceChangeHandler} value={minPrice || ''} />
            </div>

            <div className={styles.label}>
                <p>До</p>
                <input type="number" name="maxPrice" placeholder='100000' onChange={maxPriceChangeHandler} value={maxPrice || ''}/>
            </div>
        </div>
    )
}

export default PriceFilter;