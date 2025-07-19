/* useFormatModifier generates a formatted modifier from either a numerical
 * modifier or an ability score. */

export const useFormatModifier = (
  input: string | number | undefined,
  options?: {
    inputType?: 'modifier' | 'score';
    showZero?: boolean;
  },
) => {
  if (input === undefined) return '-';

  // set options defaults
  const type = options?.inputType ?? 'modifer';
  const showZero = options?.showZero ?? true;

  // cast input to number
  const inputNum = typeof input === 'string' ? parseInt(input) : input;

  // handle 0s is showZero option is false
  if (inputNum === 0 && !showZero) return '';

  // convert score to mod
  const mod = type === 'score' ? Math.floor((inputNum - 10) / 2) : inputNum;

  // remove '-' from negative numbers, add back a '+' OR '-'
  return (mod < 0 ? '-' : '+') + mod.toString().replace('-', '');
};
