import cx from 'classnames';

import { useBottomPanel } from '../../../lib/BottomPanel';
import styles from './Page.module.scss';

const Page = ({ className, children, ...rest }: DivProps) => {
  const { outlets } = useBottomPanel();

  return (
    <>
      <div {...rest} className={cx(styles.page, className)}>
        {children}
      </div>

      {outlets.current && <div className={styles.bottomMobileMenuSafeArea}></div>}
    </>
  );
};

Page.Header = ({ className, ...props }: DivProps) => {
  return <div {...props} className={cx(styles.header, className)} />;
};

export default Page;
