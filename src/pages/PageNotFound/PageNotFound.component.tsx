import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGoBack } from '../../hooks/useGoBack';
import Page from '../../layout/mobile/Page';
import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
  const [t] = useTranslation('common');

  const goBack = useGoBack();

  return (
    <Page>
      <div className={styles.notFoundHttpCode}>404</div>

      <div className={styles.ooops}>{t('pageNotFound.ooops')}</div>

      <div className={styles.pageNotFound}>{t('pageNotFound.pageNotFound')}</div>

      <div className={styles.explanation}>{t('pageNotFound.explanation')}</div>

      <Button className={styles.backButton} type="primary" shape="round" onClick={goBack}>
        {t('pageNotFound.goBack')}
      </Button>
    </Page>
  );
};

export default PageNotFound;
