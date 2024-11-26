<script setup lang="ts">
// Register middleware with page metadata
definePageMeta({
  middleware: [
    function (to) {
      return navigateTo(
        {
          path: `/monsters/${to.params.id}`,
          query: {
            mode: 'compact',
          },
        },
        {
          replace: true,
          redirectCode: 301,
        },
      );
    },
  ],
});
</script>
