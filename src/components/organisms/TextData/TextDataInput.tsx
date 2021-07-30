import React, { useRef, useEffect } from "react";

import Grid from "@/components/atoms/Grid";
import Text from "@/components/atoms/Text";

export interface TextDataInputProps {
  cursonWord: number;
  showDraft?: boolean;
  getValue?: (value: string) => void;
  onHandleKeyPress: (characterCode: number) => void;
  onToggleFocus: (isFocus: boolean) => void;
}

export const TextDataInput: React.FC<TextDataInputProps> = ({
  cursonWord,
  showDraft,
  getValue,
  onHandleKeyPress,
  onToggleFocus,
}) => {
  const ref: any = useRef(null);

  useEffect(() => {
    if (cursonWord) {
      ref.current.innerText = "";
    }
  }, [cursonWord]);

  const onHandleInput = (e: any) => {
    onHandleKeyPress(e.charCode);
    if (getValue && ref.current) {
      getValue(ref.current.innerText);
    }
  };

  return (
    <React.Fragment>
      {ref.current && showDraft && (
        <Grid
          className="absolute bottom-0 flex items-center justify-center w-full h-12 border-t"
          color="primary"
          bordered
        >
          <Text variant="headline-1">{ref.current.innerText}</Text>
        </Grid>
      )}
      <div
        ref={ref}
        contentEditable
        className={"overflow-hidden absolute inset-0 opacity-0"}
        onFocus={() => onToggleFocus(true)}
        onBlur={() => onToggleFocus(false)}
        onPaste={(e) => e.preventDefault()}
        onKeyPress={onHandleInput}
      />
    </React.Fragment>
  );
};

export default TextDataInput;
