import { string, number, boolean, enumType, mixed, array, oneOf } from "vcc-schema";

export const soundSchema = boolean();

export const themeSchema = mixed({
  primary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
  secondary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
  danger: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
});

export const speedTestSchema = mixed({
  amount: number().min(0),
  type: enumType(["time", "word"]),
});

export const topTrendingWordsSchema = mixed({
  words: string(),
  isShuffle: boolean(),
  hasUppercase: boolean(),
});

export const settingOptionsSchema = array(
  oneOf([
    mixed({
      _id: string(),
      isSync: boolean(),
      settingName: enumType(["sound"]),
      name: string(),
      value: soundSchema,
    }),
    mixed({
      _id: string(),
      isSync: boolean(),
      settingName: enumType(["theme"]),
      name: string(),
      value: themeSchema,
    }),
    mixed({
      _id: string(),
      isSync: boolean(),
      settingName: enumType(["speedTest"]),
      name: string(),
      value: speedTestSchema,
    }),
    mixed({
      _id: string(),
      isSync: boolean(),
      settingName: enumType(["topTrendingWords"]),
      name: string(),
      value: topTrendingWordsSchema,
    }),
  ])
);

export const settingSelectSchema = array(
  mixed({
    settingName: enumType(["sound", "theme", "speedTest", "topTrendingWords"]),
    isSync: boolean(),
    value: string(),
  })
).nonempty();
