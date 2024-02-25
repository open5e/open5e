<script setup lang="ts">
// Register middleware with page metadata
definePageMeta({
  middleware: [
    function (to) {
      return navigateTo(`/monsters/${to.params.id}?mode=compact`, {
        replace: true,
        redirectCode: 301,
      });
    },
  ],
});
</script>
