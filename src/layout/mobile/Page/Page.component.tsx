import cx from 'classnames';

import styles from './Page.module.scss';

const Page = ({ className, children, ...rest }: DivProps) => {
  return (
    <>
      <div {...rest} className={cx(styles.page, className)}>
        {children}
      </div>

      <div className={styles.bottomMobileMenuSafeArea}></div>
    </>
  );
};

export default Page;
