export function setTime(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    function isNeedZero(number: number) {
        if (number < 10) {
            return '0' + number.toString();
        } else {
            return number.toString();
        }
    }

    return isNeedZero(hours) + ':' + isNeedZero(minutes);
}

export function setDate(date: Date) {
    let num = date.getDate();
    let month = date.toLocaleString('default', { month: 'short' }).slice(0, 3) + '.';
    let dayWeek = date.toLocaleString('ru-RU', { weekday: 'short' });

    return num + ' ' + month + ' ' + dayWeek;
}

export function setDuration(duration: any) {
    let res = (duration/60).toString();
    let hours;
    let day;
    let minutes;
    
    if (res.indexOf('.') > 0) {
        hours = res.split('');
        hours.splice(res.indexOf('.'));
        hours = Number(hours.join(''));

        if (hours >= 24) {
            day =  Math.floor(hours / 24);
            hours = hours - (day*24);
            minutes = Math.round(Number('0' + res.toString().split('').splice(res.toString().indexOf('.')).join(''))*60);
            res = day + ' д ' + hours + ' ч ' + minutes + ' мин';
        } else {
            minutes = Math.round(Number('0' + res.toString().split('').splice(res.toString().indexOf('.')).join(''))*60);
            res = hours + ' ч ' + minutes + ' мин';
        }
    } else {
        res = res + ' ч'
    }
    
    return res
}