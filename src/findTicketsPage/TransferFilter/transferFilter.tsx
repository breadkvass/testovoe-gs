import styles from './transferFilter.module.css';

function TransferFilter({
    onChangeIsTransfer,
    onChangeNoTransfer,
    singleTransfer,
    noTransfer
}: {
    onChangeIsTransfer: React.ChangeEventHandler<HTMLInputElement>,
    onChangeNoTransfer: React.ChangeEventHandler<HTMLInputElement>,
    singleTransfer: boolean,
    noTransfer: boolean
}) {
    return (
        <div className={styles.filter}>
            <h4 className={styles.title}>Фильтровать</h4>
            <label className={styles.label} htmlFor="transferTrue">- 1 пересадка
                <input type="checkbox" id="transferTrue" name="filter" value="transfer"  onChange={onChangeIsTransfer} checked={singleTransfer} />
            </label>

            <label className={styles.label} htmlFor="transferFalse">- без пересадок
                <input type="checkbox" id="transferFalse" name="filter" value="noTransfer" onChange={onChangeNoTransfer} checked={noTransfer} />
            </label>
        </div>
    )
}

export default TransferFilter;