export function parseChallengeRating(input: number | string): string {
  const cr = typeof(input) === 'number' 
    ? input
    : parseFloat(input);
  
  if (cr >= 1 || cr === 0) return cr.toString();

  const numerator = 1;
  const denominator = (1 / cr).toString();

  return `${numerator}/${denominator}`; 
}