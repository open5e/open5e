import { computed } from 'vue';
import { useRoute } from 'vue-router';

type Breadcrumb = {
  url: string;
  title: string;
  subtitle: string;
};

export const useBreadcrumbs = () => {
  const route = useRoute();
  return computed(() => {
    let url = '';
    return (
      route.fullPath
        .split('/')
        .map((segment) => {
          // ignore initial & trailing slashes
          if (segment === '' || segment === '/') {
            return;
          }
          // rebuild link urls segment by segment
          url += `/${segment}`;

          // return a breadcrumb object
          return {
            ...generateTitle(segment),
            url,
          } as Breadcrumb;
        })

        // remove null-ish crumbs
        .filter((breadcrumb) => breadcrumb)
    );
  });
};

const generateTitle = (crumb: string) => {
  // if on the search route, make 'text' query param subtitle
  if (crumb.indexOf('?') > 0) {
    const [route, queryParams] = crumb.split('?');
    const title = route.split('-').join(' ');
    const subtitle = queryParams.split('text=')[1].split('+').join(' ');
    return { title, subtitle };
  }
  // if viewing an API item, move source UID in URL to subtitle
  if (crumb.indexOf('_') > 0) {
    const [sourceKey, url] = crumb.split('_');
    const title = url.split('-').join(' ');
    const subtitle = sourceKey.toUpperCase();
    return { title, subtitle };
  }

  // base-case: return crumb as title without subtitle
  return { title: crumb.split('-').join(' '), subtitle: '' };
};
