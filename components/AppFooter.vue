<template>
  <footer class="mt-2 w-full border-t-2 border-fireball bg-white py-2 text-center align-middle dark:bg-darkness dark:text-white ">
    <ul class="flex justify-center gap-4">
      <li v-for="{ name, url } in socialMediaLinks" :key="name">
        <a :href="url" :title="name">
          {{ name }}
          <!-- <span class="sr-only">{{ name }}</span> -->
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
    <p class="text-charcoal dark:text-smoke">Open5e</p>
   
  </footer>
</template>

<script setup>

const socialMediaLinks = [
  {
    name: 'Discord',
    url: 'https://discord.com/invite/QXqF6gSVqB',
  },
  {
    name: 'Github',
    url: 'https://www.github.com/open5e',
  },
  {
    name: 'Patreon',
    url: 'https://www.patreon.com/open5e',
  }
];
</script>
