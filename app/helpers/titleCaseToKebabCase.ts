/**
 * Converts a Title Case string to kebab-case
 *
 * @param {string} input - the title-case string to convert
 * @returns {string} - kebav-case version
 *
 * @example
 * titleCaseToKebabCase("Hello, World!") -> rtns: "hello-world"
 */

export function titleCaseToKebabCase(input: string) {
  // regex to match punctuation for removal
  const punctionation = /[.,?!']/g;

  // remove punctuation, replace hyphens with spaces
  return input.toLowerCase().replace(punctionation, '').split(' ').join('-');
}
