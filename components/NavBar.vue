<script>
/**
 * NavBar.vue - Navigation sidebar. Renders a list of links w/ optional nesting
 *
 * -= PROPS (INPUTS) =-
 * None (but perhaps `routes` should be a prop).
 *
 * -= DEPENDENCIES =-
 * @composable useFindMany: data-fetching composable. Fetches `Classes` to populate menu
 * @composable useRoute: Nuxt composable. Used to highlight current route.
 *
 */
</script>

<template>
  <ul class="text-inherit">
    <!-- Render top-level links -->
    <li
      v-for="section in routes"
      :key="section.title"
    >
      <nav-link :to="section.url">
        {{ section.title }}
      </nav-link>

      <!-- Render sub-routes -->
      <ul
        v-if="section.subroutes"
        v-show="crumbs?.[0]?.title === section.title"
        class="bg-slate-800/30 py-2"
      >
        <li
          v-for="subroute in section.subroutes"
          :key="subroute.title"
        >
          <nav-link
            :to="`${subroute.url}`"
            :indentation-level="1"
          >
            {{ subroute.title }}
          </nav-link>

          <!-- Render sub-sub routes (and no deeper) -->
          <ul>
            <li
              v-for="subSubroute in subroute.subroutes"
              :key="subSubroute.title"
            >
              <nav-link
                :to="`${subSubroute.url}`"
                :indentation-level="2"
              >
                {{ subSubroute.title }}
              </nav-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
const { data: classes } = useFindMany(API_ENDPOINTS.classes, {
  fields: ['name', 'key', 'subclass_of'].join(),
});

const crumbs = useBreadcrumbs();

// Conditionally generates additional links to base- and sub- classes
const classSubroutes = computed(() => {
  if (!classes?.value) return;
  // only generate subroutes if we are on a child route of '/classes'
  if (crumbs.value?.[0]?.title !== 'Classes') return;

  // split classes into base- and sub-classes
  const [baseClasses, subClasses] = classes.value.reduce(
    (acc, val) => {
      if (!val['subclass_of']) return [[...acc[0], val], [...acc[1]]];
      else return [[...acc[0]], [...acc[1], val]];
    },
    [[], []],
  );

  // generate subroutes to other base-classes
  const output = baseClasses.map((item) => {
    return { title: item.name, url: `/classes/${item.key}` };
  });

  // if we are on a sub-route of a base-class, get other sub-class routes
  if (crumbs.value.length >= 2) {
    const baseClass = crumbs.value[1];
    const subClassesForClass = subClasses
      .filter(item => item?.['subclass_of']?.includes(baseClass.src))
      .map((item) => {
        const url = `/classes/${baseClass.src}/${item.key}`;
        return { title: item.name, url };
      });
    output[output.findIndex(el => el.title === baseClass.title)].subroutes
      = subClassesForClass;
  }

  return output;
});

const routes = computed(() => [
  {
    title: 'Classes',
    url: '/classes',
    subroutes: classSubroutes.value,
  },
  {
    title: 'Races',
    url: '/races',
  },
  {
    title: 'Monsters',
    url: '/monsters',
  },
  {
    title: 'Magic Items',
    url: '/magic-items',
  },
  {
    title: 'Spells',
    url: '/spells',
  },
  {
    title: 'Backgrounds',
    url: '/backgrounds',
  },
  {
    title: 'Feats',
    url: '/feats',
  },
  {
    title: 'Equipment',
    url: '/equipment',
  },
  {
    title: 'Conditions',
    url: '/conditions',
  },
  {
    title: 'Rules',
    url: '/rules',
  },
  {
    title: 'API Docs',
    url: '/api-docs',
  },
]);
</script>
