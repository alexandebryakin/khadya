import { Button } from 'antd';
import { Divider } from 'antd-mobile';
import { AddOutline, EditSOutline, QuestionCircleOutline, UserCircleOutline } from 'antd-mobile-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Page from '../../layout/mobile/Page';
import { routes } from '../../navigation/routes';
import { useAuth } from '../../providers/AuthProvider';
import styles from './Profile.module.scss';

const GenericAccountInfo = () => {
  const [t] = useTranslation('common');
  const auth = useAuth();

  return (
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
  );
};

// const Separator = () => <div className={styles.se}/>

interface SectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <>
      <Divider contentPosition="left">{title}</Divider>

      <div className={styles.sectionContent}>{children}</div>
    </>
  );
};

const Profile = () => {
  const [t] = useTranslation('common');

  const auth = useAuth();

  const isOwner = auth.user.restaurants.length > 0;

  return (
    <Page>
      <Page.Header>{t('generic.profile')}</Page.Header>

      <GenericAccountInfo />

      <Section title="(TODO) Manage Your Diet">
        <div>Manage Diet...</div>
      </Section>

      <Section title="(TODO) Manage Payment Method">
        <div>Manage Payment Method...</div>
      </Section>

      <Section title={isOwner ? t('profile.manageYourRestaurants') : t('profile.bacomeAnOwner')}>
        {!isOwner && (
          <div>
            <div className={styles.becomeAnOwnerDescriptionWrapper}>
              <QuestionCircleOutline className={styles.questionIcon} />

              <div className={styles.becomeAnOwnerDescription}>
                Create restaurants, manage menus, track audience, and more...
              </div>
            </div>

            <Link to={routes.restaurants().new()._}>
              <Button type="primary" className={styles.enrollButton}>
                {t('profile.enroll')}
              </Button>
            </Link>
          </div>
        )}

        {isOwner && (
          <div>
            <div>
              <h3>{t('restaurants.myRestaurants')}</h3>

              <div className={styles.restaurantsList}>
                {auth.user.restaurants.map((r) => {
                  return (
                    <div key={r.id} className={styles.restaurant}>
                      {r.name} <Link to={routes.manage().restaurants(r.id)._}>{' (edit)'}</Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link to={routes.restaurants().new()._}>
              <Button type="primary" className={styles.addButton}>
                <AddOutline />

                <span className={styles.add}>{t('generic.add')}</span>
              </Button>
            </Link>
          </div>
        )}
      </Section>

      <Button block size="large" className={styles.logoutButton} onClick={auth.logout}>
        {t('generic.logout')}
      </Button>
    </Page>
  );
};

export default Profile;
