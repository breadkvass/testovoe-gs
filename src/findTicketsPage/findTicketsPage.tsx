import styles from './findTicketsPage.module.css';
import Sidebar from '../sidebar/sidebar';
import { useState, useEffect } from 'react';
import FullTicket from './fullTicket/fullTicket';
import { v4 as uuidv4 } from 'uuid';
import Sorter from './sorter/sorter';
import TransferFilter from './TransferFilter/transferFilter';
import PriceFilter from './priceFilter/priceFilter';
import CompaniesFilter, { CompanyFilterItem } from './companiesFilter/companiesFilter';
import { sort } from '../utils/sorters';

function FindTicketsPage() {
    const [ allFlights, setAllFlights ] = useState<any[]>([]);
    const [ flightsQuantity, setFlightsQuantity ] = useState<number>(2);
    const [ sorter, setSorter ] = useState('ascPrice');
    const [ singleTransfer, setSingleTransfer ] = useState<boolean>(false);
    const [ noTransfer, setNoTransfer ] = useState<boolean>(false);
    const [ minPrice, setMinPrice ] = useState('');
    const [ maxPrice, setMaxPrice ] = useState('');
    const [ companiesFilter, setCompaniesFilter ] = useState<CompanyFilterItem[]>([]);

    const clickHandler = () => {
        setFlightsQuantity(flightsQuantity + 2);
    }
    
    useEffect(() => {
        fetch('./flights.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ой, ошибка в fetch: ' + response.statusText);
                }
                return response.json();
            })
            .then(jsonData => {
                setAllFlights(jsonData.result.flights);
                setCompaniesFilter(initCompanyFilters(jsonData.result.flights))
            })
            .catch(error => console.error('Ошибка при исполнении запроса: ', error));
        
    }, [])

    const getData = () => {
        let flightsToShow = allFlights;
        if (singleTransfer || noTransfer) {
            flightsToShow = flightsToShow
                .filter(item => {
                    return (noTransfer && ((item.flight.legs[0].segments.length === 1) && (item.flight.legs[1].segments.length === 1)))
                        || (singleTransfer && ((item.flight.legs[0].segments.length === 2) || (item.flight.legs[1].segments.length === 2)))
                });
        } 

        if (minPrice && maxPrice) {
            flightsToShow = flightsToShow
                .filter(item => {
                    return ((item.flight.price.total.amount >= Number(minPrice)) && (item.flight.price.total.amount <= Number(maxPrice)))
                });
        } else if (minPrice) {
            flightsToShow = flightsToShow
                .filter(item => {
                    return (item.flight.price.total.amount >= Number(minPrice))
                });
        } else if (maxPrice) {
            flightsToShow = flightsToShow
                .filter(item => {
                    return (item.flight.price.total.amount <= Number(maxPrice))
                });
        }

        let enabledCompaniesFilters = companiesFilter.filter(filter => filter.enabled).map(filter => filter.name);

        if (enabledCompaniesFilters && enabledCompaniesFilters.length > 0) {

            flightsToShow = flightsToShow.filter(flight => enabledCompaniesFilters.includes(flight.flight.carrier.caption))
            // console.log(flightsToShow.filter(flight => enabledCompaniesFilters.includes(flight.flight.carrier.caption)));
        
        }

        return sort(sorter, flightsToShow);
    }

    const flights = getData();

    const companyFilterChangeHandler = (itemKey: string, enabled: boolean) => {
        setCompaniesFilter(prev => {
            let filter = prev.find(item => item.key === itemKey);
            

            if (!filter) {
                return prev
            } else {
                let index = prev.indexOf(filter);

                prev[index] = {
                    ...prev[index],
                    enabled: enabled
                }
                
                return [...prev];

                // filter.enabled = enabled;

                // return [
                //     ...prev.filter(item => item.key !== itemKey),
                //     filter
                // ];
            }
        })
    }

    return (
        <div className={styles.page}>
            <Sidebar>
                <div className={styles.filter}>
                    <Sorter onChange={(e) => {setSorter(e.target.value)}} sorter={sorter} />
                    <TransferFilter
                        onChangeIsTransfer={(e) => {setSingleTransfer(e.target.checked)}}
                        onChangeNoTransfer={(e) => {setNoTransfer(e.target.checked)}}
                        singleTransfer={singleTransfer}
                        noTransfer={noTransfer}  />
                    <PriceFilter 
                        onChangePriceMin={(e) => {setMinPrice(e.target.value)}}
                        onChangePriceMax={(e) => {setMaxPrice(e.target.value)}}
                        minPrice={minPrice}
                        maxPrice={maxPrice}/>
                    <CompaniesFilter filters={companiesFilter} onChange={companyFilterChangeHandler} />
                </div>
            </Sidebar>
            <div className={styles.tickets}>
                <ul className={styles.list}>
                    {flights?.slice(0, flightsQuantity).map((item: any) => (<FullTicket key={uuidv4()} flight={item}/>))}
                </ul>
                {flights?.length > 2 && <button className={styles.button} onClick={clickHandler}>Показать ещё</button>}
            </div>
            
        </div>
    )
}

const initCompanyFilters = (allFlights: any[]): CompanyFilterItem[] => {
    const companies = Array.from(new Set(allFlights.map(item => item.flight.carrier.caption))); // TODO useMemo
    
    const getMinPrice = (company: string) => {
        const companyPrices = allFlights
            .filter(item => item.flight.carrier.caption === company)
            .map(item => item.flight.price.total.amount);
        return Math.min(...companyPrices);
    }

    return companies.map(company => ({
        key: uuidv4(),
        name: company,
        minPrice: getMinPrice(company),
        enabled: false,
    } as CompanyFilterItem));
}
  
export default FindTicketsPage;