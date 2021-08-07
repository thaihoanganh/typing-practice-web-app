import { ISettingEntity, initialSettingEntity, settingSchema, SettingContext } from ".";

export const actionGetSetting = () => {
  const setting: ISettingEntity = JSON.parse(window.localStorage.getItem("setting") as any);

  try {
    settingSchema.parse(setting);
    setting.lessonLevel.options.map((option) => {
      if (
        option.accuracyMin > option.accuracyMax ||
        option.wordsPerMinuteMin > option.wordsPerMinuteMax
      ) {
        throw new Error("Something wrong");
      }
    });
    SettingContext.setState((prevState) => ({ ...prevState, status: "READY", entity: setting }));
  } catch (error) {
    SettingContext.setState((prevState) => ({ ...prevState, status: "READY" }));
    window.localStorage.setItem("setting", JSON.stringify(initialSettingEntity));
  }
};

export const actionUpdateSetting = (setting: ISettingEntity) => {
  SettingContext.setState((prevState) => ({ ...prevState, entity: setting }));
  window.localStorage.setItem("setting", JSON.stringify(setting));
};
