/**
 * Converts a snake_case string to Title Case
 *
 * @param {string} input - the snake_case string to convert
 * @returns {string} - Title Case version
 *
 * @example
 * snakeToTitleCase("bonus_actions") -> "Bonus Actions"
 */

export function snakeToTitleCase(input: string) {
  return input
    .toLowerCase()
    .split('_')
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ');
}
