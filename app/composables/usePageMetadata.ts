type usePageMetadataProps = {
  title?: MaybeRef<string | undefined>;
}

let isInitialized = false;

const formatTitle = (title: string) => `${title} | Open5e`;

export const usePageMetadata = (props: usePageMetadataProps = {}) => {
  const { title } = props;
  const pageTitle = useState<string | undefined>('pageTitle', () => undefined);
  const router = useRouter();
  
  // reset page title when the route changes
  if (!isInitialized) {
    router.afterEach(() => {
      pageTitle.value = undefined;
      useHead({ title: 'Open5e' });
    });
    isInitialized = true;
  }
  
  // watch the title, updated metadata if it changes
  if (title) {
    watchEffect(() => {
      const titleValue = unref(title);
      if (!titleValue) return;
      pageTitle.value = titleValue;
      useHead({ title: formatTitle(titleValue) });
    });
  }
  
  // return the title in case we want to use it in a template
  return { pageTitle };
};

export const usePageTitle = () => {
  return useState<string | undefined>('pageTitle', () => undefined);
};