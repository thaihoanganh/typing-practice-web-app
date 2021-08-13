import { typingSound } from "@/helpers/sound";
import { SettingContext } from "@/modules/setting";
import { shuffle } from "@/utils/array";
import { SpeedTestContext } from ".";

export const actionCreateTestDataFromString = (value = "", isShuffle = true) => {
  const words = isShuffle ? shuffle(value.split(" ")) : value.split(" ");
  const totalWords = words.length;

  const testData = words.map((word, wordIndex) => {
    if (wordIndex === words.length - 1) {
      return word.split("").map((character: any) => ({
        character,
        isIncorrect: false,
        typedAt: null,
      }));
    } else {
      return [
        ...word.split("").map((character: any) => ({
          character,
          isIncorrect: false,
          typedAt: null,
        })),
        {
          character: " ",
          isIncorrect: false,
          typedAt: null,
        },
      ];
    }
  });

  SpeedTestContext.setState((prevState) => ({
    ...prevState,
    status: "READY",
    entity: {
      ...prevState.entity,
      characterCursor: 0,
      wordCursor: 0,
      isCheckAfterWord: true,
      isCompleted: false,
      data: testData,
      statistical: {
        ...prevState.entity.statistical,
        totalWords,
      },
    },
  }));
};

export const actionToggleReady = (isReady: boolean) => {
  SpeedTestContext.setState((prevState) => ({
    ...prevState,
    entity: {
      ...prevState.entity,
      isReady,
    },
  }));
};

export const actionHandleTypingWord = (word: string, isNextWord: boolean, typingTime: number[]) => {
  const {
    entity: { sound },
  } = SettingContext.getState();
  if (sound.selected === 0) typingSound.play();

  const cloneState = { ...SpeedTestContext.getState() };
  const { wordCursor, data } = cloneState.entity;
  const typedAt = new Date().getTime();

  cloneState.entity.isTyping = true;
  if (isNextWord) {
    if (data[wordCursor].length >= word.length) {
      data[wordCursor].map((chractersObj, index) => {
        data[wordCursor][index].isIncorrect = word[index] !== chractersObj.character;
        data[wordCursor][index].typedAt = typingTime[index] || typedAt;
      });
    } else {
      data[wordCursor] = word.split("").map<any>((character, index) => ({
        character: character,
        isIncorrect: word[index] !== data[wordCursor][index]?.character,
        typedAt: typingTime[index],
      }));
    }

    if (wordCursor < data.length - 1) {
      ++cloneState.entity.wordCursor;
    } else {
      cloneState.entity.isCompleted = true;
      cloneState.entity.isTyping = false;
    }
  }
  SpeedTestContext.setState(cloneState);
};
