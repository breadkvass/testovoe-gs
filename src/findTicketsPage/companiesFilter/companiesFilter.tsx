import { FC, ChangeEvent } from 'react';
import styles from './companiesFilter.module.css';

type CompaniesFilterProps = {
    filters: CompanyFilterItem[];
    onChange: (itemKey: string, enabled: boolean) => void;
}

export type CompanyFilterItem = {
    key: string;
    name: string;
    minPrice: number;
    enabled: boolean;
}

const CompaniesFilter: FC<CompaniesFilterProps> = ({filters, onChange}) => {
 
    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event.target.checked)
    }

    return (
        <div className={styles.filter}>
            <h4 className={styles.title}>Авиакомпании</h4>
            {filters.map((item: CompanyFilterItem) => {
                const itemId = 'company-filter_' + item.key;
                return (
                    <label className={styles.label} htmlFor={itemId} key={item.key}>
                        <div className={styles.price}>
                            <p className={styles.name}>- {item.name}</p>
                            <p>от {item.minPrice}&#8381;</p>
                        </div>
                        <input type="checkbox" id={itemId} name={item.name} value={item.key} checked={item.enabled} onChange={inputChangeHandler} />
                    </label>
                )
            })}
        </div>
    )
}

export default CompaniesFilter;