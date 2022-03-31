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
  const formattedDate = DateTime.fromJSDate(date).toFormat(
    `dd-MM-yyyy${separator}hh:mm:ss`,
  );

  return formattedDate;
};

export const getStartDateOfMonth = (date) => {
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
};

export const getEndDateOfMonth = (date) => {
  const newDate = getStartDateOfMonth(date);
  const endDate = DateTime.fromJSDate(newDate)
    .plus({ month: 1 })
    .minus({ day: 1 });

  return endDate.toJSDate();
};

export const getAllDaysOfMonth = (month, formatLabel = 'dd-MMM') => {
  const date = new Date();
  date.setMonth(month);
  date.setDate(1);

  const days = [];

  while (date.getMonth() === month) {
    days.push({
      date: date.getDate(),
      jsDate: new Date(date),
      label: DateTime.fromJSDate(date).toFormat(formatLabel),
    });
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const getAllDaysFromRangeDates = (date1, date2, formatLabel) => {
  if (!date1 || !date2) return [];

  const startDateInit = new Date(date1);
  startDateInit.setHours(0, 0, 0, 0);
  const endDateInit = new Date(date2);
  endDateInit.setHours(0, 0, 0, 0);

  let startDate = DateTime.fromJSDate(startDateInit);
  const endDate = DateTime.fromJSDate(endDateInit);

  const days = [];

  let countEquals = 0;

  while (startDate <= endDate) {
    if (startDate === endDate) {
      if (countEquals === 3) {
        throw new Error('getAllDaysFromRangeDates is in an infinite loop');
      }

      countEquals += 1;
    }

    const toJsDate = startDate.toJSDate();
    days.push({
      date: `${toJsDate.getDate()}-${toJsDate.getMonth()}`,
      jsDate: toJsDate,
      label: startDate.toFormat(formatLabel),
    });
    startDate = startDate.plus({ day: 1 });
  }

  return days;
};

export const datefromFormat = (text, format) => {
  const date = DateTime.fromFormat(text, format).toJSDate();

  return date;
};

export const subtractDate = (
  date,
  {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  } = {},
) => {
  const dateAux = DateTime.fromJSDate(new Date(date)).minus({
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  });

  return dateAux.toJSDate();
};

export default {
  monthNames,
  toFormat,
  getDatetime,
  getStartDateOfMonth,
  getEndDateOfMonth,
  getAllDaysOfMonth,
  getAllDaysFromRangeDates,
  datefromFormat,
  subtractDate,
};
