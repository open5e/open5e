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
  <ul class="text-inherit text-white">
    <li v-for="section in routes" :key="section.title">
      <nav-link :to="section.route">
        {{ section.title }}
      </nav-link>
      <ul
        v-if="section.subroutes"
        v-show="path.indexOf(section.route) != -1"
        class="bg-slate-800/30 py-2"
      >
        <li v-for="page in section.subroutes" :key="page.key">
          <nav-link :to="`${section.route}/${page.key}`" :indent="true">
            {{ page.name }}
          </nav-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from 'nuxt/app';
const { path } = useRoute();

const { data: classes } = useFindMany(API_ENDPOINTS.classes, {
  fields: ['name', 'key'].join(),
  is_subclass: false,
});

const routes = computed(() => [
  {
    title: 'Classes',
    route: '/classes',
    subroutes: classes.value ?? [],
  },
  {
    title: 'Races',
    route: '/races',
  },
  {
    title: 'Monsters',
    route: '/monsters',
  },
  {
    title: 'Magic Items',
    route: '/magic-items',
  },
  {
    title: 'Spells',
    route: '/spells',
  },
  {
    title: 'Backgrounds',
    route: '/backgrounds',
  },
  {
    title: 'Feats',
    route: '/feats',
  },
  {
    title: 'Equipment',
    route: '/equipment',
  },
  {
    title: 'Conditions',
    route: '/conditions',
  },
  {
    title: 'Rules',
    route: '/rules',
  },
  {
    title: 'API Docs',
    route: '/api-docs',
  },
]);
</script>
