import type { components } from './open5e-api';
export * from './filters';

// export basic data types returned by Open5e API
export type Background = components['schemas']['Background'];
export type BackgroundBenefit = components['schemas']['BackgroundBenefit'];
export type Class = components['schemas']['CharacterClass'];
export type ClassSummary = components['schemas']['CharacterClassSummary'];
export type ClassFeature = components['schemas']['ClassFeature'];
export type Condition = components['schemas']['Condition'];
export type Creature = components['schemas']['Creature'];
export type CreatureAction = components['schemas']['CreatureAction'];
export type CreatureTypeSummary = components['schemas']['CreatureTypeSummary'];
export type Document = components['schemas']['Document'];
export type DocumentSummary = components['schemas']['DocumentSummary'];
export type Feat = components['schemas']['Feat'];
export type License = components['schemas']['License'];
export type Rule = components['schemas']['Rule'];
export type RuleSet = components['schemas']['RuleSet'];
export type SearchResult = components['schemas']['SearchResult'] & { object?: SearchObjectPayload };
export type Size = components['schemas']['Size'];
export type Species = components['schemas']['Species'];
export type Spell = components['schemas']['Spell'];
export type MagicItem = components['schemas']['Item'];
export type Monster = components['schemas']['Creature'];
export type Item = components['schemas']['Item'];
export type ItemCategory = components ['schemas']['ItemCategory'];
export type ItemCategorySummary = components['schemas']['ItemCategorySummary'];
export type Weapon = components['schemas']['Weapon'];
export type WeaponSummary = components['schemas']['WeaponSummary'];


// a union type of all possible data types returned by Open5e API
export type Open5eData = components['schemas'][keyof components['schemas']] & { 
  name: string;
  key: string;
};


// the `object` field of the SearchResult type returns irregularly typed data
export type SearchObjectPayload = {
  cr?: string;
  type?: string;
  size?: string;
  subspecies_of?: {
    name: string;
    key: string;
  };
  subclass_of?: {
    name: string;
    key: string;
  }
  rarity?: string;
  is_magic_item?: boolean;
  school?: string;
  level?: number;
}

// type interface for the `cols` prop
export interface TableColumn<T extends Open5eData> {
  displayName: string;
  value: (data: T) => string | number | boolean;
  sortValue?: string;
  link?: (data: T) => string;
  isLeastPriority?: boolean;
  customTemplate?: (data: T) => { render: () => VNode };
};