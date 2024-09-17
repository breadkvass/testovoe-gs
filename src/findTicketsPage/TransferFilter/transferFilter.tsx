import { FC, ChangeEvent } from 'react';
import styles from './transferFilter.module.css';

type TransferFilterProps = {
    oneTransfer: boolean;
    onOneTransferChange: (value: boolean) => void;
    noTransfer: boolean;
    onNoTransferChange: (value: boolean) => void;
}

const TransferFilter: FC<TransferFilterProps> = ({oneTransfer, onOneTransferChange, noTransfer, onNoTransferChange}) => {

    const oneTransferChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onOneTransferChange(event.target.checked);
    }

    const noTransferChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onNoTransferChange(event.target.checked);
    }

    return (
        <div className={styles.filter}>
            <h4 className={styles.title}>Фильтровать</h4>
            <label className={styles.label} htmlFor="transferTrue">- 1 пересадка
                <input type="checkbox" id="transferTrue" name="filter" value="transfer"  onChange={oneTransferChangeHandler} checked={oneTransfer} />
            </label>

            <label className={styles.label} htmlFor="transferFalse">- без пересадок
                <input type="checkbox" id="transferFalse" name="filter" value="noTransfer" onChange={noTransferChangeHandler} checked={noTransfer} />
            </label>
        </div>
    )
}

export default TransferFilter;