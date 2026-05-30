import type { SearchResult } from '@/types';
import { formatSpellSubtitle } from './formatSpellSubtitle';

export function formatSearchResultSubtitle(result: SearchResult): string | null {
  if (result.object_model === 'Creature' && result.object?.cr) {
    return `CR ${result.object.cr} · ${result.object.type} (${result.object.size})`;
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
