<script>
/**
 * 
 * AppFooter.vue: UI component containing the website footer. Contains social
 *   media links, and a link to the `/legal` route. Designed to be used in a
 *   layout component.
 */
</script>

<template>
  <footer class="grid w-full justify-center bg-white py-2 text-center align-middle dark:bg-darkness dark:text-white ">
    <!-- Social Media links -->
    <ul class="my-2 flex justify-center gap-8">
      <li v-for="{ name, url, icon } in socialMediaLinks" :key="name">
        <a :href="url" :title="name">
          <img 
            v-if="icon"
            :src="icon"
            class="size-8 rounded-full border-granite bg-black p-[.35rem] transition-colors hover:bg-granite dark:border dark:bg-charcoal dark:hover:bg-granite"
          />
          <span class="sr-only">{{ name }}</span>
        </a>
      </li>
    </ul>
    <NuxtLink
      to="/legal"
      class="font-bold hover:underline"
      title="Legal"
    >
      Legal
    </NuxtLink>
    <p class="font-serif text-sm">Open5e</p>
   
  </footer>
</template>

<script setup>

const socialMediaLinks = [
  {
    name: 'Discord',
    url: 'https://discord.com/invite/QXqF6gSVqB',
    icon: '/icons/discord-mark.svg',
  },
  {
    name: 'Github',
    url: 'https://www.github.com/open5e',
    icon: '/icons/github-mark.svg'
  },
  {
    name: 'Patreon',
    url: 'https://www.patreon.com/open5e',
    icon: '/icons/patreon-mark.svg'
  }
];
</script>
