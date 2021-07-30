import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";

import Grid from "@/components/atoms/Grid";
import Text from "@/components/atoms/Text";

import classes from "./style.module.css";

export interface TextDataProps {
  cursonWord: number;
  isReady: boolean;
  data: {
    characterCode: number;
    isCurson: boolean;
    isIncorrect: boolean;
    typedAt: null | number;
  }[][];
}

export const TextData: React.FC<TextDataProps> = ({ cursonWord, isReady, data }) => {
  const ref: any = useRef(null);
  const [state, setState] = useState({
    styleTop: 0,
  });

  useEffect(() => {
    if (data.length && ref.current) {
      if (cursonWord === 0) {
        ref.current.style.top = "0px";
        setState((prevState) => ({
          ...prevState,
          styleTop: 0,
        }));
      }
      if (ref.current.scrollHeight > 200) {
        if (
          ref.current.childNodes[cursonWord].offsetTop > state.styleTop + 36 &&
          ref.current.scrollHeight - state.styleTop > 122
        ) {
          ref.current.style.top = `-${state.styleTop}px`;
          setState((prevState) => ({
            ...prevState,
            styleTop: prevState.styleTop + 36,
          }));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursonWord, data]);

  return (
    <div className="absolute w-full h-full p-sm duration-100" ref={ref}>
      {data.map((word, indexWord) => (
        <Grid key={indexWord} className="inline-flex border-primary">
          {word.map((character, indexCharacter) => (
            <Text
              key={indexCharacter}
              className={classNames(
                "font-semibold",
                classes["character"],
                character.characterCode === 32 && "w-md",
                isReady && character.isCurson && classes["character-curson"],
                character.isIncorrect && "rounded bg-accent bg-opacity-32"
              )}
              as="span"
              variant="headline-2"
              color={character.typedAt ? "primary" : "disabled"}
            >
              {String.fromCharCode(character.characterCode)}
            </Text>
          ))}
        </Grid>
      ))}
    </div>
  );
};

export default TextData;
