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
      key: 'srd_goblin',
      name: 'Goblin',
      url: 'http://localhost:8000/v2/creatures/srd_goblin/',
      document: {
        url: 'http://localhost:8000/v2/documents/srd/',
        name: 'Systems Reference Document',
        permalink:
          'https://dnd.wizards.com/resources/systems-reference-document',
        stats_expected: null,
        distance_unit: 'feet',
        publisher: 'http://localhost:8000/v2/publishers/wizards-of-the-coast/',
        gamesystem: 'http://localhost:8000/v2/gamesystems/o5e/',
        licenses: [
          'http://localhost:8000/v2/licenses/cc-by-40/',
          'http://localhost:8000/v2/licenses/ogl-10a/',
        ],
      },
      size: {
        url: 'http://localhost:8000/v2/sizes/small/',
        name: 'Small',
        rank: 2,
        space_diameter: '5.000',
        document: 'http://localhost:8000/v2/documents/srd/',
      },
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
      type: {
        url: 'http://localhost:8000/v2/creaturetypes/humanoid/',
        name: 'Humanoid',
        desc: 'Humanoids are the main peoples of a fantasy gaming world, both civilized and savage, including humans and a tremendous variety of other species. They have language and culture, few if any innate magical abilities (though most humanoids can learn spellcasting), and a bipedal form. The most common humanoid races are the ones most suitable as player characters: humans, dwarves, elves, and halflings. Almost as numerous but far more savage and brutal, and almost uniformly evil, are the races of goblinoids (goblins, hobgoblins, and bugbears), orcs, gnolls, lizardfolk, and kobolds.',
        document: 'http://localhost:8000/v2/documents/srd/',
      },
      alignment: 'neutral evil',
      languages: [
        {
          url: 'http://localhost:8000/v2/languages/common/',
          name: 'Common',
          desc: 'Typical speakers are Humans.',
          is_exotic: false,
          is_secret: false,
          document: 'http://localhost:8000/v2/documents/srd/',
          script_language: 'http://localhost:8000/v2/languages/common/',
        },
        {
          url: 'http://localhost:8000/v2/languages/goblin/',
          name: 'Goblin',
          desc: 'Typical speakers are goblinoids.',
          is_exotic: false,
          is_secret: false,
          document: 'http://localhost:8000/v2/documents/srd/',
          script_language: 'http://localhost:8000/v2/languages/dwarvish/',
        },
      ],
      armor_class: 15,
      hit_points: 7,
      hit_dice: '2d6',
      challenge_rating_decimal: '0.250',
      challenge_rating_text: '1/4',
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
          name: 'Scimitar',
          desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.\n',
          attacks: [
            {
              name: 'Scimitar attack',
              attack_type: 'WEAPON',
              to_hit_mod: 4,
              reach_ft: 5,
              target_creature_only: false,
              damage: {
                amount: 5,
                die_count: 1,
                die_type: 'D6',
                bonus: 2,
                type: 'slashing',
              },
              extra_damage: {
                amount: 1,
                type: 'slashing',
              },
            },
          ],
        },
        {
          name: 'Shortbow',
          desc: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.\n',
          attacks: [
            {
              name: 'Shortbow attack',
              attack_type: 'WEAPON',
              to_hit_mod: 4,
              range_ft: 80,
              long_range_ft: 320,
              target_creature_only: false,
              damage: {
                amount: 5,
                die_count: 1,
                die_type: 'D6',
                bonus: 2,
                type: 'piercing',
              },
              extra_damage: {
                amount: 1,
                type: 'piercing',
              },
            },
          ],
        },
      ],
      creaturesets: [],
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
    },
  });
});
