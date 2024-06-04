export function useDiceRoller(signature: string) {
  // extract numerical data from dice signature
  const [number, dice, modifier] = parseDice(signature);

  // roll the dice
  const rolls = [...Array(number)].map(
    () => Math.floor(Math.random() * dice) + 1
  );

  // add up the results and add the modifier
  const result =
    rolls.reduce((accumulator, current) => accumulator + current) + modifier;
  return { signature, rolls, result };
}

function parseDice(input: string) {
  // remove all spaces from input
  const inputNoSpaces = input.split(' ').join();

  // def. regex pattern for dice signature, ie. 1d20+5
  const patternDiceAndMod = /(\d*)d(\d+)\s*([+-]\s*\d+)?/;
  const matchesDiceAndMod = inputNoSpaces.match(patternDiceAndMod);

  // if we find a match, extract dice no., dice size, and mod.
  if (matchesDiceAndMod) {
    const number = matchesDiceAndMod[0] ? parseInt(matchesDiceAndMod[0]) : 1;
    const dice = parseInt(matchesDiceAndMod[2]);
    const modifier = parseInt(matchesDiceAndMod[3]);
    return [number, dice, modifier];
  }

  // if we don't find a match, check whether input is just a modifier, ie. -5
  const patternModifierOnly = /^([+-]\d+)$/;
  const modifierOnlyMatch = inputNoSpaces.match(patternModifierOnly);
  if (modifierOnlyMatch) {
    const number = 1;
    const dice = 20;
    const modifier = parseInt(modifierOnlyMatch[1]);
    return [number, dice, modifier];
  }
}
