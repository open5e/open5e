import type { TableColumn, Spell } from '@/types';

export const spellTableColumnDefinitions: TableColumn<Spell>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/spells/${data.key}`,
  },
  {
    displayName: 'Level',
    value: (data) => data.level,
    sortValue: 'level',
  },
  {
    displayName: 'School',
    value: (data) => data.school.name,
    sortValue: 'school',
  },
  {
    displayName: 'Classes',
    value: (data) => {
      return data.classes.map((c) => c.name).join(', ');
    },
    isLeastPriority: true,
  },
];