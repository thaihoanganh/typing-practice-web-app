import React, { useRef, useEffect } from "react";
import classNames from "classnames";

import Grid from "@/components/atoms/Grid";
import Text from "@/components/atoms/Text";

export interface TextDataProps {
  autoScroll?: boolean;
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
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null);

  useEffect(() => {}, [cursonWord]);

  return (
    <div className="absolute w-full h-full p-sm" ref={ref}>
      {data.map((word, indexWord) => (
        <Grid key={indexWord} className="inline-flex mx-xs border-primary dark:border-primary-dark">
          {word.map((character, indexCharacter) => (
            <Text
              key={indexCharacter}
              className={classNames("character font-semibold", isReady && character.isCurson && "character-curson")}
              as="span"
              variant="headline-2"
              color={character.typedAt ? (character.isIncorrect ? "danger" : "primary") : "disabled"}
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
