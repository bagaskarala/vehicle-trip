
import { format, parseISO } from 'date-fns';

export function knotToKmh(value) {
   if (!value && value != 0) return null;
   return parseFloat(value) * 1.852;
}
export function formatTimezone(date, pattern = 'do MMMM, yyyy h:mm:aa', timeZone = 'Asia/Kuala_Lumpur') {
   const timeZoned = new Date(parseISO(date).toLocaleString('en-US', { timeZone: timeZone }));
   return format(timeZoned, pattern);
}