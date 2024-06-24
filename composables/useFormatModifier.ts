export const useFormatModifier = (
  input: string | number,
  inputType?: 'modifier' | 'score'
) => {
  const type = inputType ?? 'modifer';
  const inputNum = typeof input === 'string' ? parseInt(input) : input;
  const mod = type === 'score' ? Math.floor((inputNum - 10) / 2) : inputNum;
  return (mod < 0 ? '' : '+') + mod.toString();
};
