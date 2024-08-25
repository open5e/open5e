<template>
  <main v-if="monster" class="docs-container container" :data-mode="mode">
    <!-- TITLE -->
    <div class="flex items-end justify-between gap-8">
      <h1 class="flex-auto">{{ monster.name }}</h1>

      <div class="flex flex-none items-start">
        <button
          class="flex items-center gap-1 rounded-md p-1 text-xs text-blood outline outline-1 outline-blood hover:bg-blood hover:text-white"
          @click="toggleMode()"
        >
          <Icon
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
      <span>{{ `${monster.size} ${monster.type}` }}</span>
      <span
        v-if="monster.subtype"
        class="before:content-['_('] after:content-[')']"
      >
        {{ monster.subtype }}
      </span>
      <span v-if="monster.alignment" class="before:content-[',_']">
        {{ monster.alignment }}
      </span>
      <source-tag
        v-show="monster.document__slug"
        :title="monster.document__title"
        :text="monster.document__slug"
      />
    </p>

    <section>
      <ul>
        <li>
          <span class="font-bold after:content-['_']">Armor Class</span>
          {{
            `${monster.armor_class}${
              monster.armor_desc ? ` (${monster.armor_desc})` : ''
            }`
          }}
        </li>
        <li>
          <span class="font-bold after:content-['_']">Hit Points</span>
          <span class="after:content-['_']">{{ monster.hit_points }}</span>
          <span
            class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
            @click="useDiceRoller(monster.hit_dice)"
          >
            {{ `(${monster.hit_dice})` }}
          </span>
        </li>
        <li>
          <span class="font-bold after:content-['_']">Speed</span>
          <span
            v-for="(speed, key) in monster.speed"
            v-show="key !== 'hover'"
            :key="key"
            class="after:content-[',_'] last:after:content-[]"
          >
            {{
              `${key !== 'walk' ? `${key} ` : ''}${speed}ft.${
                speed.hasOwnProperty('hover') && key === 'fly' ? ' (hover)' : ''
              }`
            }}
          </span>
        </li>
      </ul>
    </section>

    <hr />

    <!-- ABILITY SCORES -->
    <section class="max-w-96">
      <ul class="flex items-center gap-4 text-center">
        <li v-for="ability in monster.abilities" :key="ability.name">
          <span class="block font-bold uppercase">{{ ability.shortName }}</span>
          <span class="after:content-['_']">{{ ability.score }}</span>
          <span
            class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
            @click="useDiceRoller(ability.modifier)"
          >
            {{ `(${ability.modifier})` }}
          </span>
        </li>
      </ul>
    </section>

    <hr />

    <!-- Monster Special Abilities -->
    <section v-if="monster.special_abilities">
      <p
        v-for="ability in monster.special_abilities"
        :key="ability.name"
        class="action-block"
      >
        <span class="font-bold after:content-['._']">{{ ability.name }}</span>
        <md-viewer :inline="true" :text="ability.desc" :use-roller="true" />
      </p>
    </section>

    <!-- Monster Actions -->
    <section v-if="monster.actions">
      <h2>Actions</h2>
      <ul id="actions-list">
        <li v-for="action in monster.actions" :key="action.name" class="my-1">
          <span class="font-bold after:content-['_']">{{ action.name }}. </span>
          <md-viewer :inline="true" :text="action.desc" :use-roller="true" />
        </li>
      </ul>
    </section>

    <!-- Monster Bonus Actions -->
    <section v-if="monster.bonus_actions">
      <h2>Bonus Actions</h2>
      <ul>
        <li
          v-for="action in monster.bonus_actions"
          :key="action.name"
          class="my-1"
        >
          <span class="font-bold after:content-['_']">{{ action.name }}. </span>
          <md-viewer :inline="true" :text="action.desc" :use-roller="true" />
        </li>
      </ul>
    </section>

    <!-- Monster Reactions -->
    <section v-if="monster.reactions">
      <h2>Reactions</h2>
      <ul>
        <li v-for="action in monster.reactions" :key="action.name" class="my-1">
          <span class="font-bold after:content-['_']">{{ action.name }}. </span>
          <md-viewer :inline="true" :text="action.desc" :use-roller="true" />
        </li>
      </ul>
    </section>

    <!-- Monster Legendary Actions -->
    <section v-if="monster.legendary_actions">
      <h2>Legendary Actions</h2>
      <p v-if="monster.legendary_desc" class="text">
        {{ monster.legendary_desc }}
      </p>

      <ul>
        <li
          v-for="action in monster.legendary_actions"
          :key="action.name"
          class="my-1"
        >
          <span class="font-bold after:content-['_']">{{ action.name }}.</span>
          <md-viewer :inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>
    <!-- Monster Mythic Actions -->
    <section v-if="monster.mythic_actions">
      <h2>Mythic Actions</h2>
      <ul>
        <li
          v-for="action in monster.mythic_actions"
          :key="action.name"
          class="my-1"
        >
          <span class="font-bold after:content-['_']">{{ action.name }}.</span>
          <md-viewer :inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Lair and Lair Actions -->
    <section v-if="monster.lair_actions">
      <h2>Lair Actions</h2>
      <p v-if="monster.lair_desc" class="text">
        {{ monster.lair_desc }}
      </p>
      <ul>
        <li
          v-for="action in monster.lair_actions"
          :key="action.name"
          class="my-1"
        >
          <span class="font-bold after:content-['_']">{{ action.name }}.</span>
          <md-viewer :inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Description -->
    <section v-if="monster.desc">
      <h2>Description</h2>
      <md-viewer :text="monster.desc" />
    </section>

    <hr />

    <!-- Monster Environments -->
    <section v-if="monster.environments?.length > 0">
      <span class="font-bold after:content-[_]">Environments:</span>
      <span
        v-for="environment in monster.environments"
        :key="environment"
        class="text-sm after:content-[',_'] last:after:content-[]"
      >
        {{ environment }}
      </span>
    </section>

    <p class="mb-4 text-sm italic">
      Source:
      <a target="NONE" :href="monster.document__url">
        {{ monster.document__title }}
        <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
      </a>
    </p>
  </main>
</template>

<script setup>
const route = useRoute();
const { data: monster } = useMonster(route.params.id);

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
    query:
      mode.value === 'compact'
        ? {
            mode: 'compact',
          }
        : null,
  });
}
</script>

<style scoped lang="scss">
.img-main {
  float: right;
  margin-block: 1rem;
  width: 30%;
  min-width: 300px;
}

@media screen and (max-width: 600px) {
  .img-main {
    float: none;
    width: 100%;
  }
}

[data-mode='compact'] {
  font-size: 0.833rem;
  line-height: 1.25;
}

[data-mode='compact'] h1 {
  font-size: 1.2rem;
  margin-top: 0.833rem;
}

[data-mode='compact'] h2 {
  font-size: 1rem;
  margin-top: 0.833rem;
}

[data-mode='compact'] hr {
  margin-block: 0.5rem;
}
</style>
<hr />
