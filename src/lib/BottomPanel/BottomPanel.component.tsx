import styles from "./BottomPanel.module.scss";

import cx from "classnames";
import { useBottomPanel } from "./BottomPanel.context";

const BottomPanel = () => {
  const { outlets } = useBottomPanel();

  // if(!outlets.current) return null;

  return (
    <div className={styles.container}>
      {outlets.current?.element}
      {/* <BottomPanel.Padded>TODO:</BottomPanel.Padded> */}
    </div>
  );
};

BottomPanel.Padded = ({ className, ...props }: DivProps) => {
  return <div {...props} className={cx(styles.padded, className)} />;
};

export default BottomPanel;
