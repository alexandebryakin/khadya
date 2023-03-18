import { LeftOutline } from 'antd-mobile-icons';

import { useGoBack } from '../../../../hooks/useGoBack';
import styles from './TopPanel.module.scss';

const TopPanel = () => {
  const goBack = useGoBack();

  return (
    <div className={styles.topPanel}>
      <div className={styles.backButton} onClick={goBack}>
        <LeftOutline />
      </div>
    </div>
  );
};

export default TopPanel;
