import { useNotifications } from './useNotifications';

const { addNotif } = useNotifications();

export function useDiceRoller(input: string | number) {
  // make sure dice signature is a string
  const signature = typeof input === 'string' ? input : input.toString();

  // extract numerical data from dice signature
  const parsed = parseDice(signature);

  // make sure parseDice rtn'd data before deconstructing arr.
  if (!parsed) return;

  const [number, dice, modifier] = parsed;

  // roll the dice
  const rolls = [...Array(number)].map(
    () => Math.floor(Math.random() * dice) + 1,
  );

  // add up the results and add the modifier
  const result = rolls.reduce((total, roll) => total + roll) + modifier;

  const formattedModifier = useFormatModifier(modifier, {
    showZero: false,
  });

  // push results to notifications
  addNotif({
    title: `Rolling ${number}d${dice} ${formattedModifier}`,
    body: result,
    footer: `[ ${rolls.join(', ')} ] ${formattedModifier}`,
  });

  return { signature, rolls, result };
}

function parseDice(input: string) {
  const pattern = /(\d*)[dD](\d+)\s*([+-]\s*\d+)?|^([+-]?\d+)\s*(?: to hit)?$/;

  // groups 1-3 handle values in full dice sig. ie. 1d20+4, group 4 captures solo mod ie. +5
  const matches = input.match(pattern);

  if (!matches) return;

  // groups 1-3 capture num/size/mod from dice sigs. in the form 1d20+4
  if (matches[2]) {
    const number = parseInt(matches[1] ?? 1);
    const size = parseInt(matches[2] ?? 20);
    const modifier = matches[3] ? parseInt(matches[3].split(' ').join('')) : 0;
    return [number, size, modifier];
  }

  // group 4 captures the modifier from +5 or +3 to hit
  if (matches[4]) {
    const modifier = parseInt(matches[4]);
    return [1, 20, modifier];
  }
}
