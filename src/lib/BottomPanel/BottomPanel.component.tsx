import cx from 'classnames';

import { useBottomPanel } from './BottomPanel.context';
import styles from './BottomPanel.module.scss';

const BottomPanel = () => {
  const { outlets } = useBottomPanel();

  return <div className={styles.container}>{outlets.current?.element}</div>;
};

BottomPanel.Padded = ({ className, ...props }: DivProps) => {
  return <div {...props} className={cx(styles.padded, className)} />;
};

export default BottomPanel;
