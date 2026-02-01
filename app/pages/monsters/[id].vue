<template>
  <main
    v-if="monster"
    class="docs-container container"
  >
    <!-- TITLE -->
    <div class="flex items-end justify-between gap-8">
      <h1 class="flex-auto">{{ monster.name }}</h1>

      <div class="flex flex-none items-start gap-2">
        <button
          v-if="monsterInEncounter"
          class="red-red flex h-8 items-center gap-2 rounded bg-red px-3 py-1.5 text-sm font-medium text-white hover:bg-red-300 lg:flex"
          @click="removeFromEncounter"
        >
          <Icon name="heroicons:minus" />
        </button>
        <button
          class="h-8 rounded bg-red px-2 py-1 text-sm font-medium text-white hover:bg-red-300"
          data-testid="add-to-encounter"
          @click="addToEncounter"
        >
          <Icon name="heroicons:plus" /> Add to Encounter
        </button>
      </div>
    </div>

    <img
      v-if="monster.illustration"
      :src="monster.illustration.file_url"
      :alt="monster.illustration.alt_text"
      class="img-main"
    />
    <p class="italic">
      <span>{{ `${monster.size.name} ${monster.type.name}` }}</span>

      <span v-if="monster.subcategory">
        {{ ' ' + `(${monster.subcategory})` }}
      </span>

      <span v-if="monster.alignment">
        {{ ', ' + monster.alignment }}
      </span>
      
      <span>{{ ' ' }}</span>

      <SourceTag
        :title="monster.document.name"
        :text="monster.document.key"
      />
    </p>

    <table class="table-auto border-none text-base">
      <tbody class="[&>*>*]:border-none [&>*]:border-none">
        <tr class="grid grid-cols-[10rem,_1fr] [&>*]:p-0">
          <th>Armor Class</th>
          <td class="text-nowrap">
            <span>{{ monster.armor_class }}</span>
            <span 
              v-if="monster.armor_detail"
              class="text-charcoal dark:text-smoke"
            >
              ({{ monster.armor_detail }})
            </span>
          </td>
        </tr>

        <tr class="grid grid-cols-[10rem,_1fr] [&>*]:p-0">
          <th>Initiative Bonus</th>
          <td
            class="w-min cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
            @click="rollDice(initiativeBonus, {
              title: 'Initiative',
              subtitle: monster.name
            })"
          >
            {{ formatModifier(initiativeBonus) }}
          </td>
        </tr>

        <tr class="grid grid-cols-[10rem,_1fr] [&>*]:p-0">
          <th>Hit Points</th>
          <td class="text-nowrap">
            <span>{{ monster.hit_points }}</span>
            <span
              v-if="monster.hit_dice"
              class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
              @click="rollDice(monster.hit_dice, {
                title: 'Hit Points',
                subtitle: monster.name
              })"
            >
              {{ ' ' + `(${monster.hit_dice})` }}
            </span>
          </td>
        </tr>

        <tr class="grid grid-cols-[10rem,_1fr] [&>*]:p-0">
          <th>Speed</th>
          <td class="text-nowrap">
            <span>{{ speeds }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <hr class="my-4 h-[2px] w-[32rem] border-none bg-white bg-gradient-to-r from-fireball dark:bg-darkness dark:from-blood" />

    <!-- MONSTER ABILITY SCORES & SAVING THROWS TABLE -->
    <MonsterAbilities :monster="monster" />

    <hr class="my-4 h-[2px] w-[32rem] border-none bg-white bg-gradient-to-r from-fireball dark:bg-darkness dark:from-blood" />

    <!-- BOX UNDER STATS -->
    <table class="my-4 border-none text-base">
      <tbody class="[&>*>*]:border-none [&>*]:border-none">
        <tr 
          v-if="Object.keys(monster.skill_bonuses).length > 0"
          class="grid grid-cols-[10rem,_1fr] [&>*]:p-0"
        >
          <th>{{ 'Skills' + ' ' }}</th>
          <td class="text-nowrap">
            <ul>
              <li
                v-for="(modifier, skill) in monster.skill_bonuses"
                :key="skill"
                class="inline cursor-pointer font-bold capitalize text-blood after:text-black after:content-[',_'] last:after:content-[] hover:text-black dark:after:text-white dark:hover:text-fog"
                @click="rollDice(modifier.toString(), {
                  title: skill,
                  subtitle: monster.name
                })"
              >
                {{ `${skill} ${formatModifier(modifier)}` }}
              </li>
            </ul>
          </td>
        </tr>

        <tr 
          v-for="(text, title) in resistancesAndVulnerabilities"
          :key="title"
          class="grid grid-cols-[10rem,_1fr] [&>*]:p-0"
        >
          <th>{{ title }}</th>
          <td class="capitalize">{{ text }}</td>
        </tr>

        <tr class="grid grid-cols-[10rem,_1fr] [&>*]:p-0">
          <th>Senses</th>
          <td class="text-nowrap">
            {{
              Object.keys(senses)
                .map((item) => `${item} ${senses[item as keyof typeof senses]}`)
                .join(', ')
            }}
          </td>
        </tr>

        <tr class="grid grid-cols-[10rem,_1fr] [&>*]:p-0">
          <th>Languages</th>
          <td class="text-nowrap">{{ monster.languages.as_string || "-" }}</td>
        </tr>

        <tr class="grid grid-cols-[10rem,_1fr] [&>*]:p-0">
          <th>Challenge</th>
          <td class="text-nowrap">
            <span>{{ monster.challenge_rating_text + " " }}</span>
            <span>{{ `(${monster.experience_points.toLocaleString()} XP)` }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- TRAITS -->
    <section v-if="monster.traits?.length !== 0">
      <h2>Traits</h2>
      <ul id="traits-list">
        <li
          v-for="trait in monster.traits"
          :key="trait.name"
          class="my-1"
        >
          <h3 class="inline text-base">{{ trait.name + ". " }}</h3>
          <MdViewer
            :inline="true"
            :text="trait.desc"
            :use-roller="true"
          />
        </li>
      </ul>
    </section>

    <!-- CREATURE ACTIONS -->
    <section>
      <template
        v-for="(actionsByType, actionType) in actions"
        :key="actionType"
      >
        <div v-if="actionsByType.length > 0">
          <h2>{{ snakeToTitleCase(actionType + "s") }}</h2>
          <ul>
            <li
              v-for="action in actionsByType"
              :key="action.name"
              class="my-1"
            >
              <h3 class="inline text-base">
                <span>{{ action.name }}</span>
                <span
                  v-if="action.usage_limits?.type === 'RECHARGE_ON_ROLL'"
                  class="cursor-pointer font-sans font-bold text-blood before:text-black after:text-black  hover:text-black dark:before:text-white dark:after:text-white dark:hover:text-white"
                  @click="rollDice('1d6+0', {
                    title: `${action.name} Recharge`,
                    subtitle: monster.name,
                  })"
                > 
                  {{ ' (Recharge ' + (action.usage_limits.param < 6 ? `${action.usage_limits.param}-6` : '6') + ')' }}
                </span>

                <span v-if="action.usage_limits?.type === 'PER_DAY'" class="font-sans italic">
                  {{ ` (${action.usage_limits.param}/Day)` }}
                </span>
                
                <span v-if="action.legendary_action_cost >= 2" class="font-sans italic">
                  {{ ` (Costs ${action.legendary_action_cost} Actions)` }}
                </span>

                <span v-if="action?.limited_to_form" class="font-sans">
                  {{ ` (${action.limited_to_form})` }}
                </span>

                <span>{{ ". " }}</span>
              </h3>

              <MdViewer
                :inline="true"
                :text="action.desc"
                :use-roller="true"
              />
            </li>
          </ul>
        </div>
      </template>
    </section>

    <hr class="my-4 h-[2px] w-[32rem] border-none bg-white bg-gradient-to-r from-fireball dark:bg-darkness dark:from-blood" />

    <!-- Monster Environments -->
    <section v-if="monster.environments?.length > 0">
      <span class="font-bold">Environments: </span>
      <span
        v-for="environemnt in monster.environments"
        :key="environemnt.key"
        class="text-sm after:content-['.'] [&:not(:last-child)]:after:content-[',_']"
      >
        {{ environemnt.name }}
      </span>
    </section>

    <p class="text-sm italic">
      Source:
      <a
        target="NONE"
        :href="monster.document.permalink"
      >
        {{ monster.document.name }}
        <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
      </a>
    </p>
  </main>
</template>

<script setup lang="ts">
import type { CreatureAction } from '@/types';

const rollDice = useDiceRoller();
const formatModifier = useFormatModifier();

const params = {
  environments__fields: 'name',
  document__fields: 'name,key,permalink',
};

const monsterId = useQueryParameter('id');
const { data: monster } = useFindOne(
  API_ENDPOINTS.monsters,
  monsterId,
  { params },
);

usePageMetadata({ title: computed(() => monster.value?.name) });

// Calculate initiative bonus from dexterity modifier if not explicitly set
const initiativeBonus = computed(() => {
  if (!monster.value) return 0;
  return monster.value.initiative_bonus ?? monster.value.modifiers?.dexterity;
});

type ActionType = 'ACTION' | 'BONUS_ACTION' | 'REACTION' | 'LEGENDARY_ACTION' | 'LAIR_ACTION';

// Sort monster actions by type (ie. 'action', 'bonus action', 'reaction').
// rtrns an object whose keys are action types & vals are arrays of actions.
const actions = computed(() => {
  if (!monster?.value?.actions) return {};

  const actionsByType = monster.value.actions.reduce<Record<ActionType, CreatureAction[]>>(
    (output, action) => {
      const { action_type: actionType } = action;
      if (!actionType) return output;
      if (output[actionType]) output[actionType].push(action);
      else output[actionType] = [action];
      return output;
    },
    {
      'ACTION': [] as CreatureAction[],
      'BONUS_ACTION': [] as CreatureAction[],
      'REACTION': [] as CreatureAction[],
      'LEGENDARY_ACTION': [] as CreatureAction[],
      'LAIR_ACTION': [] as CreatureAction[]
    },
  );

  // sort monster actions according to the value of their 'order' field
  Object.keys(actionsByType).forEach((type) => {
    actionsByType[type as ActionType].sort(
      (a: CreatureAction, b: CreatureAction) => a['order_in_statblock'] - b['order_in_statblock']
    );
  });

  return actionsByType;
}) as ComputedRef<Record<ActionType, CreatureAction[]>>;

// Converts SNAKE_CASE to Title Case, used for action type headers
const snakeToTitleCase = (input: string) =>
  input
    .toLowerCase()
    .split('_')
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ');

// Format monster speeds for template
const speeds = computed(() => {
  if (!monster?.value?.speed) return '';
  const { unit, ...speeds } = monster.value.speed;
  return Object.entries(speeds).map(
    ([speed, distance]) =>
      (speed === 'walk' ? '' : speed + ' ') + `${distance} ft.`,
  ).join(', ');
});

// assemble senses from multiple fields
const senses = computed(() => {
  if (!monster?.value) return {};

  const {
    darkvision_range: darkvision,
    blindsight_range: blindsight,
    tremorsense_range: tremorsense,
    truesight_range: truesight,
    passive_perception: passivePerception,
  } = monster.value;

  return {
    ...(darkvision && { 'Darkvision': darkvision + ' ft.' }),
    ...(blindsight && { 'Blindsight': blindsight + ' ft.' }),
    ...(tremorsense && {'Tremorsense': tremorsense + ' ft.' }),
    ...(truesight && { 'Truesight': truesight + ' ft.' }),
    ...(passivePerception && { 'Passive Perception': passivePerception})
  };
});

// Format monster immunities, resistances, and vulnerabilities as an iterable
// object suitable for rendering via a `v-for` directive
const resistancesAndVulnerabilities = computed(() => {
  const { value: monsterData } = monster;
  if (!monsterData) return {};

  // destructure deeply-nested data
  const { resistances_and_immunities: resImmunityData } = monsterData;
  const {
    damage_resistances_display: dmgRes,
    damage_immunities_display: dmgImmune,
    damage_vulnerabilities_display: dmgVuln,
    condition_immunities_display: conditionImmune,
  } = resImmunityData;

  // assemble output object, conditionally inlcuding only non-nullish fields
  return {
    ...(dmgVuln && { 'Vulnerabilities': dmgVuln }),
    ...(dmgRes && { 'Resistances': dmgRes }),
    ...(dmgImmune && { 'Damage Immunities': dmgImmune }),
    ...(conditionImmune && { 'Condition Immunities': conditionImmune }),
  };
});

const encounterStore = useEncounterStore();

const addToEncounter = () => {
  if (!monster.value) return;
  console.log('test');

  encounterStore.addMonster(
    monster.value.key,
    monster.value.name,
    parseFloat(monster.value.challenge_rating_decimal),
    monster.value.challenge_rating_text,
  );
};

const monsterInEncounter = computed(() => {
  if (!monster.value) return false;
  return encounterStore.monsters.value.find(m => m.key === monster.value.key);
});

const removeFromEncounter = () => {
  if (!monster.value) return;
  encounterStore.removeMonster(monster.value.key);
};
</script>

<style scoped lang="scss">
.img-main {
  float: right;
  width: 30%;
  min-width: 300px;
}

@media screen and (max-width: 600px) {
  .img-main {
    float: none;
    width: 100%;
  }
}
</style>
