import { describe, expect, it } from 'vitest';
import type { SearchResult } from '@/types';
import {
  filterSearchResults,
  getLegacyContentRoute,
  getSlugFromKey,
  legacySlugToSearchQuery,
  LEGACY_CONTENT_ROUTES,
  parseLegacySourceSlug,
} from '@/helpers/legacyContentRoutes';
import { buildSearchResultUrl } from '@/helpers/buildSearchResultUrl';

function makeSearchResult(overrides: Partial<SearchResult> & Pick<SearchResult, 'object_pk' | 'object_model'>): SearchResult {
  return {
    object_name: 'Test',
    document: { key: 'srd', name: 'SRD' },
    highlighted: '',
    text: '',
    route: 'v2/creatures/',
    schema_version: 'v2',
    match_type: 'exact',
    matched_term: '',
    match_score: 1,
    ...overrides,
  } as SearchResult;
}

describe('getSlugFromKey', () => {
  it('returns the portion after the first underscore', () => {
    expect(getSlugFromKey('tob2_radiant-spark-swarm')).toBe('radiant-spark-swarm');
    expect(getSlugFromKey('srd-2024_goblin-minion')).toBe('goblin-minion');
  });

  it('returns the full key when no underscore is present', () => {
    expect(getSlugFromKey('goblin')).toBe('goblin');
  });
});

describe('legacySlugToSearchQuery', () => {
  it('converts hyphens to spaces', () => {
    expect(legacySlugToSearchQuery('radiant-spark-swarm')).toBe('radiant spark swarm');
    expect(legacySlugToSearchQuery('fireball')).toBe('fireball');
  });
});

describe('parseLegacySourceSlug', () => {
  it('splits source-suffixed slugs using the mapping table', () => {
    expect(parseLegacySourceSlug('aboleth-bf')).toEqual({
      baseSlug: 'aboleth',
      v2Prefix: 'bfrd',
    });
    expect(parseLegacySourceSlug('goblin-a5e')).toEqual({
      baseSlug: 'goblin',
      v2Prefix: 'a5e-mm',
    });
  });

  it('leaves flat slugs unchanged', () => {
    expect(parseLegacySourceSlug('aboleth')).toEqual({ baseSlug: 'aboleth' });
    expect(parseLegacySourceSlug('radiant-spark-swarm')).toEqual({
      baseSlug: 'radiant-spark-swarm',
    });
  });
});

describe('filterSearchResults', () => {
  const config = LEGACY_CONTENT_ROUTES.monsters;

  it('keeps only results whose slug suffix matches the legacy slug', () => {
    const results = [
      makeSearchResult({
        object_pk: 'srd_goblin',
        object_model: 'Creature',
        object: { cr: '0.25', type: 'Humanoid', size: 'Small' },
      }),
      makeSearchResult({
        object_pk: 'tob3_goblin-siege-engine',
        object_model: 'Creature',
        object: { cr: '11', type: 'Construct', size: 'Huge' },
      }),
      makeSearchResult({
        object_pk: 'a5e-mm_goblin',
        object_model: 'Creature',
        object: { cr: '0.25', type: 'Humanoid', size: 'Small' },
      }),
    ];

    const matches = filterSearchResults(results, 'goblin', config);

    expect(matches.map((result) => result.object_pk)).toEqual(['srd_goblin', 'a5e-mm_goblin']);
  });

  it('filters ambiguous matches by v2 prefix when a source suffix was provided', () => {
    const results = [
      makeSearchResult({
        object_pk: 'srd_goblin',
        object_model: 'Creature',
      }),
      makeSearchResult({
        object_pk: 'a5e-mm_goblin',
        object_model: 'Creature',
      }),
      makeSearchResult({
        object_pk: 'bfrd_goblin',
        object_model: 'Creature',
      }),
    ];

    expect(filterSearchResults(results, 'goblin', config, 'bfrd').map((r) => r.object_pk))
      .toEqual(['bfrd_goblin']);
  });

  it('filters magic items separately from equipment', () => {
    const results = [
      makeSearchResult({
        object_pk: 'srd_adamantine-armor',
        object_model: 'Item',
        object: { is_magic_item: true, type: 'Armor', rarity: 'Uncommon' },
      }),
      makeSearchResult({
        object_pk: 'srd_longsword',
        object_model: 'Item',
        object: { is_magic_item: false, type: 'Weapon', rarity: 'Common' },
      }),
    ];

    expect(filterSearchResults(results, 'adamantine-armor', LEGACY_CONTENT_ROUTES['magic-items']))
      .toHaveLength(1);
    expect(filterSearchResults(results, 'longsword', LEGACY_CONTENT_ROUTES.equipment))
      .toHaveLength(1);
  });
});

describe('getLegacyContentRoute', () => {
  it('parses supported legacy content routes', () => {
    expect(getLegacyContentRoute('/monsters/radiant-spark-swarm')).toEqual({
      config: LEGACY_CONTENT_ROUTES.monsters,
      slug: 'radiant-spark-swarm',
    });
    expect(getLegacyContentRoute('/magic-items/adamantine-armor/')).toEqual({
      config: LEGACY_CONTENT_ROUTES['magic-items'],
      slug: 'adamantine-armor',
    });
  });

  it('returns null for unsupported routes', () => {
    expect(getLegacyContentRoute('/classes/fighter')).toBeNull();
    expect(getLegacyContentRoute('/monsters')).toBeNull();
  });
});

describe('buildSearchResultUrl', () => {
  it('builds monster URLs from search results', () => {
    const result = makeSearchResult({
      object_pk: 'tob2_radiant-spark-swarm',
      object_model: 'Creature',
    });

    expect(buildSearchResultUrl(result)).toBe('/monsters/tob2_radiant-spark-swarm');
  });

  it('routes non-magic items to equipment', () => {
    const result = makeSearchResult({
      object_pk: 'srd_longsword',
      object_model: 'Item',
      object: { is_magic_item: false },
    });

    expect(buildSearchResultUrl(result)).toBe('/equipment/srd_longsword');
  });
});
