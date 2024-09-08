<template>
  <main v-if="classData" class="docs-container container">
    <h1>{{ classData.name }}</h1>
    <p v-if="classData.subclass_of">
      <span class="font-bold after:content-['_']">Subclass of</span>
      <!-- Key not rtn'd  by subclass_of, extract from url -->
      <nuxt-link
        class="font-bold"
        :to="`/classes/${classData.subclass_of.url
          .split('/')
          .filter((exists) => exists)
          .pop()}`"
      >
        {{ classData.subclass_of.name }}
      </nuxt-link>
    </p>

    <ul v-if="subclasses.length > 0" class="mt-2">
      <p class="inline font-bold after:content-[':_']">Subclasses</p>
      <li v-for="subclass in subclasses" :key="subclass.name" class="inline">
        <nuxt-link :to="`/classes/${subclass.key}`">
          {{ subclass.name }}
        </nuxt-link>
      </li>
    </ul>
    <section>
      <h2>Class Features</h2>
      <p>As a {{ classData.name }} you gain the following features.</p>

      <section v-if="hitPoints.length > 0">
        <h3>Hit Points</h3>
        <dl>
          <div v-for="item in hitPoints" :key="item.title">
            <dt class="inline font-bold after:content-['_']">
              {{ item.title }}
            </dt>
            <dd class="inline">{{ item.data }}</dd>
          </div>
        </dl>
      </section>

      <section v-if="proficiencies.length > 0">
        <h3>Proficiencies</h3>
        <dl>
          <div v-for="prof in proficiencies" :key="prof.title">
            <dt class="inline font-bold after:content-['_']">
              {{ prof.title }}
            </dt>
            <dd class="inline">{{ prof.data }}</dd>
          </div>
        </dl>
      </section>

      <h3>The {{ classData.name }}</h3>
      <class-table :class-features="classData.levels" />
    </section>

    <section>
      <h2>Class Abilities</h2>
      <ul v-if="featuresInOrder.length > 0">
        <template v-for="features in featuresInOrder">
          <li v-for="feature in features" :key="feature.key">
            <h3>{{ feature.name }}</h3>
            <md-viewer :text="feature.desc" header-level="3" />
          </li>
        </template>
      </ul>
    </section>
  </main>

  <p v-else>Loading...</p>
</template>

<script setup>
const { data: classData } = useFindOne(
  API_ENDPOINTS.classes,
  useRoute().params.className
);

const { data: subclasses } = useFindMany(API_ENDPOINTS.classes, {
  fields: ['key', 'name'].join(','),
  subclass_of: useRoute().params.className,
});

// Formatting of fields is handled here to keep the template markup legible

const hitPoints = computed(() => {
  if (!classData.value.hit_points) {
    return [];
  }
  return [
    { title: 'Hit Dice', data: classData.value.hit_points.hit_dice_name },
    {
      title: 'Hit Points at 1st Level',
      data: classData.value.hit_points.hit_points_at_1st_level,
    },
    {
      title: 'Hit Points at Higher Levels',
      data: classData.value.hit_points.hit_points_at_higher_levels,
    },
  ];
});

// TODO: proficiencies not currently returned by API
const proficiencies = computed(() => {
  if (!classData.value.proficiencies) {
    return [];
  }
  return [
    { title: 'Armor' },
    { title: 'Weapons' },
    { title: 'Tools' },
    { title: 'Saving Throws' },
    { title: 'Skills' },
  ];
});

const featuresInOrder = computed(() => {
  let levels = [];
  for (let i = 1; i <= 20; i++) {
    levels.push(i);
  }

  // get keys for features at each level
  const featureKeysByLevel = levels.map(
    (level) => classData.value.levels[level]?.features
  );

  // use features
  return featureKeysByLevel.map((keys) => {
    // this should be a one-liner, but eslint says not. We should update rules
    if (!keys) {
      return;
    }
    return classData.value.features.filter((feature) =>
      keys.includes(feature.key)
    );
  });
});
</script>
