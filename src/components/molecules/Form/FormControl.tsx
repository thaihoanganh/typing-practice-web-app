import React, { isValidElement, cloneElement } from "react";

import Text from "@/components/atoms/Text";

export interface FormControlProps {
  label?: string;
  errorMessage?: string;
}

export const FormControl: React.FC<FormControlProps> = ({ children, errorMessage, label }) => {
  return (
    <div>
      <div className="h-7">
        <Text variant="subtitle-1">{label}</Text>
      </div>
      <div>
        {isValidElement(children) &&
          cloneElement(children, {
            isError: Boolean(errorMessage),
          })}
      </div>
      <div className="h-4">
        <Text as="p" variant="caption" color="danger">
          {errorMessage}
        </Text>
      </div>
    </div>
  );
};

export default FormControl;
