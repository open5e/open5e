import type { TableColumn, Spell, ResultTableSelectFieldFilter } from '@/types';
import { spellSchools, spellcastingClasses } from '@/constants';

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

export const spellFilterSelectFieldsDefinition: ResultTableSelectFieldFilter[] = [
  {
    name: 'Level',
    filterField: 'level',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
      name: level.toString(),
      value: level.toString(),
    })),
  },
  {
    name: 'School',
    filterField: 'school__key',
    options: spellSchools.map((school) => ({
      name: school,
      value: school.toLowerCase(),
    })),
  },
  {
    name: 'Class',
    filterField: 'classes__key__in',
    options: spellcastingClasses.map((className) => ({
      name: className,
      value: 'srd_' + className.toLowerCase(),
    })),
    isLeastPriority: true,
  },
];