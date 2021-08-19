import { string, number, boolean, enumType, mixed, array, oneOf } from "vcc-schema";

export const soundSchema = boolean();

export const themeSchema = mixed({
  primary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
  secondary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
  danger: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
});

export const speedTestLevelSchema = mixed({
  amount: number().min(0),
  type: enumType(["time", "word"]),
});

export const speedTestDataSchema = mixed({
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
      name: string().nonempty(),
      value: soundSchema,
    }),
    mixed({
      _id: string(),
      isSync: boolean(),
      settingName: enumType(["theme"]),
      name: string().nonempty(),
      value: themeSchema,
    }),
    mixed({
      _id: string(),
      isSync: boolean(),
      settingName: enumType(["speedTestLevel"]),
      name: string().nonempty(),
      value: speedTestLevelSchema,
    }),
    mixed({
      _id: string(),
      isSync: boolean(),
      settingName: enumType(["speedTestData"]),
      name: string(),
      value: speedTestDataSchema,
    }),
  ])
);

export const settingSelectSchema = array(
  mixed({
    settingName: enumType(["sound", "theme", "speedTestLevel", "speedTestData"]),
    isSync: boolean(),
    value: string(),
  })
).nonempty();
