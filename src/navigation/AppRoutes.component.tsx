import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../layout/mobile/Layout';
import Page from '../layout/mobile/Page/Page.component';
import Auth from '../pages/Auth';
import { routes } from './routes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={routes.explore()._} element={<Page>TODO: Explore</Page>} />
          <Route path={routes.favorites()._} element={<div>TODO: Favorites</div>} />
          <Route path={routes.login()._} element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
