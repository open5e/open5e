export interface GameSystemSortable {
  key: string;
  name: string;
}

const GAME_SYSTEM_PRIORITY = ['5e-2024', '5e-2014'] as const;

function gameSystemPriority(key: string): number {
  const index = GAME_SYSTEM_PRIORITY.indexOf(
    key as (typeof GAME_SYSTEM_PRIORITY)[number],
  );
  return index === -1 ? GAME_SYSTEM_PRIORITY.length : index;
}

export function compareGameSystems(
  a: GameSystemSortable,
  b: GameSystemSortable,
): number {
  const priorityDiff = gameSystemPriority(a.key) - gameSystemPriority(b.key);
  if (priorityDiff !== 0) return priorityDiff;
  return a.name.localeCompare(b.name);
}

export function sortGameSystems<T extends GameSystemSortable>(systems: T[]): T[] {
  return [...systems].sort(compareGameSystems);
}

export function sortGameSystemKeys(
  keys: string[],
  nameByKey: Record<string, string> = {},
): string[] {
  return [...keys].sort((a, b) =>
    compareGameSystems(
      { key: a, name: nameByKey[a] ?? a },
      { key: b, name: nameByKey[b] ?? b },
    ),
  );
}
