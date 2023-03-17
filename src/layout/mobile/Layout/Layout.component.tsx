import { HeartOutline, SearchOutline, UserCircleOutline, UserOutline } from 'antd-mobile-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { UserKind } from '../../../api/graphql.types';
import BottomMenu from '../../../components/BottomMenu';
import BottomPanel, { useBottomPanel } from '../../../lib/BottomPanel';
import { routes } from '../../../navigation/routes';
import { useAuth } from '../../../providers/AuthProvider';
import styles from './Layout.module.scss';

export enum BottomPanels {
  NOTHING = 'nothing', // We need this when we want to hide bottom menu all together
  BOTTOM_MENU = 'BottomMenu',
}

// type MenuItem = 'explore' | 'favorites' | 'login';

// const defineMenuItem = (): MenuItem => {
//   const { href } = window.location;
//   if (href.includes(routes.favorites()._)) return 'favorites';
//   if (href.includes(routes.login()._)) return 'login';
//   return 'explore';
// };

const BottomMenuItemExplore = () => {
  const [t] = useTranslation('common');
  const location = useLocation();

  return (
    <BottomMenu.Item
      to={routes.explore()._}
      icon={<SearchOutline />}
      label={t('generic.explore')}
      active={location.pathname.includes(routes.explore()._)}
    />
  );
};

const BottomMenuItemFavorites = () => {
  const [t] = useTranslation('common');
  const location = useLocation();

  return (
    <BottomMenu.Item
      to={routes.favorites()._}
      icon={<HeartOutline />}
      label={t('generic.favorites')}
      active={location.pathname.includes(routes.favorites()._)}
    />
  );
};

const BottomMenuItemLogin = () => {
  const [t] = useTranslation('common');
  const location = useLocation();

  return (
    <BottomMenu.Item
      to={routes.login()._}
      icon={<UserOutline />}
      label={t('generic.login')}
      active={location.pathname.includes(routes.login()._)}
    />
  );
};

const BottomMenuItemProfile = () => {
  const [t] = useTranslation('common');
  const location = useLocation();

  return (
    <BottomMenu.Item
      to={routes.profile()._}
      icon={<UserCircleOutline />}
      label={t('generic.profile')}
      active={location.pathname.includes(routes.profile()._)}
    />
  );
};

const AnounymousUserBottomMenu = () => {
  return (
    <BottomMenu className={styles.anonymousUserBottomMenu}>
      <BottomMenuItemExplore />
      <BottomMenuItemFavorites />
      <BottomMenuItemLogin />
    </BottomMenu>
  );
};

const RealUserBottomMenu = () => {
  return (
    <BottomMenu className={styles.anonymousUserBottomMenu}>
      <BottomMenuItemExplore />
      <BottomMenuItemFavorites />
      <BottomMenuItemProfile />
    </BottomMenu>
  );
};

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { actions } = useBottomPanel();

  React.useEffect(() => {
    if (location.pathname === '/') navigate(routes.explore()._);
  }, [location, navigate]);

  React.useEffect(() => {
    if (auth.isUserAnonymous()) {
      actions.replace(BottomPanels.BOTTOM_MENU, <AnounymousUserBottomMenu />);
      actions.render(BottomPanels.BOTTOM_MENU);
    }
  }, [actions, auth]);

  React.useEffect(() => {
    // if (user.kind === UserKind.Real) {
    if (auth.isUserReal()) {
      actions.replace(BottomPanels.BOTTOM_MENU, <RealUserBottomMenu />);
      actions.render(BottomPanels.BOTTOM_MENU);
    }
  }, [actions, auth]);

  return (
    <>
      <Outlet />

      <BottomPanel />
    </>
  );
};

export default Layout;
