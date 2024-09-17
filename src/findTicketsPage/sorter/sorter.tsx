import styles from './sorter.module.css';

function Sorter({onChange, sorter}: {onChange: React.ChangeEventHandler<HTMLInputElement>, sorter: string}) {

    return (
        <div className={styles.sorter}>
            <h4 className={styles.title}>Сортировать</h4>
            <label className={styles.label} htmlFor="ascPrice">- по возрастанию цены
                <input type="radio" id="ascPrice" name="sorter" value="ascPrice" onChange={onChange} checked={sorter === 'ascPrice'} />
            </label>

            <label className={styles.label} htmlFor="descPrice">- по убыванию цены
                <input type="radio" id="descPrice" name="sorter" value="descPrice" onChange={onChange} checked={sorter === 'descPrice'} />
            </label>

            <label className={styles.label} htmlFor="duration">- по времени в пути
                <input type="radio" id="duration" name="sorter" value="duration" onChange={onChange} checked={sorter === 'duration'} />
            </label>
        </div>
    )
}

export default Sorter;