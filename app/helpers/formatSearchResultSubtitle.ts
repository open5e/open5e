import type { SearchResult } from '@/types';
import { formatSpellSubtitle } from './formatSpellSubtitle';
import { parseChallengeRating } from './parseChallengeRating';

export function formatSearchResultSubtitle(result: SearchResult): string | null {
  if (result.object_model === 'Creature' && result.object?.cr) {
    const  { cr, type, size } = result.object;
    return `CR ${parseChallengeRating(cr)} · ${type} (${size})`;
  }

  if (result.object_model === 'Spell') {
    return formatSpellSubtitle({
      level: result.object?.level,
      school: result.object?.school,
    });
  }

  if (result.object_model === 'Item' && result.object?.is_magic_item) {
    return `${result.object.type}, ${result.object.rarity}`;
  }

  return null;
}
