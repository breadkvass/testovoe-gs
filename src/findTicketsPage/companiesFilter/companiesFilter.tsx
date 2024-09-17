import styles from './companiesFilter.module.css';

function CompaniesFilter() {
    return (
        <div className={styles.filter}>
            <h4 className={styles.title}>Авиакомпании</h4>
            <label className={styles.label} htmlFor="transferTrue">Компания 1
                <input type="checkbox" id="transferTrue" name="filter" value="transferTrue" />
            </label>

            <label className={styles.label} htmlFor="transferFalse">Компания 2
                <input type="checkbox" id="transferFalse" name="filter" value="transferFalse" />
            </label>
        </div>
    )
}

export default CompaniesFilter;