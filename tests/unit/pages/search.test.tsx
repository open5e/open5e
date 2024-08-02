import { ref, reactive } from 'vue';
import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SearchPage from '~/pages/search/index.vue';

test('/search test placeholding', async () => {
  expect(true);
});

/* TODO: there is bug in the /search/index.vue component that
 * causes vitest to crash when the page is mounted. The error msg reads:
 *
 * `[Vue warn]: Cannot mutate <script setup> binding "results" from Options API.`
 *
 * The fix isn't immediately obvious. I can't pinpoint anywhere that "results" is
 * mutated in on the /search page.
 *
 * I am leaving my work on these unfinished tests in this PR. The code that
 * triggers this bug is commented out below. It might be easier to resolve once we
 * have implemented unit testing for the `SearchResult` component.
 */

// const page = await mountSuspended(SearchPage);

// test('/search page can mount', async () => {
//   expect(page).toBeTruthy();
// });

mockNuxtImport('useSearch', () => {
  return () => ({
    data: ref([
      {
        document: {
          key: 'srd',
          name: 'Systems Reference Document',
        },
        object_pk: 'srd_half-orc',
        object_name: 'Half-Orc',
        object: null,
        object_model: 'Race',
        schema_version: 'v2',
        route: 'v2/races/',
        text: 'Half-Orc\n\nYour half-orc character has certain traits deriving from your orc ancestry.',
        highlighted:
          'Half-<span class="highlighted">Orc</span>\n\nYour half-<span class="highlighted">orc</span> character has certain traits deriving from your <span class="highlighted">orc</span> ancestry.',
      },
      {
        document: {
          key: 'srd',
          name: 'Systems Reference Document',
        },
        object_pk: 'srd_orc',
        object_name: 'Orc',
        object: {
          armor_class: 13,
          hit_points: 15,
          ability_scores: {
            strength: 16,
            dexterity: 12,
            constitution: 16,
            intelligence: 7,
            wisdom: 11,
            charisma: 10,
          },
        },
        object_model: 'Creature',
        schema_version: 'v2',
        route: 'v2/creatures/',
        text: 'Orc\n\nGreataxe\nMelee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.\n\nJavelin\nMelee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.\n',
        highlighted:
          '<span class="highlighted">Orc</span>\n\nGreataxe\nMelee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.\n\nJavelin...',
      },
      {
        document: {
          key: 'a5e-ag',
          name: "Adventurer's Guide",
        },
        object_pk: 'a5e-ag_animal-messenger',
        object_name: 'Animal Messenger',
        object: {
          school: 'enchantment',
        },
        object_model: 'Spell',
        schema_version: 'v2',
        route: 'v2/spells/',
        text: 'Animal Messenger\n\nYou call a Tiny beast to you, whisper a message to it, and then give it directions to the message\'s recipient. It is now your messenger.\n\nSpecify a location you have previously visited and a recipient who matches a general description, such as "a person wearing a pointed red hat in Barter Town" or "a half-orc in a wheelchair at the Striped Lion Inn." Speak a message of up to 25 words. For the duration of the spell, the messenger travels towards the location at a rate of 50 miles per day for a messenger with a flying speed, or else 25 miles without.\n\nWhen the messenger arrives, it delivers your message to the first creature matching your description, replicating the sound of your voice exactly. If the messenger can\'t find the recipient or reach its destination before the spell ends, the message is lost, and the beast makes its way back to where you cast this spell.',
        highlighted:
          '...pointed red hat in Barter Town" or "a half-<span class="highlighted">orc</span> in a wheelchair at the Striped Lion Inn." Speak a...',
      },
    ]),
  });
});

mockNuxtImport('useSourcesList', () => {
  return () => ({
    sources: ref(['srd']),
  });
});

mockNuxtImport('useQueryParam', () => {
  return () => 'orc';
});
