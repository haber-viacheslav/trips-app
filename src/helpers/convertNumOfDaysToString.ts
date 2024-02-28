/**
 * Converts a number representing the number of days to a string representation.
 * @param number The number of days.
 * @returns The string representation of the number of days.
 */
export const convertNumOfDaysToString = (number: number): string => {
  switch (number) {
    case 0:
      return `No Days`;
    case 1:
      return `${number} Day`;
    case 7:
      return 'Week';
    case 14:
      return '2 Weeks';
    case 15:
      return `${number} Days`;
    default:
      return `${number} Days`;
  }
};
