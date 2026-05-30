import type { SearchResult } from '@/types';
import { buildSearchResultUrl } from './buildSearchResultUrl';

export type LegacyContentRouteConfig = {
  apiEndpoint: string;
  objectModel: string;
  basePath: string;
  resultFilter?: (result: SearchResult) => boolean;
};

export const V1_SUFFIX_TO_V2_PREFIX: Record<string, string> = {
  bf: 'bfrd',
  blackflag: 'bfrd',
  a5e: 'a5e-mm',
  menagerie: 'a5e-mm',
  tob: 'tob',
  'tob-2023': 'tob-2023',
  tob2: 'tob2',
  tob3: 'tob3',
  cc: 'ccdx',
  srd: 'srd',
  'wotc-srd': 'srd',
  o5e: 'open5e',
  dmag: 'deepm',
  'dmag-e': 'deepmx',
  warlock: 'wz',
  vom: 'vom',
  toh: 'toh',
  taldorei: 'tdcs',
  kp: 'kp',
};

export const LEGACY_CONTENT_ROUTES: Record<string, LegacyContentRouteConfig> = {
  monsters: {
    apiEndpoint: 'v2/creatures/',
    objectModel: 'Creature',
    basePath: 'monsters',
  },
  spells: {
    apiEndpoint: 'v2/spells/',
    objectModel: 'Spell',
    basePath: 'spells',
  },
  'magic-items': {
    apiEndpoint: 'v2/magicitems/',
    objectModel: 'Item',
    basePath: 'magic-items',
    resultFilter: (result) => result.object?.is_magic_item === true,
  },
  equipment: {
    apiEndpoint: 'v2/items/',
    objectModel: 'Item',
    basePath: 'equipment',
    resultFilter: (result) => result.object?.is_magic_item !== true,
  },
  feats: {
    apiEndpoint: 'v2/feats/',
    objectModel: 'Feat',
    basePath: 'feats',
  },
  backgrounds: {
    apiEndpoint: 'v2/backgrounds/',
    objectModel: 'Background',
    basePath: 'backgrounds',
  },
  conditions: {
    apiEndpoint: 'v2/conditions/',
    objectModel: 'Condition',
    basePath: 'conditions',
  },
  species: {
    apiEndpoint: 'v2/species/',
    objectModel: 'Species',
    basePath: 'species',
  },
};

export type LegacySlugResolution =
  | { status: 'exists' }
  | { status: 'redirect'; url: string }
  | { status: 'disambiguate'; matches: SearchResult[] }
  | { status: 'not_found' };

export function getSlugFromKey(key: string): string {
  const idx = key.indexOf('_');
  return idx === -1 ? key : key.slice(idx + 1);
}

export function legacySlugToSearchQuery(slug: string): string {
  return slug.replace(/-/g, ' ');
}

const LEGACY_SOURCE_SUFFIXES = Object.keys(V1_SUFFIX_TO_V2_PREFIX).sort((a, b) => b.length - a.length);

export function parseLegacySourceSlug(slug: string): { baseSlug: string; v2Prefix?: string } {
  if (slug.includes('_')) return { baseSlug: slug };

  for (const suffix of LEGACY_SOURCE_SUFFIXES) {
    if (!slug.endsWith(`-${suffix}`)) continue;

    const baseSlug = slug.slice(0, -(suffix.length + 1));
    if (!baseSlug) continue;

    return {
      baseSlug,
      v2Prefix: V1_SUFFIX_TO_V2_PREFIX[suffix],
    };
  }

  return { baseSlug: slug };
}

export function filterSearchResults(
  results: SearchResult[],
  legacySlug: string,
  config: LegacyContentRouteConfig,
  v2Prefix?: string,
): SearchResult[] {
  return results.filter((result) => {
    if (result.object_model !== config.objectModel) return false;
    if (config.resultFilter && !config.resultFilter(result)) return false;
    if (getSlugFromKey(result.object_pk) !== legacySlug) return false;
    if (v2Prefix && !result.object_pk.startsWith(`${v2Prefix}_`)) return false;
    return true;
  });
}

export function getLegacyContentRoute(path: string): {
  config: LegacyContentRouteConfig;
  slug: string;
} | null {
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const segments = normalizedPath.split('/').filter(Boolean);
  if (segments.length !== 2) return null;

  const [routeSegment, slug] = segments;
  const config = LEGACY_CONTENT_ROUTES[routeSegment];
  if (!config || !slug) return null;

  return { config, slug };
}

type SearchResponse = {
  results: SearchResult[];
};

async function resourceExists(apiUrl: string, apiEndpoint: string, slug: string): Promise<boolean> {
  try {
    await $fetch(`${apiUrl}/${apiEndpoint}${slug}/`);
    return true;
  } catch (error) {
    const statusCode = (error as { statusCode?: number })?.statusCode;
    if (statusCode === 404) return false;
    throw error;
  }
}

async function searchLegacyMatches(
  apiUrl: string,
  slug: string,
  config: LegacyContentRouteConfig,
  v2Prefix?: string,
): Promise<SearchResult[]> {
  const data = await $fetch<SearchResponse>(`${apiUrl}/v2/search/`, {
    params: {
      query: legacySlugToSearchQuery(slug),
      object_model: config.objectModel,
      schema: 'v2',
      limit: 50,
    },
  });

  return filterSearchResults(data.results ?? [], slug, config, v2Prefix);
}

export async function resolveLegacySlug(
  config: LegacyContentRouteConfig,
  slug: string,
  apiUrl: string,
): Promise<LegacySlugResolution> {
  if (await resourceExists(apiUrl, config.apiEndpoint, slug)) {
    return { status: 'exists' };
  }

  const { baseSlug, v2Prefix } = parseLegacySourceSlug(slug);

  if (v2Prefix) {
    const directKey = `${v2Prefix}_${baseSlug}`;
    if (await resourceExists(apiUrl, config.apiEndpoint, directKey)) {
      return { status: 'redirect', url: `/${config.basePath}/${directKey}` };
    }
  }

  const matches = await searchLegacyMatches(apiUrl, baseSlug, config, v2Prefix);

  if (matches.length === 1) {
    return { status: 'redirect', url: buildSearchResultUrl(matches[0]) };
  }

  if (matches.length > 1) {
    return { status: 'disambiguate', matches };
  }

  return { status: 'not_found' };
}
