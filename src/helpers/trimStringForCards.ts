/**
 * Trims a string to remove everything after a specified substring.
 * @param str The input string to be trimmed.
 * @param substring The substring to trim the input string at.
 * @returns The trimmed string.
 * @throws Error if either parameter is not a string.
 */
export const trimStringForCards = (str: string, substring: string): string => {
  if (typeof str !== 'string' || typeof substring !== 'string') {
    throw new Error('Both parameters must be strings');
  }

  const index = str.indexOf(substring);
  if (index !== -1) {
    return str.slice(0, index);
  }
  return str;
};
