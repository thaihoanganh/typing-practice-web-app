import { SettingContext } from ".";

export const useSetting = () => {
  const { status: settingStatus, errorMessage: settingErrorMessage, entity: setting } = SettingContext.getState();

  return {
    settingStatus,
    settingErrorMessage,
    setting,
  };
};
