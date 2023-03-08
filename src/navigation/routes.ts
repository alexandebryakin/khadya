import { Config, Route, builder } from 'dromos';

const config: Config = {
  notation: 'snake_case',
};

type DromosRoutes = {
  explore: Route;
  favorites: Route;
  login: Route;
};

export const routes = builder.define<DromosRoutes>((root) => {
  root.define('explore');
  root.define('favorites');
  root.define('login');
}, config);

// export const isExplore = () => window.location.pathname.includes(routes.explore()._);
// export const isFavorites = () => window.location.pathname.includes(routes.favorites()._);
// export const isLogin = () => window.location.pathname.includes(routes.login()._);
