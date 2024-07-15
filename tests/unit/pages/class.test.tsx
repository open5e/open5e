import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ClassPage from '~/pages/classes/[className]/index.vue';

const { className } = useRoute().params;
const { data: classData } = useFindOne('v1/classes', className);

const page = await mountSuspended(ClassPage);

test('/classes/[className] page can mount', async () => {
  expect(page);
});

test('/classes/[className] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(classData.name);
});

// mock input for useRoute() composable
mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'fighter',
    },
  });
});

// mock input for useFindOne() composable
mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Fighter',
      slug: 'fighter',
      desc: '### Fighting Style \n \nYou adopt a particular style of fighting as your specialty...',
      hit_dice: '1d10',
      hp_at_1st_level: '10 + your Constitution modifier',
      hp_at_higher_levels:
        '1d10 (or 6) + your Constitution modifier per fighter level after 1st',
      prof_armor: 'All armor, shields',
      prof_weapons: 'Simple weapons, martial weapons',
      prof_tools: 'None',
      prof_saving_throws: 'Strength, Constitution',
      prof_skills:
        'Choose two skills from Acrobatics, Animal, Handling, Athletics, History, Insight, Intimidation, Perception, and Survival',
      equipment:
        "You start with the following equipment, in addition to the equipment granted by your background: \n \n* (*a*) chain mail or (*b*) leather armor, longbow, and 20 arrows \n* (*a*) a martial weapon and a shield or (*b*) two martial weapons \n* (*a*) a light crossbow and 20 bolts or (*b*) two handaxes \n* (*a*) a dungeoneer's pack or (*b*) an explorer's pack",
      table:
        '| Level | Proficiency Bonus | Features                                          | \n|-------|-------------------|---------------------------------------------------| \n| 1st   | +2                | Fighting Style, Second Wind                       | \n| 2nd   | +2                | Action Surge (one use)                            | \n| 3rd   | +2                | Martial Archetype                                 | \n| 4th   | +2                | Ability Score Improvement                         | \n| 5th   | +3                | Extra Attack                                      | \n| 6th   | +3                | Ability Score Improvement                         | \n| 7th   | +3                | Martial Archetype Feature                         | \n| 8th   | +3                | Ability Score Improvement                         | \n| 9th   | +4                | Indomitable (one use)                             | \n| 10th  | +4                | Martial Archetype Feature                         | \n| 11th  | +4                | Extra Attack (2)                                  | \n| 12th  | +4                | Ability Score Improvement                         | \n| 13th  | +5                | Indomitable (two uses)                            | \n| 14th  | +5                | Ability Score Improvement                         | \n| 15th  | +5                | Martial Archetype Feature                         | \n| 16th  | +5                | Ability Score Improvement                         | \n| 17th  | +6                | Action Surge (two uses), Indomitable (three uses) | \n| 18th  | +6                | Martial Archetype Feature                         | \n| 19th  | +6                | Ability Score Improvement                         | \n| 20th  | +6                | Extra Attack (3)                                  | ',
      spellcasting_ability: '',
      subtypes_name: 'Martial Archetypes',
      archetypes: [
        {
          name: 'Chaplain',
          slug: 'chaplain',
          desc: 'Militaries and mercenary companies often contain members of various clergies among their ranks...',
          document__slug: 'toh',
          document__title: 'Tome of Heroes',
          document__license_url: 'http://open5e.com/legal',
          document__url:
            'https://koboldpress.com/kpstore/product/tome-of-heroes-for-5th-edition/',
        },
        {
          name: 'Legionary',
          slug: 'legionary',
          desc: 'A legionary follows the techniques of close-quarters combat developed by soldiers fighting shoulder to shoulder ...',
          document__slug: 'toh',
          document__title: 'Tome of Heroes',
          document__license_url: 'http://open5e.com/legal',
          document__url:
            'https://koboldpress.com/kpstore/product/tome-of-heroes-for-5th-edition/',
        },
        {
          name: 'Pugilist',
          slug: 'pugilist',
          desc: 'Pugilists live by their fists, bare-knuckle warriors who do not hesitate to throw hands ...',
          document__slug: 'toh',
          document__title: 'Tome of Heroes',
          document__license_url: 'http://open5e.com/legal',
          document__url:
            'https://koboldpress.com/kpstore/product/tome-of-heroes-for-5th-edition/',
        },
        {
          name: 'Radiant Pikeman',
          slug: 'radiant-pikeman',
          desc: 'You were a member of an order of knights dedicated to a deity of sun and light...',
          document__slug: 'toh',
          document__title: 'Tome of Heroes',
          document__license_url: 'http://open5e.com/legal',
          document__url:
            'https://koboldpress.com/kpstore/product/tome-of-heroes-for-5th-edition/',
        },
        {
          name: 'Timeblade',
          slug: 'timeblade',
          desc: 'There are warriors who move so quickly that they seem to stop time...',
          document__slug: 'toh',
          document__title: 'Tome of Heroes',
          document__license_url: 'http://open5e.com/legal',
          document__url:
            'https://koboldpress.com/kpstore/product/tome-of-heroes-for-5th-edition/',
        },
        {
          name: 'Tunnel Watcher',
          slug: 'tunnel-watcher',
          desc: 'For untold ages, the dwarves have paid in blood to keep their subterranean homes safe...',
          document__slug: 'toh',
          document__title: 'Tome of Heroes',
          document__license_url: 'http://open5e.com/legal',
          document__url:
            'https://koboldpress.com/kpstore/product/tome-of-heroes-for-5th-edition/',
        },
        {
          name: 'Arcane Warrior',
          slug: 'arcane-warrior',
          desc: 'Most fighters train exhaustively with their preferred weapons to hone their power and reflexes. To some, this easily flows into the careful practice of magic as well. Unlike wizards, arcane warriors focus on a smaller number of spells that they commit to memory, particularly from the schools of magic that focus on protection and direct damage which are particularly useful in a combat setting. An arcane warrior can be a jack of all trades, solving problems with force or magic as the situation warrants. They can also aim to master a few strategies that use their martial and mental aptitude in equal measure.\n\n##### Spellcasting\n\nBeginning at 3rd level, you can cast spells from the wizard spell list.\n\n**_Cantrips._** Choose two cantrips from the wizard spell list to learn. At 10th level, you learn one additional cantrip from the same list.\n\n**_Spell Slots._** You use spell slots to cast 1st level and higher spells, expending a spell slot equal to or higher than the level of the spell you wish to cast. When you complete a long rest, you regain any spell slots you have used. The number of spell slots of different levels available are shown on the Arcane Warrior Spells table.\nFor example, if you are a 7th-level Arcane Warrior who knows the 1st-level spell _magic missile_, you could use any of your unused 1st or 2nd-level spell slots to cast the spell. However, if you wanted to cast 2nd-level spell _shatter_, you would need to expend a 2nd-level spell slot in order to cast it.\n\n**_1st-Level and Higher Spells Known._** Upon choosing this archetype at 3rd level, you learn three 1st-level spells from the wizard spell list. At least two of these spells must be from the abjuration or evocation schools.\n\nYou automatically learn additional spells from the wizard spell list as you gain levels, as shown on the Arcane Warrior Spells table. When you learn a new spell, it must be of a level that you can cast with your existing spell slots. Initially, you must choose your new spells from the evocation and abjuration schools, but starting at 8th level, you can choose from any type of spell on the wizard spell list.\n\nFor instance, upon reaching 7th level in this class, an Arcane Warrior could learn a new spell of either 1st or 2nd-level, but it must be from either the abjuration or evocation schools. At 8th level, the Arcane Warrior learns another spell of 1st or 2nd-level, which can be chosen from any spell school.\n\nEvery time you gain a new level of Arcane Warrior, you have the choice to replace one of your known wizard spells with a different spell from the same list of a level for which you have spell slots. However, if your Arcane Warrior level is 7th or lower, you can only know one spell of 1st level or higher from a school other than abjuration or evocation. At 8th level or higher in this class, you can learn additional spells from other schools, but at least 4 of your known spells of 1st level or higher must be from these two schools.\n\n**_Spellcasting Ability._** You use rote memorization and diligent study to master your wizard spells, so your spellcasting ability for these is Intelligence. You use your Intelligence modifier when making a spell attack roll with a wizard spell, as well as to calculate the DC of a saving throw against one of your wizard spells. If the text of a spell refers to your spellcasting ability, use your Intelligence.\n\n**Spell save DC** = 8 + your proficiency bonus + your Intelligence modifier\n\n**Spell attack modifier** = your proficiency bonus + your Intelligence modifier\n\n**Arcane Warrior Spells (table)**\n\n| Fighter Level | Known Cantrips | Known Spells | 1st | 2nd | 3rd | 4th |\n|---------------|----------------|--------------|-----|-----|-----|-----|\n| 3rd           | 2              | 3            | 2   | -   | -   | -   |\n| 4th           | 2              | 4            | 3   | -   | -   | -   |\n| 5th           | 2              | 4            | 3   | -   | -   | -   |\n| 6th           | 2              | 4            | 3   | -   | -   | -   |\n| 7th           | 2              | 5            | 4   | 2   | -   | -   |\n| 8th           | 2              | 6            | 4   | 2   | -   | -   |\n| 9th           | 2              | 6            | 4   | 2   | -   | -   |\n| 10th          | 3              | 7            | 4   | 3   | -   | -   |\n| 11th          | 3              | 8            | 4   | 3   | -   | -   |\n| 12th          | 3              | 8            | 4   | 3   | -   | -   |\n| 13th          | 3              | 9            | 4   | 3   | 2   | -   |\n| 14th          | 3              | 10           | 4   | 3   | 2   | -   |\n| 15th          | 3              | 10           | 4   | 3   | 2   | -   |\n| 16th          | 3              | 11           | 4   | 3   | 3   | -   |\n| 17th          | 3              | 11           | 4   | 3   | 3   | -   |\n| 18th          | 3              | 11           | 4   | 3   | 3   | -   |\n| 19th          | 3              | 12           | 4   | 3   | 3   | 1   |\n| 20th          | 3              | 13           | 4   | 3   | 3   | 1   |\n\n##### Bonded Weapon\n\nStarting at 3rd level, you can create a magical bond between you and a particular weapon of your choice. This weapon becomes almost like a part of you, and unless you are incapacitated, no one can disarm it from you. If you are not holding the weapon, you can use a bonus action to summon it instantly into your hand via teleportation unless it is on another plane of existence.\n\nTo create the magical bond with your weapon, you must perform a ritual that takes 1 hour. During the ritual, the weapon you are attempting to bond with must always be at your side, but you can otherwise complete the ritual over the course of a short rest. You can perform the ritual multiple times, but you can only remain bonded to two particular weapons at any given time. Bonding with a third weapon will break the bond with one of your other weapons that you choose. Furthermore, you can only use your bonus action to summon one bonded weapon per turn.\n\n##### Battle Magic\n\nAt 7th level, you can use your bonus action to make a weapon attack on a turn that you use an action to cast a cantrip.\n\n##### Arcane Strike\n\nStarting at 10th level, foes you strike in combat become more susceptible to your magical offensives as well. Creatures suffer disadvantage on a saving throw against your spells if you have hit them with a weapon attack. This effect only lasts until the end of your next turn after hitting the creature, and only applies to the first saving throw they make against one of your spells during this time.\n\n##### Eldritch Charge\n\nStarting at 15th level, your ferocious charges let you briefly plunge through the ethereal plane. When you use an Action Surge, in addition to gaining an additional action, you can teleport to any unoccupied space that you can see within 30 feet. This teleportation and your extra action can be used in either order.\n\n##### Improved Battle Magic\n\nAt 18th level, your ability to use spells in combat further improves. You can use your bonus action to make an attack after using your action to cast a spell of any level, not just cantrips.',
          document__slug: 'o5e',
          document__title: 'Open5e Original Content',
          document__license_url: 'http://open5e.com/legal',
          document__url: 'open5e.com',
        },
        {
          name: 'Champion',
          slug: 'champion',
          desc: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection...',
          document__slug: 'wotc-srd',
          document__title: '5e Core Rules',
          document__license_url: 'http://open5e.com/legal',
          document__url:
            'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
        },
      ],
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__license_url: 'http://open5e.com/legal',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
