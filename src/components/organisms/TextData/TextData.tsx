import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import classNames from "classnames";

import classes from "./style.module.css";

export interface TextDataProps {
  data: {
    character: string;
    isIncorrect: boolean;
    typedAt: null | number;
  }[][];
  isCheckAfterWord: boolean;
  isCompleted: boolean;
  isReady: boolean;
  wordCursor: number;
  characterCursor: number;
}

export const TextData: React.FC<TextDataProps> = ({
  data,
  isCheckAfterWord,
  isCompleted,
  wordCursor,
}) => {
  const textDataElement: any = useRef(null);
  const cursorElement: any = useRef(null);

  const [state, setState] = useState({
    characterHeight: 32,
  });

  useLayoutEffect(() => {
    if (textDataElement.current && textDataElement.current.firstChild) {
      setState((prevState) => ({
        ...prevState,
        characterHeight: textDataElement.current.firstChild.scrollHeight,
      }));
    }
  }, []);

  useEffect(() => {
    if (textDataElement.current && textDataElement.current.childNodes[wordCursor]) {
      const { offsetTop } = textDataElement.current.childNodes[wordCursor];
      if (offsetTop > state.characterHeight) {
        textDataElement.current.style.top = -offsetTop + state.characterHeight + "px";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordCursor]);

  useEffect(() => {
    if (isCompleted && textDataElement.current) {
      textDataElement.current.style.top = "0px";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  return (
    <div
      className={classNames(
        "overflow-hidden relative h-full",
        isCompleted && "overflow-y-auto no-scrollbar"
      )}
    >
      {!isCheckAfterWord && (
        <div
          style={{ width: 2, height: state.characterHeight }}
          className="fixed rounded-sm bg-contrast-secondary duration-150"
          ref={cursorElement}
        />
      )}
      <div className="absolute flex flex-wrap duration-150" ref={textDataElement}>
        {data.map((word, wordIndex) => (
          <div
            key={wordIndex}
            className={classNames(
              "flex flex-wrap duration-300",
              classes["text-data-word"],
              !isCompleted &&
                wordCursor === wordIndex &&
                isCheckAfterWord &&
                "bg-contrast-secondary bg-opacity-12"
            )}
          >
            {word.map((character, characterIndex) => (
              <div
                key={characterIndex}
                className={classNames(
                  "text-contrast-secondary text-opacity-48",
                  character.typedAt &&
                    (character.isIncorrect ? "text-danger text-opacity-100" : "text-opacity-100")
                )}
              >
                {String(character.character)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextData;
