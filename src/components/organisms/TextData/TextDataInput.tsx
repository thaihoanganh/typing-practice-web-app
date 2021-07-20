import React from "react";
import classNames from "classnames";

import Grid from "@/components/atoms/Grid";

export interface TextDataInputProps {
  showDraft?: boolean;
  onHandleKeyPress: (characterCode: number) => void;
  onToggleFocus: (isFocus: boolean) => void;
}

export const TextDataInput: React.FC<TextDataInputProps> = ({ showDraft, onHandleKeyPress, onToggleFocus }) => {
  return (
    <label className="absolute flex items-end w-full h-full cursor-text">
      <Grid className={classNames("w-full py-sm bg-primary text-center", showDraft && "border-t")} bordered>
        <input
          type="text"
          className={classNames("focus:outline-none text-center text-headline-2", !showDraft && "opacity-0")}
          onFocus={() => onToggleFocus(true)}
          onBlur={() => onToggleFocus(false)}
          onKeyPress={(event) => onHandleKeyPress(event.charCode)}
        />
      </Grid>
    </label>
  );
};

export default TextDataInput;
