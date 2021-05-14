export function getShortName(text:string ){
    var matches = text.match(/\b(\w)/g); // ['J','S','O','N']
    return matches?.join('');
}

export function getDayOfWeek(date: Date) {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    return weekday[date.getDay()];
}