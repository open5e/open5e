import { test, expect } from 'vitest';
import {
  mockComponent,
  mockNuxtImport,
  mountSuspended,
} from '@nuxt/test-utils/runtime';
import MonsterPage from '~/pages/monsters/[id].vue';

const page = await mountSuspended(MonsterPage);

const { id } = useRoute().params;
const { data: monster } = useMonster(Array.isArray(id) ? id[0] : id);

test('/monsters/[id] page can mount', async () => {
  expect(page);
});

test('/monsters/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(monster.name);
});

test('/monsters/[id] page renders correct number of actions', async () => {
  const actions = page.find('#actions-list');
  if (!monster.actions || monster.actions.length === 0) {
    expect(actions.exists()).toBe(false);
  } else {
    expect(actions.findAll('li').length).toEqual(monster.actions.length);
  }
});

// mock the query param used to generate dynamic route
mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'aboleth',
    },
    query: {
      mode: 'normal',
    },
  });
});

// mock API result from /monster/[id] endpoint
mockNuxtImport('useMonster', () => {
  return () => ({
    data: {
      slug: 'aboleth',
      desc: '',
      name: 'Aboleth',
      size: 'Large',
      type: 'Aberration',
      group: null,
      alignment: 'lawful evil',
      armor_class: 17,
      armor_desc: 'natural armor',
      hit_points: 135,
      hit_dice: '18d10+36',
      speed: {
        walk: 10,
        swim: 40,
      },
      strength: 21,
      dexterity: 9,
      constitution: 15,
      intelligence: 18,
      wisdom: 15,
      charisma: 18,
      strength_save: null,
      dexterity_save: null,
      constitution_save: 6,
      intelligence_save: 8,
      wisdom_save: 6,
      charisma_save: null,
      perception: 10,
      skills: {
        history: 12,
        perception: 10,
      },
      senses: 'darkvision 120 ft., passive Perception 20',
      languages: 'Deep Speech, telepathy 120 ft.',
      challenge_rating: '10',
      cr: 10.0,
      actions: [
        {
          name: 'Multiattack',
          desc: 'The aboleth makes three tentacle attacks.',
        },
        {
          name: 'Tentacle',
          desc: "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.",
          attack_bonus: 9,
          damage_dice: '2d6',
          damage_bonus: 5,
        },
        {
          name: 'Tail',
          desc: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) bludgeoning damage.',
          attack_bonus: 9,
          damage_dice: '3d6',
          damage_bonus: 5,
        },
        {
          name: 'Enslave (3/day)',
          desc: "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance.\nWhenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth.",
        },
      ],
      legendary_desc:
        "The aboleth can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The aboleth regains spent legendary actions at the start of its turn.",
      legendary_actions: [
        {
          name: 'Detect',
          desc: 'The aboleth makes a Wisdom (Perception) check.',
        },
        {
          name: 'Tail Swipe',
          desc: 'The aboleth makes one tail attack.',
        },
        {
          name: 'Psychic Drain (Costs 2 Actions)',
          desc: 'One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.',
        },
      ],
      special_abilities: [
        {
          name: 'Amphibious',
          desc: 'The aboleth can breathe air and water.',
        },
        {
          name: 'Mucous Cloud',
          desc: 'While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater.',
        },
        {
          name: 'Probing Telepathy',
          desc: "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature.",
        },
      ],
      spell_list: [],
      page_no: 261,
      environments: [
        'Underdark',
        'Sewer',
        'Caverns',
        'Plane Of Water',
        'Water',
      ],
      img_main: 'http://localhost:8000/static/img/monsters/aboleth.png',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__license_url: 'http://open5e.com/legal',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
