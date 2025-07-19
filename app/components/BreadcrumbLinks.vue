<script>
/**
 * BreadcrumbLinks.vue - A breadcrumb navigation component that displays a hierarchical navigation path.
 *
 * -= PROPS (INPUTS) =-
 * @prop {Array} crumbs - An array of breadcrumb objects, each containing:
 *   @property {String} url - The URL target of the link
 *   @property {String} title - The title to display for the breadcrumb.
 *   @property {String} [subtitle] - Optional subtitle to display after title
 *     in parentheses.
 *
 * -= DEPENDENCIES =-
 * @component Icon – rendered the 'home' icon next to the link to site index
 * @composable useBreadcrumbs – generates breadcrumbs from the current URL
 */
</script>

<template>
  <nav
    class="flex h-min items-center dark:border-basalt"
    aria-label="breadcrumbs"
  >
    <ol class="space-x-1 text-xs font-semibold sm:space-x-3 lg:text-sm">
      <!-- Prepend Home Link to list -->
      <li
        class="inline-flex items-center align-middle text-gray-700 after:ml-1 after:text-blood after:content-['/'] last:after:content-[''] visited:text-gray-700 hover:text-red-700 dark:text-gray-200 dark:visited:text-gray-200 dark:hover:text-red-400 sm:after:ml-4"
      >
        <!-- On narrow screens, home breadcrumb serves as site brand -->
        <nuxt-link to="/">
          <span
            class="font-serif text-lg font-bold hover:text-red-700 dark:text-white dark:hover:text-red-200 sm:hidden"
          >
            Open5e
          </span>
          <span class="hidden align-middle uppercase sm:inline-flex">
            <Icon
              name="heroicons:home"
              class="mt-0.5 align-middle sm:mr-1"
            />
            Home
          </span>
        </nuxt-link>
      </li>

      <!-- Render Breadcrumbs -->
      <li
        v-for="crumb in crumbs"
        :key="crumb.url"
        class="inline-flex break-before-auto items-center align-middle uppercase text-gray-700 after:ml-1 after:text-blood after:content-['/'] last:after:content-[''] visited:text-gray-700 hover:text-red-700 dark:text-gray-200 dark:visited:text-gray-200 dark:hover:text-red-400 sm:after:ml-4"
      >
        <nuxt-link
          :to="crumb.url"
          class="align-middle"
        >
          <span>{{ crumb.title }}</span>
          <span
            v-if="crumb.subtitle"
            class="hidden font-thin text-granite sm:ml-2 sm:inline"
          >
            ({{ crumb.subtitle }})
          </span>
        </nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const crumbs = useBreadcrumbs();
</script>
