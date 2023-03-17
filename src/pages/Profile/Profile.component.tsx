import { Button } from 'antd';
import { EditSOutline, UserCircleOutline } from 'antd-mobile-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Page from '../../layout/mobile/Page';
import { routes } from '../../navigation/routes';
import { useAuth } from '../../providers/AuthProvider';
import styles from './Profile.module.scss';

const Profile = () => {
  const [t] = useTranslation('common');

  const auth = useAuth();

  return (
    <Page>
      <Page.Header>{t('generic.profile')}</Page.Header>

      <div className={styles.genericAccountInfo}>
        <UserCircleOutline className={styles.userIcon} />

        <div className={styles.nameContainer}>
          <div className={styles.firstName}>
            {auth.user.firstName ? `${auth.user.firstName} ${auth.user.lastName}` : t('profile.nameNotSpecified')}
          </div>

          <Link to={routes.profile().personalInfo()._}>
            <Button type="link" className={styles.specifyButton}>
              <EditSOutline />

              <span className={styles.specifyLabel}>
                {auth.user.firstName ? t('generic.edit') : t('generic.specify')}
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <Button block size="large" className={styles.logoutButton} onClick={auth.logout}>
        {t('generic.logout')}
      </Button>
    </Page>
  );
};

export default Profile;
