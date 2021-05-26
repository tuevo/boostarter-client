import moment from 'moment';

export const daysFromNow = (toDate) => {
  const now = new Date();
  return Math.abs(
    moment(now, 'YYYY-MM-DD')
      .startOf('day')
      .diff(moment(toDate, 'YYYY-MM-DD').endOf('day'), 'days')
  );
}