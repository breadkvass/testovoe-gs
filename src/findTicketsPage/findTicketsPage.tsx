import styles from './findTicketsPage.module.css';
import Sidebar from '../sidebar/sidebar';
import { useState, useEffect } from 'react';
import FullTicket from './fullTicket/fullTicket';
import { v4 as uuidv4 } from 'uuid';
import Sorter from './sorter/sorter';
import TransferFilter from './TransferFilter/transferFilter';
import PriceFilter from './priceFilter/priceFilter';
import CompaniesFilter from './companiesFilter/companiesFilter';
import { sort } from '../utils/sorters';

function FindTicketsPage() {
    const [ flightsQuantity, setFlightsQuantity ] = useState<number>(2);
    const [ sorter, setSorter ] = useState('ascPrice');
    const [ allFlights, setAllFlights ] = useState<any[]>([]);
    const [ singleTransfer, setSingleTransfer ] = useState<boolean>(false);
    const [ noTransfer, setNoTransfer ] = useState<boolean>(false);


    const clickHandler = () => {
        setFlightsQuantity(flightsQuantity + 2);
    }

    

    // function transferFilter(arr: any[]) {
    //     return [...arr].filter((item: any) => {
    //         return (item.flight.legs[0].segments.length > 1) || (item.flight.legs[1].segments.length > 1)
    //     })
    // }

    // function transferNoFilter(arr: any[]) {
    //     return [...arr].filter((item: any) => {
    //         return (item.flight.legs[0].segments.length === 1) && (item.flight.legs[1].segments.length === 1)
    //     });
    // }
    
    useEffect(() => {
        fetch('../../flights.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ой, ошибка в fetch: ' + response.statusText);
                }
                return response.json();
            })
            .then(jsonData => {
                setAllFlights(jsonData.result.flights);
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
            console.log(flightsToShow);
        } 
        // if (minPrice || maxPrice) {
        //     flightsToShow = flightsToShow
        //         .filter( ... )
        // }
        return sort(sorter, flightsToShow);
    }

    const flights = getData();

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
                    <PriceFilter />
                    <CompaniesFilter />
                </div>
            </Sidebar>
            <div className={styles.tickets}>
                <ul className={styles.list}>
                    {flights?.slice(0, flightsQuantity).map((item: any) => (<FullTicket key={uuidv4()} flight={item}/>))}
                </ul>
                {allFlights?.length > 2 && <button className={styles.button} onClick={clickHandler}>Показать ещё</button>}
            </div>
            
        </div>
    )
}
  
export default FindTicketsPage;