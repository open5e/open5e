<template>
  <main
    v-if="monster"
    class="docs-container container"
  >
    <!-- TITLE -->
    <div class="flex items-end justify-between gap-8">
      <h1 class="flex-auto">
        {{ monster.name }}
      </h1>

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

      <span
        v-if="monster.alignment"
        class="before:content-[',_']"
      >
        {{ monster.alignment }}
      </span>

      <SourceTag
        :title="monster.document.name"
        :text="monster.document.key"
      />
    </p>

    <dl class="grid grid-cols-[10rem_1fr]">
      <!-- ARMOR CLASS -->
      <dt class="font-bold after:content-['_']">
        Armor Class
      </dt>
      <dd>
        <span>{{ monster.armor_class }}</span>
        <span
          v-if="monster.armor_detail"
          class="text-charcoal dark:text-smoke"
        >
          ({{ monster.armor_detail }})
        </span>
      </dd>

      <!-- INITIATIVE BONUS -->
      <dt class="font-bold after:content-['_']">
        Initiative Bonus
      </dt>
      <dd
        class="w-min cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
        @click="useDiceRoller(initiativeBonus)"
      >
        {{ useFormatModifier(initiativeBonus) }}
      </dd>

      <!-- HIT POINTS -->
      <dt class="font-bold after:content-['_']">
        Hit Points
      </dt>
      <dd>
        <span class="after:content-['_']">{{ monster.hit_points }}</span>
        <span
          v-if="monster.hit_dice"
          class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
          @click="useDiceRoller(monster.hit_dice)"
        >
          {{ `(${monster.hit_dice})` }}
        </span>
      </dd>

      <!-- SPEEDS -->
      <dt class="font-bold after:content-['_']">
        Speed
      </dt>
      <dd>
        <span
          v-for="speed in speeds"
          :key="speed"
          class="after:content-[',_'] last:after:content-[]"
        >
          {{ speed }}
        </span>
      </dd>
    </dl>

    <hr />

    <!-- MONSTER ABILITY SCORES & SAVING THROWS TABLE -->
    <MonsterAbilities :monster="monster" />

    <hr />

    <!-- BOX UNDER STATS -->
    <section class="my-4">
      <!-- SKILLS -->
      <ul
        v-if="Object.keys(monster.skill_bonuses).length > 0"
        id="skills"
      >
        <label
          for="skills"
          class="inline font-bold after:content-['_']"
        >
          Skills
        </label>
        <li
          v-for="(modifier, skill) in monster.skill_bonuses"
          :key="skill"
          class="inline cursor-pointer font-bold capitalize text-blood after:text-black after:content-[',_'] last:after:content-[] hover:text-black dark:after:text-white dark:hover:text-fog"
          @click="useDiceRoller(modifier.toString())"
        >
          {{ `${skill} ${useFormatModifier(modifier)}` }}
        </li>
      </ul>

      <!-- RESISTANCES, VULNERABILITY AND IMMUNITIES -->
      <ul
        v-for="(data, title) in resistancesAndVulnerabilities"
        :key="title"
      >
        <label class="inline font-bold after:content-['_']">{{ title }}</label>
        <li
          v-for="field in data"
          :key="field.name"
          class="inline after:content-[',_'] last:after:content-[]"
        >
          {{ field.name }}
        </li>
      </ul>

      <!-- SENSES -->
      <ul id="senses">
        <span
          for="senses"
          class="inline font-bold after:content-['_']"
        >
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
        <span
          for="languages"
          class="inline font-bold after:content-['_']"
        >
          Languages
        </span>
        <li
          v-for="language in monster.languages"
          :key="language.name"
          class="inline after:content-[',_'] last:after:content-[]"
        >
          {{ language.name }}
        </li>
        <li
          v-if="monster.languages.length === 0"
          class="inline"
        >
          -
        </li>
      </ul>

      <!-- CHALLENGE -->
      <ul id="challenge">
        <span
          for="challenge"
          class="inline font-bold after:content-['_']"
        >
          Challenge
        </span>
        <span>{{ monster.challenge_rating_text + ' ' }}</span>
        <span>{{ `(${monster.experience_points.toLocaleString()} XP)` }}</span>
      </ul>
    </section>

    <!-- TRAITS -->
    <section v-if="monster.traits?.length !== 0">
      <h2>Traits</h2>
      <ul id="traits-list">
        <li
          v-for="trait in monster.traits"
          :key="trait.key"
          class="my-1"
        >
          <span class="font-bold after:content-['._']">
            {{ trait.name }}
          </span>
          <md-viewer
            :inline="true"
            :text="trait.desc"
            :use-roller="true"
          />
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
        <li
          v-for="action in actionsByType"
          :key="action.name"
          class="my-1"
        >
          <span class="font-bold after:content-['_']">{{ action.name }}</span>
          <span
            v-if="action.uses_type === 'RECHARGE_ON_ROLL'"
            class="cursor-pointer font-bold text-blood before:text-black before:content-['_('] after:text-black after:content-[')_'] hover:text-black dark:before:text-white dark:after:text-white dark:hover:text-white"
            @click="useDiceRoller('1d6+0')"
          >
            {{
              'Recharge '
                + (action.uses_param < 6 ? `${action.uses_param}-6` : '6')
            }}
          </span>
          <md-viewer
            inline="true"
            :text="action.desc"
            :use-roller="true"
          />
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
      <a
        target="NONE"
        :href="monster.document.permalink"
      >
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
  { params },
);

// Calculate initiative bonus from dexterity modifier if not explicitly set
const initiativeBonus = computed(() => {
  if (!monster.value) return 0;
  return monster.value.initiative_bonus ?? monster.value.modifiers?.dexterity;
});

// Sort monster actions by type (ie. 'action', 'bonus action', 'reaction').
// rtrns an object whose keys are action types & vals are arrays of actions.
const actions = computed(() => {
  if (!monster?.value?.actions) return {};
  const actionsByType = monster.value.actions.reduce(
    (output, action) => {
      const { action_type: actionType } = action;
      if (output[actionType]) output[actionType].push(action);
      else output[actionType] = [action];
      return output;
    },
    { ACTION: [] },
  );

  // sort monster actions according to the value of their 'order' field
  Object.keys(actionsByType).forEach((type) => {
    actionsByType[type].sort((a, b) => a['order'] - b['order']);
  });

  return actionsByType;
});

// Converts SNAKE_CASE to Title Case, used for action type headers
const snakeToTitleCase = input =>
  input
    .toLowerCase()
    .split('_')
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ');

// Format monster speeds for template
const speeds = computed(() => {
  if (!monster?.value?.speed) return {};
  const { unit, ...speeds } = monster.value.speed;
  return Object.entries(speeds).map(
    ([speed, distance]) =>
      (speed === 'walk' ? '' : speed + ' ') + `${distance} ft.`,
  );
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

// format monster damage/condition vulnerabilities, resistances & immunities
const resistancesAndVulnerabilities = computed(() => {
  const { value: monsterData } = monster;
  if (!monsterData) return {};

  const resists = {
    damage_resistances: monsterData.damage_resistances,
    damage_vulnerabilities: monsterData.damage_vulnerabilities,
    damage_immunities: monsterData.damage_immunities,
    condition_immunities: monsterData.condition_immunities,
  };

  // helper function: formats 'Bludgeoning, Piercing and Slashing from Nonmagical Attacks'
  const formatNonMagicAttacks = (field) => {
    const damageTypesToSub = ['Bludgeoning', 'Slashing', 'Piercing'];
    const sub = 'Bludgeoning, Piercing and Slashing from Nonmagical Attacks';
    return [
      ...field.filter(res => !damageTypesToSub.includes(res.name)),
      { name: sub },
    ];
  };

  // conditionally apply non-magical attack resist/immunity formatting
  resists.damage_immunities = monsterData.nonmagical_attack_immunity
    ? formatNonMagicAttacks(resists.damage_immunities)
    : resists.damage_immunities;
  resists.damage_resistances = monsterData.nonmagical_attack_resistance
    ? formatNonMagicAttacks(resists.damage_resistances)
    : resists.damage_resistances;

  // filter empty keys, re-format object for display, and return
  return Object.entries(resists)
    .filter(([_, value]) => value.length > 0)
    .reduce((acc, [key, value]) => {
      acc[snakeToTitleCase(key)] = value;
      return acc;
    }, {});
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
