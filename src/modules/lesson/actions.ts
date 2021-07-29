import { shuffle } from "@/helpers/array";
import { LESSON_CONFIG } from "@/constants/lessons";
import { UserContext } from "@/modules/user";
import { SettingContext } from "@/modules/setting";
import { actionSetPractice } from "@/modules/practice";
import { LessonContext } from ".";

export const actionSetLesson = ({ isNextLesson = false }) => {
  const userState = UserContext.getState();
  const settingState = SettingContext.getState();

  const { currentLesson } = userState.entity;
  const lessonSetting = settingState.entity.lesson.options[settingState.entity.lesson.selected];

  const currentLevel = settingState.entity.level.options[settingState.entity.level.selected as number];
  const wordLength = lessonSetting.wordLength;
  const totalLessons = lessonSetting.data.length;
  const practiceCharacters = isNextLesson
    ? lessonSetting.data.slice(currentLesson - 1, currentLesson)
    : lessonSetting.data.slice(0, currentLesson);

  const { hightPracticeRate, normalPracticeRate, lowPracticeRate } = LESSON_CONFIG;
  const otherPracticeRate = 1 - hightPracticeRate - normalPracticeRate - lowPracticeRate;

  const totalCharacters = isNextLesson ? 100 : 200;
  let characters: number[] = [];
  for (let i = 0; i < practiceCharacters.length; i++) {
    let countCharacters = (totalCharacters * otherPracticeRate) / practiceCharacters.length;
    switch (practiceCharacters.length - i) {
      case 1:
        countCharacters += totalCharacters * hightPracticeRate;
        break;
      case 2:
        countCharacters += totalCharacters * normalPracticeRate;
        break;
      case 3:
        countCharacters += totalCharacters * lowPracticeRate;
        break;
    }
    characters = [...characters, ...Array(Math.floor(countCharacters)).fill(practiceCharacters[i])];
  }

  characters = shuffle(characters);
  characters = [...characters, ...characters.slice(0, totalCharacters - characters.length)];

  const countWords = wordLength.reduce((count, value, index) => {
    if (index === wordLength.length - 1) {
      return (characters.length - 1) / (count + (value.length + 1) * value.density);
    } else {
      return count + (value.length + 1) * value.density;
    }
  }, 0);

  const createCharacterGroup = (
    characterGroup: number[][] = [],
    cursonCharacter = 0
  ): {
    characterCode: number;
    isCurson: boolean;
    isIncorrect: boolean;
    typedAt: null;
  }[][] => {
    loop: for (let i = 0; i < wordLength.length; i++) {
      let group: number[][] = [];
      for (let ii = 0; ii < Math.floor(countWords * wordLength[i].density); ii++) {
        if (characters.length - cursonCharacter < wordLength[wordLength.length - 1].length) break loop;

        const newGroup = [...characters.slice(cursonCharacter, cursonCharacter + wordLength[i].length), 32];
        group = [...group, newGroup];
        cursonCharacter = cursonCharacter + wordLength[i].length + 1;
      }
      characterGroup = [...characterGroup, ...group];
    }

    if (characters.length - cursonCharacter < wordLength[wordLength.length - 1].length) {
      characterGroup = shuffle(characterGroup);
      if (characters.length - cursonCharacter !== 0) {
        characterGroup = [...characterGroup, characters.slice(0, characters.length - cursonCharacter)];
      }
      const data = characterGroup.map((group) => {
        return group.map((character) => ({
          characterCode: character,
          isCurson: false,
          isIncorrect: false,
          typedAt: null,
        }));
      });
      data[0][0].isCurson = true;
      return data;
    } else {
      return createCharacterGroup(characterGroup, cursonCharacter);
    }
  };

  const setMinimumScore = (min: number, max: number, step = 3) => {
    if (totalLessons - currentLesson <= step) {
      return max;
    }
    if (currentLesson >= step) {
      return min + ((max - min) * (Math.floor(currentLesson / step) * step)) / totalLessons;
    }
    return min;
  };

  const practiceData = createCharacterGroup();
  const minimumAccuracy = setMinimumScore(currentLevel.accuracy.min, currentLevel.accuracy.max);
  const minimumWordsPerMinute = setMinimumScore(currentLevel.wpm.min, currentLevel.wpm.max);

  LessonContext.setState((prevState) => ({
    ...prevState,
    status: "READY",
    entity: {
      ...prevState.entity,
      minimumAccuracy,
      minimumWordsPerMinute,
    },
  }));

  actionSetPractice(practiceData);
};
