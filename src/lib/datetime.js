import { format } from 'date-fns';

/**
 * formatDate
 */

export function formatDate(date, pattern = 'PPP') {
  return format(new Date(date), pattern);
}

export function formatDateName(date, format) {
  const nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const map = {
    mm: date.toLocaleString('en-EN', { month: 'long' }),
    dd: date.getDate(),
    day: date.toLocaleString('en-EN', { weekday: 'long' }),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  map.dd = map.dd + nth(map.dd);

  return format.replace(/mm|day|dd|yy|yyy/gi, (matched) => map[matched]);
}

export function formatDateNumbers(date, format) {
  const map = {
    mm: date.getMonth(),
    dd: date.getDate(),
    yy: date.getFullYear(),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

/**
 * sortObjectsByDate
 */

export function sortObjectsByDate(array, { key = 'date' } = {}) {
  return array.sort((a, b) => new Date(b[key]) - new Date(a[key]));
}
