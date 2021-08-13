import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";

import classes from "./style.module.css";

export interface TextDataInputProps {
  isShowDraft?: boolean;
  wordCursor?: number;
  onToggleFocus: (isFocus: boolean) => void;
  onHandleTypingWord?: (word: string, isNextWord: boolean, typingTime: number[]) => void;
}

export const TextDataInput: React.FC<TextDataInputProps> = ({
  isShowDraft,
  wordCursor,
  onToggleFocus,
  onHandleTypingWord,
}) => {
  const textDataInputElement: any = useRef(null);
  const [state, setState] = useState({
    isFocus: false,
    typingTime: [],
  });

  useEffect(() => {
    if (wordCursor && state.isFocus && textDataInputElement.current) {
      textDataInputElement.current.innerText = "";
      if (onHandleTypingWord) {
        setState((prevState) => ({ ...prevState, typingTime: [] }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordCursor]);

  const onHandleFocus = () => {
    onToggleFocus(true);
    setState((prevState) => ({ ...prevState, isFocus: true }));
    if (textDataInputElement.current) {
      textDataInputElement.current.innerText = "";
    }
  };

  const onHandleBlur = () => {
    onToggleFocus(true);
    setState((prevState) => ({ ...prevState, isFocus: false }));
    if (textDataInputElement.current) {
      textDataInputElement.current.innerText = "Nhấn vào đây để gõ";
    }
  };

  const onHandleInput = (e: any) => {
    if (onHandleTypingWord) {
      const typedAt = new Date().getTime();
      setState((prevState: any) => ({
        ...prevState,
        typingTime: [...prevState.typingTime, typedAt],
      }));
      onHandleTypingWord(
        textDataInputElement.current.innerText,
        e.nativeEvent.data === " ",
        state.typingTime
      );
    }
  };

  return (
    <div className="absolute inset-0 flex items-end">
      <div
        className={classNames(
          "overflow-hidden w-full h-full focus:outline-none text-contrast-secondary",
          state.isFocus
            ? isShowDraft
              ? `${classes["text-data-input-draft"]} bg-secondary border-t border-contrast-secondary border-opacity-12`
              : "opacity-0"
            : "flex items-end justify-center p-md bg-secondary bg-opacity-60 backdrop-filter backdrop-blur-sm"
        )}
        contentEditable
        suppressContentEditableWarning
        onFocus={onHandleFocus}
        onBlur={onHandleBlur}
        onInput={onHandleInput}
        ref={textDataInputElement}
      >
        Nhấn vào đây để gõ
      </div>
    </div>
  );
};

export default TextDataInput;
