export function knotToKmh(value) {
   if (!value && value != 0) return null;
   return parseFloat(value) * 1.852;
}