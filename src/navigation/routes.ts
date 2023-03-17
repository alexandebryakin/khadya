import { Config, Route, Subroute, builder } from 'dromos';

const config: Config = {
  notation: 'snake_case',
};

type DromosRoutes = {
  explore: Route;
  favorites: Route;
  login: Route;
  profile: Subroute<{
    personalInfo: Route;
  }>;
};

export const routes = builder.define<DromosRoutes>((root) => {
  root.define('explore');
  root.define('favorites');
  root.define('login');
  root.define('profile').subroutes((profile) => {
    profile.define('personalInfo');
  });
}, config);

// export const isExplore = () => window.location.pathname.includes(routes.explore()._);
// export const isFavorites = () => window.location.pathname.includes(routes.favorites()._);
// export const isLogin = () => window.location.pathname.includes(routes.login()._);
