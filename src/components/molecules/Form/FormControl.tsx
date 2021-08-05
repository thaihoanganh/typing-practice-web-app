import React, { cloneElement, isValidElement } from "react";
import classNames from "classnames";

export interface FormControlProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string;
  errorMessage?: string;
}

export const FormControl: React.FC<FormControlProps> = ({
  className,
  children,
  errorMessage,
  label,
  ...otherProps
}) => {
  return (
    <div className={classNames("inline-flex flex-col", className)} {...otherProps}>
      <span className="text-contrast-secondary">{label}&#160;</span>
      {isValidElement(children) &&
        cloneElement(children, {
          className: errorMessage ? "border-danger" : null,
        })}
      <span className="text-caption text-danger">{errorMessage}&#160;</span>
    </div>
  );
};

export default FormControl;
