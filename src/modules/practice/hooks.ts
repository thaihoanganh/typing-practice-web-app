import { useContext } from "react";
import { PracticeContext } from ".";

export const usePractice = () => {
  const { practiceState, practiceSetState } = useContext(PracticeContext);

  const onToggleReady = (isReady: boolean) => {
    const cloneState = { ...practiceState };
    const { cursonWord, cursonCharacter } = practiceState;

    if (cloneState.practiceData) {
      cloneState.isReady = isReady;
      if (!isReady) {
        for (let i = 0; i <= cursonWord; i++) {
          if (cloneState.practiceData[i]) {
            for (let ii = 0; ii <= cursonCharacter; ii++) {
              cloneState.practiceData[i][ii].isCurson = false;
              cloneState.practiceData[i][ii].isIncorrect = false;
              cloneState.practiceData[i][ii].typedAt = null;
            }
          }
        }
        if (cloneState.practiceData[0]) cloneState.practiceData[0][0].isCurson = true;
        cloneState.cursonWord = 0;
        cloneState.cursonCharacter = 0;
      }
    }

    practiceSetState(cloneState);
  };

  const onHandleKeyPress = (characterCode: number) => {
    const cloneState = { ...practiceState };
    const { cursonWord, cursonCharacter } = practiceState;
    const currentWord = practiceState.practiceData[cursonWord];
    const currentCharacter = practiceState.practiceData[cursonWord][cursonCharacter];

    if (!practiceState.isCompleted) {
      currentCharacter.isCurson = false;
      currentCharacter.typedAt = new Date().getTime();
      if (characterCode !== currentCharacter.characterCode) {
        currentCharacter.isIncorrect = true;
      }

      if (cursonCharacter < currentWord.length - 1) {
        cloneState.cursonCharacter = cursonCharacter + 1;

        if (cursonCharacter === currentWord.length - 2 && cursonWord === cloneState.practiceData.length - 1) {
          cloneState.isCompleted = true;
        }
      } else {
        cloneState.cursonCharacter = 0;
        cloneState.cursonWord = cursonWord + 1;
      }

      cloneState.practiceData[cloneState.cursonWord][cloneState.cursonCharacter].isCurson = true;
    }

    practiceSetState(cloneState);
  };

  return {
    practiceState,
    practiceSetState,
    onHandleKeyPress,
    onToggleReady,
  };
};
