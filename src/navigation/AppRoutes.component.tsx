import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../layout/mobile/Layout';
import Page from '../layout/mobile/Page/Page.component';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import PersonalInfo from '../pages/Profile/PersonalInfo';
import Protected from './Protected.component';
import { routes } from './routes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={routes.explore()._} element={<Page>TODO: Explore</Page>} />
          <Route path={routes.favorites()._} element={<Page>TODO: Favorites</Page>} />
          <Route
            path={routes.profile()._}
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path={routes.profile().personalInfo()._}
            element={
              <Protected>
                <PersonalInfo />
              </Protected>
            }
          />
          <Route path={routes.login()._} element={<Auth />} />
          <Route path="*" element={<Navigate to={routes.explore()._} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
