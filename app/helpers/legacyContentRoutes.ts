// Legacy flat-slug resolution for v1 URLs; used by legacy-slug middleware and /{type}/{slug}/choose.
import type { SearchResult } from '@/types';
import { API_ENDPOINTS } from '@/composables/api';
import { buildSearchResultUrl } from './buildSearchResultUrl';

export type LegacyContentRouteConfig = {
  apiEndpoint: string;
  objectModel: string;
  resultFilter?: (result: SearchResult) => boolean;
};

function legacyRoute(
  apiEndpoint: string,
  objectModel: string,
  resultFilter?: (result: SearchResult) => boolean,
): LegacyContentRouteConfig {
  return { apiEndpoint, objectModel, resultFilter };
}

// maps v1 suffixes to v2 prefixes so we can redirect explicit legacy links
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

// maps site route segments to the appropriate v2 content type and legacy route config
export const LEGACY_CONTENT_ROUTES: Record<string, LegacyContentRouteConfig> = {
  monsters: legacyRoute(API_ENDPOINTS.monsters, 'Creature'),
  spells: legacyRoute(API_ENDPOINTS.spells, 'Spell'),
  // handles legacy magic items and equipment
  'magic-items': legacyRoute(
    API_ENDPOINTS.magicitems,
    'Item',
    (result) => result.object?.is_magic_item === true,
  ),
  equipment: legacyRoute(
    API_ENDPOINTS.equipment,
    'Item',
    (result) => result.object?.is_magic_item !== true,
  ),
  feats: legacyRoute(API_ENDPOINTS.feats, 'Feat'),
  backgrounds: legacyRoute(API_ENDPOINTS.backgrounds, 'Background'),
  conditions: legacyRoute(API_ENDPOINTS.conditions, 'Condition'),
  species: legacyRoute(API_ENDPOINTS.species, 'Species'),
};

export type LegacySlugResolution =
  | { status: 'exists' }
  | { status: 'redirect'; url: string }
  | { status: 'disambiguate'; matches: SearchResult[] }
  | { status: 'not_found' };

// Normalize v2 object keys and v1 URL slugs. If for search, convert hyphens to spaces.
export function legacySlug(value: string, forSearch = false): string {
  const idx = value.indexOf('_');
  const slug = idx === -1 ? value : value.slice(idx + 1);
  return forSearch ? slug.replace(/-/g, ' ') : slug;
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

// filter search results to only include those that match the cleaned legacy term + v2 prefix
export function filterSearchResults(
  results: SearchResult[],
  slug: string,
  config: LegacyContentRouteConfig,
  v2Prefix?: string,
): SearchResult[] {
  return results.filter((result) => {
    if (result.object_model !== config.objectModel) return false;
    if (config.resultFilter && !config.resultFilter(result)) return false;
    if (legacySlug(result.object_pk) !== slug) return false;
    if (v2Prefix && !result.object_pk.startsWith(`${v2Prefix}_`)) return false;
    return true;
  });
}

// determine whether a url is a legacy content route and map it to the appropriate v2 content type
export function getLegacyContentRoute(path: string): {
  routeSegment: string;
  config: LegacyContentRouteConfig;
  slug: string;
} | null {
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const segments = normalizedPath.split('/').filter(Boolean);
  if (segments.length !== 2) return null;

  const [routeSegment, slug] = segments;
  const config = LEGACY_CONTENT_ROUTES[routeSegment];
  if (!config || !slug) return null;

  return { routeSegment, config, slug };
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
      query: legacySlug(slug, true),
      object_model: config.objectModel,
      schema: 'v2',
      limit: 50,
    },
  });

  return filterSearchResults(data.results ?? [], slug, config, v2Prefix);
}

// Direct key lookup, then v1 suffix rewrite, then search-and-filter fallback.
export async function resolveLegacySlug(
  routeSegment: string,
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
      return { status: 'redirect', url: `/${routeSegment}/${directKey}` };
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
