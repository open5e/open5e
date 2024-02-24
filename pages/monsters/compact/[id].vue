<script setup lang="ts">
definePageMeta({
  middleware: defineNuxtRouteMiddleware((to) => {
    navigateTo(`/monsters/${to.params.id}`, {
      replace: true,
      redirectCode: 301,
    });
  }),
});
</script>
