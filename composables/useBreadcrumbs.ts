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

          // seperate segment title & query params
          const [title, queryParams] = segment.split('?');

          // extract & format the search params if on the /search route
          let searchParam = '';
          if (title === 'search' && queryParams) {
            searchParam = queryParams.split('text=')[1].split('+').join(' ');
          }

          // return a breadcrumb object
          return {
            url,
            title: title
              .split(/[-_]/)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            subtitle: searchParam,
          } as Breadcrumb;
        })

        // remove null-ish crumbs
        .filter((breadcrumb) => breadcrumb)
    );
  });
};
