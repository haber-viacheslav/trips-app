/**
 * Retrieves the day of the week for a given date.
 * @param dateData The date for which to retrieve the day of the week.
 * @returns The day of the week as a string.
 */
export const getDayOfWeek = (dateData: Date | string): string => {
  const date = new Date(dateData);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return daysOfWeek[date.getDay()];
};
