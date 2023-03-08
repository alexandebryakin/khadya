import { HeartOutline, SearchOutline, UserOutline } from 'antd-mobile-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import BottomMenu from '../../../components/BottomMenu';
import BottomPanel, { useBottomPanel } from '../../../lib/BottomPanel';
import { routes } from '../../../navigation/routes';
import styles from './Layout.module.scss';

export enum BottomPanels {
  BOTTOM_MENU = 'BottomMenu',
}

type MenuItem = 'explore' | 'favorites' | 'login';

const defineDefault = (): MenuItem => {
  const { href } = window.location;
  if (href.includes(routes.favorites()._)) return 'favorites';
  if (href.includes(routes.login()._)) return 'login';
  return 'explore';
};

const NotRegisteredUserBottomMenu = () => {
  const [t] = useTranslation('common');
  const [active, setActive] = React.useState<MenuItem>(defineDefault());

  return (
    <BottomMenu className={styles.notRegisteredUserBottomMenu}>
      <BottomMenu.Item
        to={routes.explore()._}
        icon={<SearchOutline />}
        label={t('generic.explore')}
        active={active === 'explore'}
        onClick={() => setActive('explore')}
      />
      <BottomMenu.Item
        to={routes.favorites()._}
        icon={<HeartOutline />}
        label={t('generic.favorites')}
        active={active === 'favorites'}
        onClick={() => setActive('favorites')}
      />
      <BottomMenu.Item
        to={routes.login()._}
        icon={<UserOutline />}
        label={t('generic.login')}
        active={active === 'login'}
        onClick={() => setActive('login')}
      />
    </BottomMenu>
  );
};

const Layout = () => {
  const [t] = useTranslation('common');

  const { actions } = useBottomPanel();

  React.useEffect(() => {
    actions.replace(BottomPanels.BOTTOM_MENU, <NotRegisteredUserBottomMenu />);
    actions.render(BottomPanels.BOTTOM_MENU);
  }, [actions, t]);

  return (
    <>
      <Outlet />

      <BottomPanel />
    </>
  );
};

export default Layout;
