import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import classNames from "classnames";

import classes from "./style.module.css";

export interface TextDataProps {
  data: {
    characters: string;
    isIncorrect: boolean;
    typedAt: null | number;
  }[][];
  isCheckAfterWord: boolean;
  isCompleted: boolean;
  isReady: boolean;
  wordCursor: number;
  charactersCursor: number;
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
    charactersHeight: 32,
  });

  useLayoutEffect(() => {
    if (textDataElement.current && textDataElement.current.firstChild) {
      setState((prevState) => ({
        ...prevState,
        charactersHeight: textDataElement.current.firstChild.scrollHeight,
      }));
    }
  }, []);

  useEffect(() => {
    if (textDataElement.current && textDataElement.current.childNodes[wordCursor]) {
      const { offsetTop } = textDataElement.current.childNodes[wordCursor];
      if (offsetTop > state.charactersHeight) {
        textDataElement.current.style.top = -offsetTop + state.charactersHeight + "px";
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
          style={{ width: 2, height: state.charactersHeight }}
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
            {word.map((characters, charactersIndex) => (
              <div
                key={charactersIndex}
                className={classNames(
                  "text-contrast-secondary text-opacity-48",
                  characters.typedAt &&
                    (characters.isIncorrect ? "text-danger text-opacity-100" : "text-opacity-100")
                )}
              >
                {String(characters.characters)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextData;
