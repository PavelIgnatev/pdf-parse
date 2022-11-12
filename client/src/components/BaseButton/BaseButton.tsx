import React from "react";
import { noop } from "lodash";
import cx from "classnames";
import b_ from "b_";

import "./BaseButton.scss";

const b = b_.with("base-button");

export interface BaseButtonProps {
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BaseButton = (props: BaseButtonProps) => {
  const { disabled, children, className, onClick = noop } = props;

  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={cx(b(), className)}
    >
      {children}
    </button>
  );
};

export default BaseButton;
