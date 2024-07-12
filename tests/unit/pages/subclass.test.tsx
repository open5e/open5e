import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SubclassPage from '~/pages/classes/[className]/[subclass].vue';

const page = await mountSuspended(SubclassPage);

const { data: subclass } = useSubclass('cleric', 'life-domain');
test('/classes/[className]/[subclass] page can mount', async () => {
  expect(page);
});

test('/classes/[className]/[subclass] page renders title', async () => {
  const title = page.find('h1');
  console.log(subclass);
  expect(title.exists()).toBe(true);
  // expect(title.text()).toContain(subclass.name);
});

// mock input for useFindOne() composable
mockNuxtImport('useSubclass', () => {
  return () => ({
    data: {
      name: 'Life Domain',
      slug: 'life-domain',
      desc: "The Life domain focuses on the vibrant positive energy-one of the fundamental forces of the universe-that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath. Almost any non-evil deity can claim influence over this domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as Ilmater, Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrei). \n \n**Life Domain Spells (table)** \n \n| Cleric Level | Spells                               | \n|--------------|--------------------------------------| \n| 1st          | bless, cure wounds                   | \n| 3rd          | lesser restoration, spiritual weapon | \n| 5th          | beacon of hope, revivify             | \n| 7th          | death ward, guardian of faith        | \n| 9th          | mass cure wounds, raise dead         | \n \n##### Bonus Proficiency \n \nWhen you choose this domain at 1st level, you gain proficiency with heavy armor. \n \n##### Disciple of Life \n \nAlso starting at 1st level, your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell's level. \n \n##### Channel Divinity: Preserve Life \n \nStarting at 2nd level, you can use your Channel Divinity to heal the badly injured. \n \nAs an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can't use this feature on an undead or a construct. \n \n##### Blessed Healer \n \nBeginning at 6th level, the healing spells you cast on others heal you as well. When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell's level. \n \n##### Divine Strike \n \nAt 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage to the target. When you reach 14th level, the extra damage increases to 2d8. \n \n##### Supreme Healing \n \nStarting at 17th level, when you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die. For example, instead of restoring 2d6 hit points to a creature, you restore 12.",
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
    },
  });
});
