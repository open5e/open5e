<template>
  <footer class="mt-2 grid w-full justify-center border-t-2 border-fireball bg-white py-2 text-center align-middle dark:bg-darkness dark:text-white ">
    <ul class="mb-2 flex justify-center gap-8">
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
    <p class="text-charcoal dark:text-smoke">Open5e</p>
   
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
