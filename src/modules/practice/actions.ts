import { SettingContext } from "@/modules/setting";
import { IPracticeEntity, PracticeContext } from ".";
import { Howl } from "howler";

const soundTyping = new Howl({
  src: ["/sounds/typing.mp3"],
  volume: 1,
});

const soundTypingIncorrect = new Howl({
  src: ["/sounds/typingIncorrect.mp3"],
  volume: 1,
});

export const actionSetPractice = (practiceData: IPracticeEntity["data"]) => {
  let totalWords = practiceData.length;
  let totalCharacters = 0;
  practiceData.map((word) => {
    word.map(() => (totalCharacters += 1));
  });

  PracticeContext.setState((prevState) => ({
    ...prevState,
    status: "READY",
    entity: {
      ...prevState.entity,
      cursonCharacter: 0,
      cursonWord: 0,
      isCheckAfterWord: false,
      isCompleted: false,
      isTyping: false,
      data: practiceData,
      statistical: {
        accuracy: null,
        wordsPerMinute: null,
        totalCharacters,
        totalWords,
        totalWordsIncorrect: null,
        totalTime: null,
      },
    },
  }));
};

export const actionToggleFocusTextData = (isFocus: boolean) => {
  PracticeContext.setState((prevState) => {
    const practice = { ...prevState.entity };
    practice.isReady = isFocus;
    if (!isFocus) {
      for (let i = 0; i <= practice.cursonWord; i++) {
        for (let ii = 0; ii < practice.data[i].length; ii++) {
          practice.data[i][ii].isCurson = false;
          practice.data[i][ii].isIncorrect = false;
          practice.data[i][ii].typedAt = null;
        }
      }
      practice.data[0][0].isCurson = true;
      practice.cursonWord = 0;
      practice.cursonCharacter = 0;
      practice.isCompleted = false;
      practice.isTyping = false;
    }
    return {
      ...prevState,
      entity: practice,
    };
  });
};

export const actionPressKeyboard = (characterCode: number, wordContent: string = "") => {
  const settingContext = SettingContext.getState();
  const isSound = settingContext.entity.sound.selected;

  PracticeContext.setState((prevState) => {
    const practice = { ...prevState.entity };

    const { cursonWord, cursonCharacter, isCheckAfterWord, isCompleted } = practice;

    const currentWord = practice.data[cursonWord];
    const currentCharacter = practice.data[cursonWord][cursonCharacter];
    const typeAt = new Date().getTime();

    if (!isCompleted) {
      if (isCheckAfterWord) {
        if (cursonWord === 0) practice.isTyping = true;
        if (characterCode === 32) {
          const wordContentArray = [...wordContent.split("").map((character) => character.charCodeAt(0)), 32];
          currentWord.map((character, index) => {
            if (character.characterCode !== wordContentArray[index]) currentWord[index].isIncorrect = true;
            currentWord[index].typedAt = typeAt;
          });

          practice.data[cursonWord][0].isCurson = false;
          if (cursonWord < practice.data.length - 1) {
            practice.cursonWord = cursonWord + 1;
            practice.data[cursonWord + 1][0].isCurson = true;
          } else {
            practice.isTyping = false;
            practice.isCompleted = true;
          }
        }
      } else {
        currentCharacter.isCurson = false;
        currentCharacter.typedAt = typeAt;
        if (characterCode === currentCharacter.characterCode) {
          if (isSound === 0) soundTyping.play();
        } else {
          if (isSound === 0) soundTypingIncorrect.play();
          currentCharacter.isIncorrect = true;
        }

        if (cursonCharacter < currentWord.length - 1) {
          if (cursonWord === 0 && cursonCharacter === 0) practice.isTyping = true;
          practice.cursonCharacter = cursonCharacter + 1;
        } else if (cursonWord < practice.data.length - 1) {
          practice.cursonCharacter = 0;
          practice.cursonWord = cursonWord + 1;
        } else {
          practice.isTyping = false;
          practice.isCompleted = true;
        }
        practice.data[practice.cursonWord][practice.cursonCharacter].isCurson = true;
      }
    }

    return {
      ...prevState,
      entity: practice,
    };
  });
};

export const actionPracticeStatistics = () => {
  PracticeContext.setState((prevState) => {
    const practice = { ...prevState.entity };

    let totalCharactersIncorrect = 0;
    let totalWordsIncorrect = 0;

    practice.data.map((word) => {
      let isIncorrect = false;
      word.map((character) => {
        if (character.isIncorrect) {
          totalCharactersIncorrect += 1;
          isIncorrect = true;
        }
      });
      totalWordsIncorrect += Number(isIncorrect);
    });

    const totalCharacters: any = practice.statistical.totalCharacters;
    const totalWords: any = practice.statistical.totalWords;
    const timeStart: any = practice.data[0][0].typedAt;
    const timeEnd: any = practice.data[practice.cursonWord][practice.cursonCharacter].typedAt;
    const totalTime = (timeEnd - timeStart) / 1000;
    const accuracy = 1 - totalCharactersIncorrect / totalCharacters;
    const wordsPerMinute = totalWords / (totalTime / 60);

    practice.statistical.accuracy = accuracy;
    practice.statistical.wordsPerMinute = wordsPerMinute;
    practice.statistical.totalWordsIncorrect = totalWordsIncorrect;
    practice.statistical.totalTime = totalTime;

    return {
      ...prevState,
      entity: practice,
    };
  });
};
