import { useContext } from "react";
import { Howl, Howler } from "howler";
import { PracticeContext } from ".";

const soundTyping = new Howl({
  src: ["/sounds/typing.mp3"],
  volume: 1,
});

const soundTypingIncorrect = new Howl({
  src: ["/sounds/typingIncorrect.mp3"],
  volume: 1,
});

export const usePractice = () => {
  const { practiceState, practiceSetState } = useContext(PracticeContext);

  const onToggleReady = (isReady: boolean) => {
    const cloneState = { ...practiceState };
    const { cursonWord } = practiceState;
    cloneState.isReady = isReady;

    if (!isReady) {
      for (let i = 0; i <= cursonWord; i++) {
        for (let ii = 0; ii < cloneState.practiceData[i].length; ii++) {
          cloneState.practiceData[i][ii].isCurson = false;
          cloneState.practiceData[i][ii].isIncorrect = false;
          cloneState.practiceData[i][ii].typedAt = null;
        }
      }
      cloneState.practiceData[0][0].isCurson = true;
      cloneState.cursonWord = 0;
      cloneState.cursonCharacter = 0;
      cloneState.isTyping = false;
    }

    practiceSetState(cloneState);
  };

  const onHandleKeyPress = (characterCode: number) => {
    if (!practiceState.isCompleted) {
      const cloneState = { ...practiceState };
      const { cursonWord, cursonCharacter } = practiceState;

      const currentWord = practiceState.practiceData[cursonWord];
      const currentCharacter = practiceState.practiceData[cursonWord][cursonCharacter];

      currentCharacter.isCurson = false;
      currentCharacter.typedAt = new Date().getTime();
      if (characterCode === currentCharacter.characterCode) {
        soundTyping.play();
      } else {
        soundTypingIncorrect.play();
        currentCharacter.isIncorrect = true;
      }

      if (cursonCharacter < currentWord.length - 1) {
        if (cursonWord === 0 && cursonCharacter === 0) cloneState.isTyping = true;
        cloneState.cursonCharacter = cursonCharacter + 1;
      } else if (cursonWord < cloneState.practiceData.length - 1) {
        cloneState.cursonCharacter = 0;
        cloneState.cursonWord = cursonWord + 1;
      } else {
        cloneState.isTyping = false;
        cloneState.isCompleted = true;
      }
      cloneState.practiceData[cloneState.cursonWord][cloneState.cursonCharacter].isCurson = true;

      practiceSetState(cloneState);
    }
  };

  return {
    practiceState,
    practiceSetState,
    onHandleKeyPress,
    onToggleReady,
  };
};
