/**
 * Formats a UNIX timestamp into a string based on the specified format.
 * @param unixMs The UNIX timestamp in milliseconds.
 * @param format The format to use. Use 'toPoints' for 'DD.MM.YYYY' format, otherwise 'YYYY-MM-DD'.
 * @returns The formatted date string.
 */
export const formatRequestDate = (
  unixMs: number | Date,
  format: 'toPoints' | 'toDashes'
): string => {
  const date = new Date(unixMs);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return format === 'toPoints'
    ? `${day}.${month}.${year}`
    : `${year}-${month}-${day}`;
};
