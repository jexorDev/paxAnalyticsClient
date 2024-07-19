export function getDateTime(hour: number, minute: number, dayOffset: number): Date  {
    var date = new Date(Date.now());
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);

    date.setDate(date.getDate() + dayOffset);

    return date;
}

// function getLocalHour(hourUtc: number): number {
//     var dateUtc = new Date();
//     dateUtc.setUTCHours(hourUtc);
//     return dateUtc.getHours();
// }