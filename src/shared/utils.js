
import { format, parseISO, getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from 'date-fns';

export function knotToKmh(value) {
   if (!value && value != 0) return null;
   return parseFloat(value) * 1.852;
}

export function formatTimezone(date, pattern = 'do MMMM, yyyy h:mm aa', timeZone = 'Asia/Kuala_Lumpur') {
   date = parseISO(date);
   const dateInUTC = new Date(Date.UTC(getYear(date), getMonth(date), getDate(date), getHours(date), getMinutes(date), getSeconds(date)));
   const timeZoned = new Date(dateInUTC.toLocaleString('en-US', { timeZone: timeZone }));
   return format(timeZoned, pattern);
}