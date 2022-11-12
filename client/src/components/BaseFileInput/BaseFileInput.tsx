import React, { ReactNode, useCallback } from "react";
import { noop } from "lodash";
import cx from "classnames";
import b_ from "b_";

import "./BaseFileInput.scss";

const b = b_.with("base-file-input");

export enum BaseFileInputName {
  FIRST = "first",
  SECOND = "second",
}

export interface BaseFileInputProps {
  name: BaseFileInputName;
  label: ReactNode;
  disabled?: boolean;
  className?: string;
  onChange?: (name: BaseFileInputName, value: Blob) => void;
}

const BaseFileInput = (props: BaseFileInputProps) => {
  const { name, label, disabled, onChange = noop, className } = props;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(name, e.target.files?.[0]),
    [name, onChange]
  );

  return (
    <div className={cx(b("upload"), className)}>
      <label htmlFor={name} className={b("label")}>
        {label}
      </label>
      <input
        type="file"
        accept="application/pdf"
        id={name}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        className={b("input")}
        required
      />
      <button className={b("button")}>+</button>
    </div>
  );
};

export default BaseFileInput;
