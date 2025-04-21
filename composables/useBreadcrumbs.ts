import { computed } from 'vue';
import { useRoute } from 'vue-router';

type Breadcrumb = {
  url: string;
  title: string;
  subtitle: string;
  src: string;
};

export const useBreadcrumbs = () => {
  const route = useRoute();
  return computed(() => {
    let url = '';
    return (
      route.fullPath
        .split('/')
        .map((pathSegment) => {
          // ignore initial & trailing slashes
          if (pathSegment === '' || pathSegment === '/') return;

          // rebuild link urls segment by segment
          url += `/${pathSegment}`;

          // return a breadcrumb object
          return {
            ...generateTitles(pathSegment),
            url,
            src: pathSegment,
          } as Breadcrumb;
        })

        // remove null-ish crumbs
        .filter(breadcrumb => breadcrumb)
    );
  });
};

const generateTitles = (crumb: string) => {
  // if on the search route, make 'text' query param subtitle
  if (crumb.indexOf('?') > 0) {
    const [route, queryParams] = crumb.split('?');
    return {
      title: formatTitle(route),
      subtitle: queryParams.split('text=')[1].split('+').join(' '),
    };
  }
  // if viewing an API item, move source UID in URL to subtitle
  if (crumb.indexOf('_') > 0) {
    const [sourceKey, url] = crumb.split('_');
    return { title: formatTitle(url), subtitle: sourceKey.toUpperCase() };
  }

  // base-case: return crumb as title without subtitle
  return { title: formatTitle(crumb), subtitle: '' };
};

const formatTitle = (title: string) => {
  return title
    .split('-') // from kebab-case to Title Case
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .split('#')[0]; // remove hash-links from title
};
