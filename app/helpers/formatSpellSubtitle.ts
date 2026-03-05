import { SPELL_LEVELS_NAMES } from '@/constants';

interface SpellSubtitle {
  level: number | undefined;
  school: string | undefined;
}
export const formatSpellSubtitle = ({ level, school }: SpellSubtitle) => {
  if (typeof level !== 'number') return `${school} Spell`;
  const spellType = `${school} ${level && level > 0 ? 'Spell' : 'Cantrip'}`;
  const spellLevel = level > 0 ? SPELL_LEVELS_NAMES[level] + ' ' : '';
  return spellLevel + spellType;
};