import styles from './priceFilter.module.css';

function PriceFilter() {
    return (
        <div className={styles.filter}>
            <h4 className={styles.title}>Цена</h4>
            <div className={styles.label}>
                <p>От</p>
                <input type="text" name="minPrice" placeholder='0'/>
            </div>

            <div className={styles.label}>
                <p>До</p>
                <input type="text" name="maxPrice" placeholder='100000'/>
            </div>
        </div>
    )
}

export default PriceFilter;