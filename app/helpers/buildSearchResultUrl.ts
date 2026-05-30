import type { SearchResult } from '@/types';

const endpoints = {
  Creature: 'monsters',
  Spell: 'spells',
  Species: 'species',
  Section: 'sections',
  Item: 'magic-items',
  Feat: 'feats',
  Background: 'backgrounds',
  CharacterClass: 'classes',
  Rule: 'rules',
  Condition: 'conditions',
};

export function buildSearchResultUrl(input: SearchResult): string {
  let baseUrl = endpoints[input.object_model as keyof typeof endpoints] ?? input.object_model;

  if (baseUrl === 'magic-items' && !input?.object?.is_magic_item)
    baseUrl = 'equipment';

  if (input?.object?.subclass_of) baseUrl += `/${input.object.subclass_of?.key}`;

  if (input?.object?.subspecies_of)
    return `/${baseUrl}/${input.object.subspecies_of.key}`;

  if (baseUrl === 'rules') {
    const rulesetKey = input.object_pk.split('_').slice(0, 2).join('_');
    return `/${baseUrl}/${rulesetKey}`;
  }

  return `/${baseUrl}/${input.object_pk}`;
}
