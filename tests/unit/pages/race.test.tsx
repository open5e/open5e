import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import RacePage from '~/pages/races/[id].vue';

const { data: race } = useFindOne('v2/races', 'srd_elf');

const page = await mountSuspended(RacePage);

test('/races/[id] page can mount', async () => {
  expect(page);
});

test('/races/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(race)?.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Elf',
      key: 'srd_elf',
      url: 'http://localhost:8000/v2/races/srd_elf/',
      is_subrace: false,
      subrace_of: null,
      desc: 'Your elf character has a variety of natural abilities, the result of thousands of years of elven refinement.',
      document: {
        url: 'http://localhost:8000/v2/documents/srd/',
        name: 'Systems Reference Document',
      },
      traits: [
        {
          name: 'Ability Score Increase',
          desc: 'Your Dexterity score increases by 2.',
        },
        {
          name: 'Speed',
          desc: 'Your base walking speed is 30 feet.',
        },
        {
          name: 'Darkvision',
          desc: 'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.',
        },
        {
          name: 'Age',
          desc: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.',
        },
        {
          name: 'Alignment',
          desc: 'Elves love freedom, variety, and self-­expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others’ freedom as well as their own, and they are more often good than not.',
        },
        {
          name: 'Size',
          desc: 'Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.',
        },
        {
          name: 'Languages',
          desc: 'You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.',
        },
        {
          name: 'Keen Senses',
          desc: 'You have proficiency in the Perception skill.',
        },
        {
          name: 'Fey Ancestry',
          desc: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
        },
        {
          name: 'Trance',
          desc: 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.',
        },
      ],
    },
  });
});

mockNuxtImport('useFindMany', () => {
  return () => ({
    data: [
      {
        name: 'High Elf',
        key: 'srd_high-elf',
        desc: 'As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many fantasy gaming worlds, there are two kinds of high elves. One type is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type is more common and more friendly, and often encountered among humans and other races.',
        subrace_of: 'http://localhost:8000/v2/races/srd_elf/',
        url: 'http://localhost:8000/v2/races/srd_high-elf/',
        is_subrace: true,
        traits: [
          {
            name: 'Ability Score Increase',
            desc: 'Your Intelligence score increases by 1.',
          },
          {
            name: 'Elf Weapon Training',
            desc: 'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
          },
          {
            name: 'Cantrip',
            desc: 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.',
          },
          {
            name: 'Extra Language',
            desc: 'You can speak, read, and write one extra language of your choice.',
          },
        ],
        document: {
          url: 'http://localhost:8000/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
    ],
  });
});
