import cx from 'classnames';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import styles from './BottomMenu.module.scss';

const BottomMenu = ({ className, ...props }: DivProps) => {
  return <div {...props} className={cx(styles.container, className)} />;
};

interface BottomMenuItemProps extends LinkProps {
  icon: React.ReactNode;
  label?: React.ReactNode;
  active: boolean;
}
const BottomMenuItem = ({
  icon,
  label,
  active,

  className,
  ...rest
}: BottomMenuItemProps) => {
  return (
    <Link {...rest} className={cx(styles.item, className)}>
      <div className={cx(styles.icon, active && styles.iconActive)}>{icon}</div>

      <div className={cx(styles.label, active && styles.labelActive)}>{label}</div>
    </Link>
  );
};

BottomMenu.Item = BottomMenuItem;

export default BottomMenu;
