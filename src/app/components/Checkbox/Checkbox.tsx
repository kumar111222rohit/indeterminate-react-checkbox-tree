import classnames from "classnames";
import styles from "./checkbox.module.scss";

type CheckboxProps = {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onClick?: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ isChecked = false, isIndeterminate = false, onClick = () => {} }) => {
  return (
    <span
      className={classnames(styles.checkbox, {
        [styles.isIndeterminate]: isIndeterminate,
        [styles.isChecked]: isChecked,
      })}
      onClick={onClick}
      data-testid="checkbox"
    />
  );
};

export default Checkbox;
