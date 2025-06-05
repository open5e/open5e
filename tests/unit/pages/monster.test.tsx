import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MonsterPage from '~/pages/monsters/[id].vue';

const { data: monster } = useFindOne('v2/creatures', 'srd_goblin');

const page = await mountSuspended(MonsterPage);

test('/monsters/[id] page can mount', async () => {
  expect(page);
});

test('/monsters/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(monster)?.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      url: 'http://localhost:8000/v2/creatures/srd_goblin/',
      key: 'srd_goblin',
      name: 'Goblin',
      document: {
        name: 'Systems Reference Document',
        key: 'srd',
        publisher: {
          name: 'Wizards of the Coast',
          key: 'wizards-of-the-coast',
          url: 'http://localhost:8000/v2/publishers/wizards-of-the-coast/',
        },
        gamesystem: {
          name: '5th Edition',
          key: 'o5e',
          url: 'http://localhost:8000/v2/gamesystems/o5e/',
        },
        permalink: 'https://dnd.wizards.com/resources/systems-reference-document',
      },
      type: {
        name: 'Humanoid',
        key: 'humanoid',
        url: 'http://localhost:8000/v2/creaturetypes/humanoid/',
      },
      size: {
        name: 'Small',
        key: 'small',
        url: 'http://localhost:8000/v2/sizes/small/',
      },
      challenge_rating_decimal: '0.250',
      challenge_rating_text: '1/4',
      speed: {
        walk: 30.0,
        unit: 'feet',
      },
      speed_all: {
        unit: 'feet',
        walk: 30.0,
        crawl: 15.0,
        hover: false,
        fly: 0.0,
        burrow: 0.0,
        climb: 15.0,
        swim: 15.0,
      },
      category: 'Monsters',
      subcategory: null,
      alignment: 'neutral evil',
      languages: {
        as_string: 'Common, Goblin',
        data: [
          {
            name: 'Common',
            key: 'common',
            url: 'http://localhost:8000/v2/languages/common/',
            desc: 'Typical speakers are Humans.',
          },
          {
            name: 'Goblin',
            key: 'goblin',
            url: 'http://localhost:8000/v2/languages/goblin/',
            desc: 'Typical speakers are goblinoids.',
          },
        ],
      },
      armor_class: 15,
      armor_detail: 'leather armor, shield',
      hit_points: 7,
      hit_dice: '2d6',
      experience_points: 50,
      ability_scores: {
        strength: 8,
        dexterity: 14,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 8,
      },
      modifiers: {
        strength: -1,
        dexterity: 2,
        constitution: 0,
        intelligence: 0,
        wisdom: -1,
        charisma: -1,
      },
      initiative_bonus: 2,
      saving_throws: {},
      saving_throws_all: {
        strength: -1,
        dexterity: 2,
        constitution: 0,
        intelligence: 0,
        wisdom: -1,
        charisma: -1,
      },
      skill_bonuses: {
        stealth: 6,
      },
      skill_bonuses_all: {
        acrobatics: 2,
        animal_handling: -1,
        arcana: 0,
        athletics: -1,
        deception: -1,
        history: 0,
        insight: -1,
        intimidation: -1,
        investigation: 0,
        medicine: -1,
        nature: 0,
        perception: -1,
        performance: -1,
        persuasion: -1,
        religion: 0,
        sleight_of_hand: 2,
        stealth: 6,
        survival: -1,
      },
      passive_perception: 9,
      damage_immunities: [],
      nonmagical_attack_immunity: false,
      damage_resistances: [],
      nonmagical_attack_resistance: false,
      damage_vulnerabilities: [],
      condition_immunities: [],
      normal_sight_range: 10560.0,
      darkvision_range: 60.0,
      blindsight_range: null,
      tremorsense_range: null,
      truesight_range: null,
      actions: [
        {
          key: 'srd_goblin_scimitar',
          attacks: [
            {
              key: 'srd_goblin_scimitar_scimitar-attack',
              distance_unit: 'feet',
              name: 'Scimitar attack',
              attack_type: 'WEAPON',
              to_hit_mod: 4,
              reach: 5.0,
              range: null,
              long_range: null,
              target_creature_only: false,
              damage_die_count: 1,
              damage_die_type: 'D6',
              damage_bonus: null,
              extra_damage_die_count: null,
              extra_damage_die_type: null,
              extra_damage_bonus: null,
              parent: 'srd_goblin_scimitar',
              damage_type: 'thunder',
              extra_damage_type: null,
            },
          ],
          name: 'Scimitar',
          desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.',
          uses_type: null,
          uses_param: null,
          action_type: 'ACTION',
          order: 0,
          form_condition: null,
          legendary_cost: 1,
          parent: 'srd_goblin',
        },
        {
          key: 'srd_goblin_shortbow',
          attacks: [
            {
              key: 'srd_goblin_shortbow_shortbow-attack',
              distance_unit: 'feet',
              name: 'Shortbow attack',
              attack_type: 'WEAPON',
              to_hit_mod: 4,
              reach: null,
              range: 80.0,
              long_range: 320.0,
              target_creature_only: false,
              damage_die_count: 1,
              damage_die_type: 'D6',
              damage_bonus: null,
              extra_damage_die_count: null,
              extra_damage_die_type: null,
              extra_damage_bonus: null,
              parent: 'srd_goblin_shortbow',
              damage_type: 'thunder',
              extra_damage_type: null,
            },
          ],
          name: 'Shortbow',
          desc: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.',
          uses_type: null,
          uses_param: null,
          action_type: 'ACTION',
          order: 1,
          form_condition: null,
          legendary_cost: 1,
          parent: 'srd_goblin',
        },
      ],
      traits: [
        {
          url: 'http://localhost:8000/v2/creaturetraits/srd_goblin_nimble-escape/',
          key: 'srd_goblin_nimble-escape',
          name: 'Nimble Escape',
          desc: 'The goblin can take the Disengage or Hide action as a bonus action on each of its turns.',
          type: null,
          parent: 'http://localhost:8000/v2/creatures/srd_goblin/',
        },
      ],
      creaturesets: [],
      environments: [
        {
          name: 'Arctic or Tundra',
          key: 'arctic',
          url: 'http://localhost:8000/v2/environments/arctic/',
        },
        {
          name: 'Caves',
          key: 'caves',
          url: 'http://localhost:8000/v2/environments/caves/',
        },
        {
          name: 'Desert',
          key: 'desert',
          url: 'http://localhost:8000/v2/environments/desert/',
        },
        {
          name: 'Forest or Jungle',
          key: 'forest',
          url: 'http://localhost:8000/v2/environments/forest/',
        },
        {
          name: 'Grassland or Plains',
          key: 'grassland',
          url: 'http://localhost:8000/v2/environments/grassland/',
        },
        {
          name: 'Hills',
          key: 'hills',
          url: 'http://localhost:8000/v2/environments/hills/',
        },
        {
          name: 'Mountain',
          key: 'mountain',
          url: 'http://localhost:8000/v2/environments/mountain/',
        },
        {
          name: 'Ruins',
          key: 'ruins',
          url: 'http://localhost:8000/v2/environments/ruins/',
        },
        {
          name: 'Sewer',
          key: 'sewer',
          url: 'http://localhost:8000/v2/environments/sewer/',
        },
        {
          name: 'Feywild',
          key: 'srd_feywild',
          url: 'http://localhost:8000/v2/environments/srd_feywild/',
        },
        {
          name: 'Swamp or Marsh',
          key: 'swamp',
          url: 'http://localhost:8000/v2/environments/swamp/',
        },
        {
          name: 'Underworld',
          key: 'underworld',
          url: 'http://localhost:8000/v2/environments/underworld/',
        },
        {
          name: 'Urban',
          key: 'urban',
          url: 'http://localhost:8000/v2/environments/urban/',
        },
      ],
    },
  });
});
