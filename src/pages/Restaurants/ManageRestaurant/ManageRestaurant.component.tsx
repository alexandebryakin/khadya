import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Page from '../../../layout/mobile/Page';
import { useAuth } from '../../../providers/AuthProvider';
import PageNotFound from '../../PageNotFound';
import { Section } from '../../Profile/Profile.component';
import GalleryForm from './components/GalleryForm';

const ManageRestaurant = () => {
  const [t] = useTranslation('common');
  const params = useParams();
  const auth = useAuth();

  const restaurant = auth.user.restaurants.find((r) => r.id === params.restaurantId);

  if (!restaurant) return <PageNotFound />;

  return (
    <div>
      <Page.TopPanel />

      <Page>
        <Page.Header>{restaurant.name}</Page.Header>

        <Section title={t('generic.images')}>
          <GalleryForm restaurantId={params.restaurantId || ''} />
        </Section>

        <Section title={t('generic.menu')}>
          <div>TODO: Handle menu</div>
        </Section>

        <Section title={t('generic.tables')}>
          <div>TODO: Handle tables</div>
        </Section>
      </Page>
    </div>
  );
};

export default ManageRestaurant;
