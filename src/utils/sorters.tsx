export function sort(sortingType: string, arr: any[]) {
    if (sortingType === 'ascPrice') {
        return [...arr].sort((item1: any, item2: any) => item1.flight.price.total.amount - item2.flight.price.total.amount);
    } else if (sortingType === 'descPrice') {
        return [...arr].sort((item1: any, item2: any) => item2.flight.price.total.amount - item1.flight.price.total.amount);
    } else {
        return [...arr].sort((item1: any, item2: any) => {
            return (item1.flight?.legs[0]?.duration + item1.flight.legs[1].duration) - (item2.flight?.legs[0]?.duration + item2.flight.legs[1].duration)
        });
    }
}

// export function companyFilter(company: string, arr: any[]) {
//     return
// }