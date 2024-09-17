import styles from './companiesFilter.module.css';

export type CompanyFilterItem = {
    key: string;
    name: string;
    minPrice: number;
    enabled: boolean;
}

type CompaniesFilterProps = {
    filters: CompanyFilterItem[];
    onChange: (itemKey: string, enabled: boolean) => void;
}

const CompaniesFilter: React.FC<CompaniesFilterProps> = ({filters, onChange}) => {
 
    const inputChangeHandler = (event:  React.ChangeEvent<HTMLInputElement>) => {
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