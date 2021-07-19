import { readLocalStorage, writeLocalStorage } from "@/helpers/localStorage";
import { LESSONS, LESSON_LEVEL } from "@/constants/lessons";
import { ISettingEntity, ISettingState } from ".";

export const getSettingInLocalService = () => {
  const initialSetting: ISettingState = {
    themeMode: {
      options: ["light", "dark"],
      selected: "light",
    },
    lesson: {
      options: LESSONS,
      selected: "en",
    },
    level: {
      options: LESSON_LEVEL,
      selected: "easy",
    },
  };
  const setting: ISettingEntity = readLocalStorage("setting");
  if (setting) {
    const isCustomLevel = -1 === ["easy", "normal", "hard"].indexOf(setting.level);
    return {
      ...initialSetting,
      themeMode: {
        ...initialSetting.themeMode,
        selected: setting.themeMode,
      },
      lesson: {
        ...initialSetting.lesson,
        selected: setting.lesson,
      },
      level: {
        options: {
          ...initialSetting.level.options,
          custom: isCustomLevel ? setting.level : initialSetting.level.options.custom,
        },
        selected: isCustomLevel ? "custom" : setting.level,
      },
    };
  } else {
    writeLocalStorage("setting", {
      themeMode: initialSetting.themeMode.selected,
      lesson: initialSetting.lesson.selected,
      level: initialSetting.level.selected,
    });
    return initialSetting;
  }
};

export const updateSettingInLocalService = (value: ISettingState) => {
  writeLocalStorage("setting", {
    themeMode: value.themeMode.selected,
    lesson: value.lesson.selected,
    level: "custom" === value.level.selected ? value.level.options.custom : value.level.selected,
  });
};
