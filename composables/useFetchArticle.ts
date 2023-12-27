type useFetchArticleProps = {
  slug: string;
  category: string;
};

export const useFetchArticle = async (options: useFetchArticleProps) => {
  const { slug, category } = options;
  const { apiUrl } = useRuntimeConfig().public;
  const endpoint = `${apiUrl}/${category}/${slug}/`;
  return await $fetch(endpoint);
};
