interface UseSeoIndexProps {
  title: string
};

export function useSeoIndex(data: UseSeoIndexProps) {
  const { title } = data;
  const url = useRequestURL();

  useSeoMeta({
      title: `${title} | Open5e`,
      ogTitle: `${title} | Open5e`,
      ogUrl: url.href,
  });
}