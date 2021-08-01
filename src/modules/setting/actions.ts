import Joi from "joi";
import { LESSONS, LESSON_LEVEL } from "@/constants/lessons";
import { readLocalStorage, writeLocalStorage } from "@/helpers/localStorage";
import { ISettingEntity, SettingContext } from ".";

export const actionGetSetting = () => {
  const settingSchema = Joi.object().keys({
    theme: Joi.number().min(0).max(3).required(),
    sound: Joi.number().min(0).max(1).required(),
    lesson: Joi.number()
      .min(0)
      .max(LESSONS.length - 1)
      .required(),
    level: Joi.alternatives().try(
      Joi.number()
        .min(0)
        .max(LESSON_LEVEL.length - 1)
        .required(),
      Joi.object().keys({
        accuracy: Joi.object().keys({
          min: Joi.number().min(0).max(1).required(),
          max: Joi.number().min(0).max(1).required(),
        }),
        wpm: Joi.object().keys({
          min: Joi.number().min(0).required(),
          max: Joi.number().min(0).required(),
        }),
      })
    ),
  });

  const getSetting = readLocalStorage("setting");
  const settingValidate = settingSchema.validate(getSetting);

  if (settingValidate.error) {
    writeLocalStorage("setting", {
      theme: 0,
      sound: 0,
      lesson: 0,
      level: 0,
    });
  } else {
    const { theme, sound, lesson, level } = getSetting;
    SettingContext.setState((prevState) => {
      const cloneState = { ...prevState };
      cloneState.status = "READY";
      cloneState.entity.theme.selected = theme;
      cloneState.entity.sound.selected = sound;
      cloneState.entity.lesson.selected = lesson;
      if (typeof level === "number") {
        cloneState.entity.level.selected = level;
      } else {
        cloneState.entity.level.options[LESSON_LEVEL.length - 1].accuracy = level.accuracy;
        cloneState.entity.level.options[LESSON_LEVEL.length - 1].wpm = level.wpm;
        cloneState.entity.level.selected = LESSON_LEVEL.length - 1;
      }
      return cloneState;
    });
  }
};

export const actionUpdateSetting = (setting: ISettingEntity) => {
  const theme = setting.theme.selected;
  const sound = setting.sound.selected;
  const lesson = setting.lesson.selected;
  let level: any;
  if (setting.level.selected === LESSON_LEVEL.length - 1) {
    level = {};
    level.accuracy = setting.level.options[LESSON_LEVEL.length - 1].accuracy;
    level.wpm = setting.level.options[LESSON_LEVEL.length - 1].wpm;
  } else {
    level = setting.level.selected;
  }

  writeLocalStorage("setting", {
    theme,
    sound,
    lesson,
    level,
  });
};

// TODO
export const actionChangeTheme = (selectdValue: number) => {
  SettingContext.setState((prevState) => {
    const cloneState = { ...prevState };
    cloneState.entity.theme.selected = selectdValue;
    actionUpdateSetting(cloneState.entity);
    return cloneState;
  });
};

export const actionChangeSound = (selectdValue: number) => {
  SettingContext.setState((prevState) => {
    const cloneState = { ...prevState };
    cloneState.entity.sound.selected = selectdValue;
    actionUpdateSetting(cloneState.entity);
    return cloneState;
  });
};

export const actionChangeLesson = (selectdValue: number) => {
  SettingContext.setState((prevState) => {
    const cloneState = { ...prevState };
    cloneState.entity.lesson.selected = selectdValue;
    actionUpdateSetting(cloneState.entity);
    return cloneState;
  });
};

export const actionChangeLevel = (selectdValue: number | ILessonLevel) => {
  SettingContext.setState((prevState) => {
    const cloneState = { ...prevState };
    if (typeof selectdValue === "number") {
      cloneState.entity.level.selected = selectdValue;
    } else {
      cloneState.entity.level.options[LESSON_LEVEL.length - 1] = selectdValue;
      cloneState.entity.level.selected = LESSON_LEVEL.length - 1;
    }
    actionUpdateSetting(cloneState.entity);
    return cloneState;
  });
};
