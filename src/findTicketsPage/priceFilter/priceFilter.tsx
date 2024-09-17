import styles from './priceFilter.module.css';

function PriceFilter({
    onChangePriceMin,
    onChangePriceMax,
    minPrice,
    maxPrice
}: {
    onChangePriceMin: React.ChangeEventHandler<HTMLInputElement>,
    onChangePriceMax: React.ChangeEventHandler<HTMLInputElement>,
    minPrice: string;
    maxPrice: string
}) {
    return (
        <div className={styles.filter}>
            <h4 className={styles.title}>Цена</h4>
            <div className={styles.label}>
                <p>От</p>
                <input type="text" name="minPrice" placeholder='0' onChange={onChangePriceMin} value={minPrice} />
            </div>

            <div className={styles.label}>
                <p>До</p>
                <input type="text" name="maxPrice" placeholder='100000' onChange={onChangePriceMax} value={maxPrice}/>
            </div>
        </div>
    )
}

export default PriceFilter;