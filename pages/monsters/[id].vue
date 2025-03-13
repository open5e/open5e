<template>
  <main v-if="monster" class="docs-container container">
    <!-- TITLE -->
    <div class="flex items-end justify-between gap-8">
      <h1 class="flex-auto">{{ monster.name }}</h1>

      <div class="flex flex-none items-start">
        <button
          class="flex items-center gap-1 rounded-md p-1 text-xs text-blood outline outline-1 outline-blood hover:bg-blood hover:text-white"
          @click="toggleMode()"
        >
          <icon
            :name="
              mode === 'compact'
                ? 'heroicons:arrows-pointing-out'
                : 'heroicons:arrows-pointing-in'
            "
          />
          {{ mode === 'compact' ? 'Regular statblock' : 'Compact statblock' }}
        </button>
      </div>
    </div>

    <img
      v-if="mode !== 'compact' && monster.img_main"
      :src="monster.img_main"
      class="img-main"
    />
    <p class="italic">
      <span>{{ `${monster.size.name} ${monster.type.name}` }}</span>

      <span
        v-if="monster.subtype"
        class="before:content-['_('] after:content-[')']"
      >
        {{ monster.subtype }}
      </span>

      <span v-if="monster.alignment" class="before:content-[',_']">
        {{ monster.alignment }}
      </span>

      <source-tag :title="monster.document.name" :text="monster.document.key" />
    </p>

    <ul>
      <!-- Size / Type / Alignment / Source Tag -->
      <li>
        <span class="font-bold after:content-['_']">Armor Class</span>
        <span>{{ monster.armor_class }}</span>
        <span
          v-if="monster.armor_desc"
          class="before:content-['_('] after:content-[')']"
        >
          {{ monster.armor_desc }}
        </span>
      </li>
      <li>
        <span class="font-bold after:content-['_']">Hit Points</span>
        <span class="after:content-['_']">{{ monster.hit_points }}</span>
        <span
          v-if="monster.hit_dice"
          class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
          @click="useDiceRoller(monster.hit_dice)"
        >
          {{ `(${monster.hit_dice})` }}
        </span>
      </li>

      <!-- SPEED -->
      <li>
        <span class="font-bold after:content-['_']">Speed</span>
        <span
          v-for="(speed, key) in speeds"
          :key="key"
          class="after:content-[',_'] last:after:content-[]"
        >
          <span v-if="key !== 'walk'" class="after:content-['_']">
            {{ key }}
          </span>
          <span class="after:content-['_ft.']">
            {{ speed }}
          </span>
        </span>
      </li>
    </ul>

    <hr />

    <!-- ABILITY SCORES -->
    <ul class="flex max-w-96 items-center gap-4 text-center">
      <li v-for="(score, ability) in monster.ability_scores" :key="ability">
        <label class="block font-bold uppercase">
          {{ ability.substring(0, 3) }}
        </label>
        <span class="after:content-['_']">{{ score }}</span>
        <span
          class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
          @click="useDiceRoller(monster.modifiers[ability].toString())"
        >
          {{ `(${useFormatModifier(monster.modifiers[ability])})` }}
        </span>
      </li>
    </ul>

    <hr />

    <!-- BOX UNDER STATS -->
    <section>
      <!-- SAVING THROWS -->
      <ul v-if="Object.keys(monster.saving_throws).length > 0" id="saves">
        <label for="saves" class="inline font-bold after:content-['_']">
          Saving Throws
        </label>
        <li
          v-for="(save, name) in monster.saving_throws"
          :key="name"
          class="inline cursor-pointer font-bold text-blood after:content-[',_'] last:after:content-[] hover:text-black dark:hover:text-fog"
          @click="useDiceRoller(save.toString())"
        >
          {{ `${name.toUpperCase().slice(0, 3)} ${useFormatModifier(save)}` }}
        </li>
      </ul>

      <!-- SKILLS -->
      <ul v-if="Object.keys(monster.skill_bonuses).length > 0" id="skills">
        <label for="skills" class="inline font-bold after:content-['_']">
          Skills
        </label>
        <li
          v-for="(modifier, skill) in monster.skill_bonuses"
          :key="skill"
          class="inline cursor-pointer font-bold capitalize text-blood after:content-[',_'] last:after:content-[] hover:text-black dark:hover:text-fog"
          @click="useDiceRoller(modifier.toString())"
        >
          {{ `${skill} ${useFormatModifier(modifier)}` }}
        </li>
      </ul>

      <!-- DAMAGE IMMUNITIES -->
      <ul v-if="damageImmunities.length > 0" id="dmg-immunities">
        <label
          for="dmg-immunities"
          class="inline font-bold after:content-['_']"
        >
          Damage Immunities
        </label>
        <li
          v-for="immunity in damageImmunities"
          :key="immunity.name"
          class="inline capitalize after:content-[',_'] last:after:content-[]"
        >
          {{ immunity.name }}
        </li>
      </ul>

      <!-- DAMAGE RESISTANCES -->
      <ul v-if="damageResistances.length > 0" id="dmg-resistances">
        <label
          for="dmg-resistances"
          class="inline font-bold after:content-['_']"
        >
          Damage Resistances
        </label>
        <li
          v-for="resistance in damageResistances"
          :key="resistance.name"
          class="inline after:content-[',_'] last:after:content-['']"
        >
          {{ resistance.name }}
        </li>
      </ul>

      <!-- CONDITION IMMUNITIES -->
      <ul v-if="monster.condition_immunities.length > 0" id="conditions">
        <label for="conditions" class="inline font-bold after:content-['_']">
          Condition Immunities
        </label>
        <li
          v-for="immunity in monster.condition_immunities"
          :key="immunity.name"
          class="inline capitalize after:content-[',_'] last:after:content-[]"
        >
          {{ immunity.name }}
        </li>
      </ul>

      <!-- SENSES -->
      <ul id="senses">
        <span for="senses" class="inline font-bold after:content-['_']">
          Senses
        </span>
        <li
          v-for="(value, sense) in senses"
          :key="sense"
          class="inline after:content-[',_'] last:after:content-[]"
        >
          {{ `${sense} ${value}` }}
        </li>
      </ul>

      <!-- LANGUAGES -->
      <ul id="languages">
        <span for="languages" class="inline font-bold after:content-['_']">
          Languages
        </span>
        <li
          v-for="language in monster.languages"
          :key="language.name"
          class="inline after:content-[',_'] last:after:content-[]"
        >
          {{ language.name }}
        </li>
        <li v-if="monster.languages.length === 0" class="inline">-</li>
      </ul>

      <!-- CHALLENGE -->
      <ul id="challenge">
        <span for="challenge" class="inline font-bold after:content-['_']">
          Challenge
        </span>
        <span>
          {{
            `${monster.challenge_rating_text} (${monster.experience_points} XP)`
          }}
        </span>
      </ul>
    </section>

    <!-- TRAITS -->
    <section v-if="monster.traits?.length !== 0">
      <h2>Traits</h2>
      <ul id="traits-list">
        <li v-for="trait in monster.traits" :key="trait.key" class="my-1">
          <span class="font-bold after:content-['._']">
            {{ trait.name }}
          </span>
          <md-viewer :inline="true" :text="trait.desc" :use-roller="true" />
        </li>
      </ul>
    </section>

    <!-- CREATURE ACTIONS -->
    <section
      v-for="(actionsByType, actionType) in actions"
      :key="actionsByType"
    >
      <h2>{{ snakeToTitleCase(actionType) }}</h2>
      <ul>
        <li v-for="action in actionsByType" :key="action.name" class="my-1">
          <span class="font-bold after:content-['_']">{{ action.name }}</span>
          <span
            v-if="action.uses_type === 'RECHARGE_ON_ROLL'"
            class="after:content-['_']"
            class="cursor-pointer font-bold text-blood before:text-black before:content-['_('] after:text-black after:content-[')'] hover:text-black dark:before:text-white dark:after:text-white dark:hover:text-white"
            @click="useDiceRoller('1d6+0')"
          >
            {{ `Recharge ${action.uses_param}-6` }}
          </span>
          <md-viewer inline="true" :text="action.desc" :use-roller="true" />
        </li>
      </ul>
    </section>

    <!-- DESCRIPTION -->
    <section v-if="monster.desc">
      <h2>Description</h2>
      <md-viewer :text="monster.desc" />
    </section>

    <hr />

    <!-- Monster Environments -->
    <section v-if="monster.environments?.length > 0">
      <span class="font-bold">Environments: </span>
      <span
        v-for="environemnt in monster.environments"
        :key="environemnt.id"
        class="text-sm after:content-['.'] [&:not(:last-child)]:after:content-[',_']"
      >
        {{ environemnt.name }}
      </span>
    </section>

    <p class="text-sm italic">
      Source:
      <a target="NONE" :href="monster.document.permalink">
        {{ monster.document.name }}
        <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
      </a>
    </p>
    <p class="text-sm italic">
      Compact Statblock:
      <nuxt-link
        tag="a"
        :params="{ id: monster.slug }"
        :to="`/monsters/compact/${monster.slug}`"
        :prefetch="false"
      >
        {{ monster.name }}
      </nuxt-link>
    </p>
  </main>
</template>

<script setup>
const route = useRoute();
const params = {
  environments__fields: 'name',
  languages__fields: 'name',
  document__fields: 'name,key,permalink',
};
const { data: monster } = useFindOne(
  API_ENDPOINTS.monsters,
  useRoute().params.id,
  { params }
);

// Sort monster actions by type (ie. 'action', 'bonus action', 'reaction').
// rtrns an object whose keys are action types & vals are arrays of actions.
const actions = computed(() => {
  if (!monster?.value?.actions) return {};
  return monster.value.actions.reduce(
    (output, action) => {
      const { action_type: actionType } = action;
      if (output[actionType]) output[actionType].push(action);
      else output[actionType] = [action];
      return output;
    },
    { ACTION: [] }
  );
});

// Converts SNAKE_CASE to Title Case, used for action type headers
const snakeToTitleCase = (input) =>
  input
    .toLowerCase()
    .split('_')
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');

// filter "unit" prop from "speeds"
const speeds = computed(() => {
  if (!monster?.value?.speed) return {};
  const { unit, ...rest } = monster.value.speed;
  return rest;
});

// assemble senses from multiple fields
const senses = computed(() => {
  if (!monster?.value) return {};
  const senses = {};
  if (monster.value.darkvision_range) {
    senses['Darkvision'] = monster.value.darkvision_range + ' ft.';
  }
  if (monster.value.blindsight_range) {
    senses['Blindsight'] = monster.value.blindsight_range + ' ft.';
  }
  if (monster.value.tremorsense_range) {
    senses['Tremorsense'] = monster.value.tremorsense_range + ' ft.';
  }
  if (monster.value.truesight_range) {
    senses['Truesight'] = monster.value.truesight_range + ' ft.';
  }
  senses['Passive Perception'] = monster.value.passive_perception;
  return senses;
});

// format damage resistances correctly (damage from non-magic weapons)
const damageResistances = computed(() => {
  if (!monster?.value) return {};
  if (!monster.value.nonmagical_attack_resistance) {
    return monster.value.damage_resistances;
  }
  return [
    ...monster.value.damage_resistances.filter(
      (res) => !['Bludgeoning', 'Slashing', 'Piercing'].includes(res.name)
    ),
    {
      name: 'Bludgeoning, Piercing and Slashing from Nonmagical Attacks',
    },
  ];
});

// format damage resistances correctly (damage from non-magic weapons)
const damageImmunities = computed(() => {
  if (!monster?.value) return {};
  if (!monster.value.nonmagical_attack_immunity) {
    return monster.value.damage_immunities;
  }
  return [
    ...monster.value.damage_immunities.filter(
      (res) => !['Bludgeoning', 'Slashing', 'Piercing'].includes(res.name)
    ),
    {
      name: 'Bludgeoning, Piercing and Slashing from Nonmagical Attacks',
    },
  ];
});

const mode = ref(route.query.mode || 'normal');
function toggleMode() {
  switch (mode.value) {
    case 'compact':
      mode.value = 'normal';
      break;
    default:
      mode.value = 'compact';
      break;
  }

  navigateTo({
    path: `/monsters/${route.params.id}`,
    query: mode.value === 'compact' ? { mode: 'compact' } : null,
  });
}
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
