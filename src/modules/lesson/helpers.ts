import { shuffle } from "@/helpers/array";

export type ICreatePracticeLesson = (
  lessons: ILessons,
  typingLanguage: keyof ILessons,
  lessonConfig: ILessonConfig,
  cursonLesson: number,
  lessonLevel: ILessonLevel,
  cursonLessonLevel: keyof ILessonLevel,
  totalCharacters: number,
  focusCharacter?: number
) => {
  passScoreAccuracy: number;
  passScoreWpm: number;
  lessonData: {
    characterCode: number;
    isCurson: boolean;
    isIncorrect: boolean;
    typedAt: null;
  }[][];
};

export type ICreateCharacterGroup = (
  characters: number[],
  countWords: number,
  wordLength: {
    length: number;
    density: number;
  }[],
  characterGroup?: number[][],
  cursonCharacter?: number
) => {
  characterCode: number;
  isCurson: boolean;
  isIncorrect: boolean;
  typedAt: null;
}[][];

export const createLesson: ICreatePracticeLesson = (
  lessons,
  typingLanguage,
  lessonConfig,
  cursonLesson,
  lessonLevel,
  cursonLessonLevel,
  totalCharacters,
  focusCharacter
) => {
  const practiceCharacters = lessons[typingLanguage].data.slice(0, cursonLesson);
  const wordLength = lessons[typingLanguage].wordLength;

  const { hightPracticeRate, normalPracticeRate, lowPracticeRate, emergencyPracticeRate } = lessonConfig;

  const otherPracticeRate =
    focusCharacter === undefined
      ? 1 - hightPracticeRate - normalPracticeRate - lowPracticeRate
      : 1 - hightPracticeRate - normalPracticeRate - lowPracticeRate - emergencyPracticeRate;

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
  if (focusCharacter !== undefined) {
    characters = [
      ...characters,
      ...Array(Math.floor(totalCharacters * emergencyPracticeRate)).fill(practiceCharacters[focusCharacter]),
    ];
  }

  const countWords = wordLength.reduce((count, value, index) => {
    if (index === wordLength.length - 1) {
      return (characters.length - 1) / (count + (value.length + 1) * value.density);
    } else {
      return count + (value.length + 1) * value.density;
    }
  }, 0);

  characters = shuffle(characters);
  characters = [...characters, ...characters.slice(0, totalCharacters - characters.length)];

  const passScoreAccuracy = createPassScore(
    lessonLevel[cursonLessonLevel].accuracy.min,
    lessonLevel[cursonLessonLevel].accuracy.max,
    lessons[typingLanguage].data.length,
    cursonLesson,
    5
  );
  const passScoreWpm = createPassScore(
    lessonLevel[cursonLessonLevel].wpm.min,
    lessonLevel[cursonLessonLevel].wpm.max,
    lessons[typingLanguage].data.length,
    cursonLesson,
    5
  );
  const lessonData = createCharacterGroup(characters, countWords, wordLength);

  return {
    passScoreAccuracy,
    passScoreWpm,
    lessonData,
  };
};

const createCharacterGroup: ICreateCharacterGroup = (
  characters,
  countWords,
  wordLength,
  characterGroup = [],
  cursonCharacter = 0
) => {
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
    return createCharacterGroup(characters, countWords, wordLength, characterGroup, cursonCharacter);
  }
};

const createPassScore = (
  min: number,
  max: number,
  totalLessons: number,
  cursonLesson: number,
  step: number
): number => {
  if (totalLessons - cursonLesson <= step) {
    return max;
  }
  if (cursonLesson >= step) {
    return min + ((max - min) * (Math.floor(cursonLesson / step) * step)) / totalLessons;
  }
  return min;
};
