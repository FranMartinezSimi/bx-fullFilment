import { DateTime } from 'luxon';

export const monthNames = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

export const toFormat = (date, format = 'dd-MM-yyyy') => {
  const formattedDate = DateTime.fromJSDate(date).toFormat(format);

  return formattedDate;
};

export const getDatetime = (date, separator = ' ') => {
  const formattedDate = DateTime.fromJSDate(date).toFormat(`dd-MM-yyyy${separator}hh:mm:ss`);

  return formattedDate;
};

export default {
  monthNames,
  toFormat,
  getDatetime,
};
