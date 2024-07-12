import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import BackgroundPage from '~/pages/backgrounds/[id].vue';

const { id } = useRoute().params;
const { data: background } = useFindOne('v1/backgrounds', id);

const page = await mountSuspended(BackgroundPage);

test('/background/[id] page can mount', async () => {
  expect(page);
});

test('/background/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(background.name);
});

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'acolyte',
    },
  });
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Acolyte',
      desc: 'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric-performing sacred rites is not the same thing as channeling divine power.\n\nChoose a god, a pantheon of gods, or some other quasi-divine being from among those listed in "Fantasy-Historical Pantheons" or those specified by your GM, and work with your GM to detail the nature of your religious service. Were you a lesser functionary in a temple, raised from childhood to assist the priests in the sacred rites? Or were you a high priest who suddenly experienced a call to serve your god in a different way? Perhaps you were the leader of a small cult outside of any established temple structure, or even an occult group that served a fiendish master that you now deny.',
      slug: 'acolyte',
      skill_proficiencies: 'Insight, Religion',
      tool_proficiencies: null,
      languages: 'Two of your choice',
      equipment:
        'A holy symbol (a gift to you when you entered the priesthood), a prayer book or prayer wheel, 5 sticks of incense, vestments, a set of common clothes, and a pouch containing 15 gp',
      feature: 'Shelter of the Faithful',
      feature_desc:
        'As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.\n\nYou might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple.',
      suggested_characteristics:
        "Acolytes are shaped by their experience in temples or other religious communities. Their study of the history and tenets of their faith and their relationships to temples, shrines, or hierarchies affect their mannerisms and ideals. Their flaws might be some hidden hypocrisy or heretical idea, or an ideal or bond taken to an extreme.\n\n**Suggested Acolyte Characteristics (table)**\n\n| d8 | Personality Trait                                                                                                  |\n|----|--------------------------------------------------------------------------------------------------------------------|\n| 1  | I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.                  |\n| 2  | I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.      |\n| 3  | I see omens in every event and action. The gods try to speak to us, we just need to listen                         |\n| 4  | Nothing can shake my optimistic attitude.                                                                          |\n| 5  | I quote (or misquote) sacred texts and proverbs in almost every situation.                                         |\n| 6  | I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.                  |\n| 7  | I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.                |\n| 8  | I've spent so long in the temple that I have little practical experience dealing with people in the outside world. |\n\n| d6 | Ideal                                                                                                                  |\n|----|------------------------------------------------------------------------------------------------------------------------|\n| 1  | Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)                      |\n| 2  | Charity. I always try to help those in need, no matter what the personal cost. (Good)                                  |\n| 3  | Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)                   |\n| 4  | Power. I hope to one day rise to the top of my faith's religious hierarchy. (Lawful)                                   |\n| 5  | Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)    |\n| 6  | Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings. (Any) |\n\n| d6 | Bond                                                                                     |\n|----|------------------------------------------------------------------------------------------|\n| 1  | I would die to recover an ancient relic of my faith that was lost long ago.              |\n| 2  | I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.     |\n| 3  | I owe my life to the priest who took me in when my parents died.                         |\n| 4  | Everything I do is for the common people.                                                |\n| 5  | I will do anything to protect the temple where I served.                                 |\n| 6  | I seek to preserve a sacred text that my enemies consider heretical and seek to destroy. |\n\n| d6 | Flaw                                                                                          |\n|----|-----------------------------------------------------------------------------------------------|\n| 1  | I judge others harshly, and myself even more severely.                                        |\n| 2  | I put too much trust in those who wield power within my temple's hierarchy.                   |\n| 3  | My piety sometimes leads me to blindly trust those that profess faith in my god.              |\n| 4  | I am inflexible in my thinking.                                                               |\n| 5  | I am suspicious of strangers and expect the worst of them.                                    |\n| 6  | Once I pick a goal, I become obsessed with it to the detriment of everything else in my life. |",
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__license_url: 'http://open5e.com/legal',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
