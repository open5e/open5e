<template>
  <main
    v-if="classData"
    class="docs-container container"
  >
    <h1>{{ classData.name }}</h1>
    <section>
      <h2>Class Features</h2>

      <MdViewer v-if="classData.desc" :text="classData.desc"/>

      <div v-if="features.coreTraitsTable" class="mt-4">
        <label class="font-bold">{{ `Core ${classData.name} Traits` }}</label>
        <MdViewer :text="features.coreTraitsTable.desc" />
      </div>

      <div v-if="!features.coreTraitsTable && hitPoints.length > 0">
        <h3>Hit Points</h3>
        <dl>
          <div
            v-for="item in hitPoints"
            :key="item.title"
          >
            <dt class="inline font-bold after:content-['_']">
              {{ item.title }}
            </dt>
            <dd class="inline">
              {{ item.data }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Proficiencies -->
      <div v-if="features?.proficiencies?.length > 0">
        <h3>Proficiencies</h3>
        <md-viewer
          v-for="proficiency in features.proficiencies"
          :key="proficiency.key"
          :text="proficiency.desc"
        />
      </div>
      <div v-if="features?.startingEquipment?.length > 0">
        <h3>Equipment</h3>
        <md-viewer
          v-for="equipment in features.startingEquipment"
          :key="equipment.key"
          :text="equipment.desc"
        />
      </div>
    </section>
    <section v-if="subclasses?.length > 0">
      <h3>Subclasses</h3>
      <ul class="mt-2 flex flex-wrap gap-x-2">
        <li
          v-for="subclass in subclasses"
          :key="subclass.name"
          class="after:ml-2 after:content-['|'] last:after:content-none"
        >
          <nuxt-link
            :to="`/classes/${useRoute().params.className}/${subclass.key}`"
          >
            {{ subclass.name }}
          </nuxt-link>
          <SourceTag
            :text="subclass.document.key"
            :title="subclass.document.name"
          />
        </li>
      </ul>
    </section>

    <!-- Class Table -->
    <section>
      <h2>The {{ classData.name }}</h2>
      <class-table
        :class-features="formatFeaturesForTable(features.classFeatures)"
        :proficiency-bonus="features.proficiencyBonuses"
        :spell-slots="features.spellSlots"
        :class-resource-table-columns="features.classTableColumnData"
      />
    </section>

    <!-- Class abilities per level -->
    <section>
      <ul v-if="featuresInOrder.length > 0">
        <li
          v-for="feature in featuresInOrder"
          :id="titleCaseToKebabCase(feature.name)"
          :key="feature.key"
        >
          <h3>
            <span v-if="feature.gained_at.length > 0" class="text-granite">
              {{ `Level ${findFeatureLowestLevel(feature)}: `  }}
            </span>
            <span>{{ feature.name }}</span>
          </h3>
          <MdViewer
            :text="feature.desc"
            :header-level="3"
          />
        </li>
      </ul>
    </section>

    <!-- Class ability option lists -->
    <section v-if="features.classOptionLists?.length > 0">
      <template v-for="feature in features.classOptionLists" :key="feature.name">
        <h2>{{ feature.name }}</h2>
        <MdViewer :text="feature.desc" :header-level="1" />
      </template>
    </section>

  </main>

  <p v-else>
    Loading...
  </p>
</template>

<script setup>
import MdViewer from '~/components/MdViewer.vue';
import { titleCaseToKebabCase } from '~/functions/titleCaseToKebabCase';

const { data: classData } = useFindOne(
  API_ENDPOINTS.classes,
  useRoute().params.className,
  {
    params: {
      is_subclass: false,
      fields: [
        'desc',
        'features',
        'hit_points',
        'key',
        'name',
        'subclasses',
      ].join(),
    },
  },
);

// fetch subclasses to generate links
const { data: subclasses } = useFindMany(API_ENDPOINTS.classes, {
  fields: ['key', 'name', 'document'].join(','),
  subclass_of: useRoute().params.className,
});

// sorts features into separate arrays based on the type of that feature
const features = computed(() => {
  const featureData = classData?.value?.features;
  if (!featureData) return {};
  return featureData.reduce(
    (acc, feature) => {
      if (!feature) return acc;
      const { feature_type: type } = feature;
      if (type === 'PROFICIENCY_BONUS') acc.proficiencyBonuses = feature;
      else if (type === 'CORE_TRAITS_TABLE') acc.coreTraitsTable = feature;
      else if (type === 'SPELL_SLOTS') acc.spellSlots.push(feature);
      else if (feature.data_for_class_table.length > 0)
        acc.classTableColumnData.push(feature);
      else if (type === 'CLASS_LEVEL_FEATURE') acc.classFeatures.push(feature);
      else if (type === 'PROFICIENCIES') acc.proficiencies.push(feature);
      else if (type === 'STARTING_EQUIPMENT')
        acc.startingEquipment.push(feature);
      else if (type === 'CLASS_FEATURE_OPTION_LIST')
        acc.classOptionLists.push(feature);
      return acc;
    },
    {
      classFeatures: [],
      classTableColumnData: [],
      classOptionLists: [],
      coreTraitsTable: undefined,
      proficiencies: [],
      proficiencyBonuses: undefined,
      spellSlots: [],
      startingEquipment: [],
    },
  );
});

// Formatting of fields is handled here to keep the template markup legible
const hitPoints = computed(() => {
  if (!classData?.value?.hit_points) {
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

// helper - takes an ability and if it gained at multiple lvls rtrns the lowest
const findFeatureLowestLevel = (feature) => {
  const gainedAt = feature.gained_at;
  if (gainedAt.length === 0) return;
  if (gainedAt.length === 1) return gainedAt[0].level;
  const lowestLevel = gainedAt.reduce((acc, value) => {
    return value.level < acc ? value.level : acc;
  }, 20);
  return lowestLevel;
};

// takes a feature and returns an array item for every lvl in the gained_at field
const featureToStubs = (feature) => {
  const { gained_at: gainedAt } = feature;
  return gainedAt.map(atLevel => ({
    name: feature.name,
    detail: atLevel.detail,
    level: atLevel.level,
  }));
};

const formatFeaturesForTable = (features) => {
  if (!features || features?.length === 0) return {};
  return features.reduce((output, feature) => {
    const featureStubs = featureToStubs(feature);
    featureStubs.forEach((stub) => {
      if (!output[stub.level]) output[stub.level] = [stub];
      else output[stub.level].push(stub);
    });
    return output;
  }, {});
};

// transforms the classFeatures arr into an obj. that maps levels to features
const featuresPerLevel = computed(() => {
  if (!features?.value?.classFeatures) return {};
  return features.value.classFeatures.reduce((output, feature) => {
    const featureLevel = findFeatureLowestLevel(feature);
    if (!featureLevel) return output;
    if (!output[featureLevel]) output[featureLevel] = [feature];
    else output[featureLevel].push(feature);
    return output;
  }, {});
});

// flattens the featuresPerLevel obj to create array of features sorted by lvl
const featuresInOrder = computed(() =>
  Object.values(featuresPerLevel.value).flat(),
);
</script>
