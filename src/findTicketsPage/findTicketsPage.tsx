import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CompanyFilterItem } from './companiesFilter/companiesFilter';
import Sidebar from '../sidebar/sidebar';
import FullTicket from './fullTicket/fullTicket';
import Sorter, { SorterType } from './sorter/sorter';
import TransferFilter from './TransferFilter/transferFilter';
import PriceFilter from './priceFilter/priceFilter';
import CompaniesFilter from './companiesFilter/companiesFilter';
import styles from './findTicketsPage.module.css';

const FindTicketsPage = () => {
    const [ allFlights, setAllFlights ] = useState<any[]>([]);
    const [ flightsQuantity, setFlightsQuantity ] = useState<number>(2);
    const [ sorter, setSorter ] = useState<SorterType>('price_asc');
    const [ oneTransfer, setOneTransfer ] = useState<boolean>(false);
    const [ noTransfer, setNoTransfer ] = useState<boolean>(false);
    const [ minPrice, setMinPrice ] = useState<number | null>(null);
    const [ maxPrice, setMaxPrice ] = useState<number | null>(null);
    const [ companiesFilter, setCompaniesFilter ] = useState<CompanyFilterItem[]>([]);

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

    const flights = useMemo(() => {
        let flightsToShow = allFlights;
        let enabledCompaniesFilters = companiesFilter.filter(filter => filter.enabled).map(filter => filter.name);

        if (oneTransfer || noTransfer) {
            flightsToShow = flightsToShow
                .filter(item => {
                    return (noTransfer && ((item.flight.legs[0].segments.length === 1) && (item.flight.legs[1].segments.length === 1)))
                        || (oneTransfer && ((item.flight.legs[0].segments.length === 2) || (item.flight.legs[1].segments.length === 2)))
                });
        } 

        if (minPrice) {
            flightsToShow = flightsToShow
                .filter(item => {
                    return (item.flight.price.total.amount >= minPrice)
                });
        } 

        if (maxPrice) {
            flightsToShow = flightsToShow
                .filter(item => {
                    return (item.flight.price.total.amount <= maxPrice)
                });
        }

        if (enabledCompaniesFilters && enabledCompaniesFilters.length > 0) {
            flightsToShow = flightsToShow.filter(flight => enabledCompaniesFilters.includes(flight.flight.carrier.caption))        
        }

        return sortFligths(sorter, flightsToShow);

    }, [allFlights, oneTransfer, noTransfer, companiesFilter, minPrice, maxPrice, sorter]);


    const clickHandler = () => {
        setFlightsQuantity(flightsQuantity + 2);
    }

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
            }
        })
    }

    return (
        <div className={styles.page}>
            <Sidebar>
                <div className={styles.filter}>
                    <Sorter sorter={sorter} onChange={newSorter => setSorter(newSorter)} />
                    <TransferFilter
                        oneTransfer={oneTransfer} onOneTransferChange={value => setOneTransfer(value)}                        
                        noTransfer={noTransfer} onNoTransferChange={value => setNoTransfer(value)}
                    />
                    <PriceFilter 
                        minPrice={minPrice} onMinPriceChange={min => setMinPrice(min)}
                        maxPrice={maxPrice} onMaxPriceChange={max => setMaxPrice(max)}
                    />
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

const sortFligths = (sortType: SorterType, fligths: any[]) => {
    switch(sortType) {
        case 'duration': 
            return fligths.sort((item1: any, item2: any) => {
                return (item1.flight?.legs[0]?.duration + item1.flight.legs[1].duration) - (item2.flight?.legs[0]?.duration + item2.flight.legs[1].duration)
            });
        case 'price_desc':
            return fligths.sort((item1: any, item2: any) => item2.flight.price.total.amount - item1.flight.price.total.amount);
        case 'price_asc': 
            return fligths.sort((item1: any, item2: any) => item1.flight.price.total.amount - item2.flight.price.total.amount);
        default:
            return fligths;
      }
}

export default FindTicketsPage;