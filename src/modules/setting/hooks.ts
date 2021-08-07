import { useContext } from "react";
import { SettingContext } from ".";

export const useSetting = () => {
  const { status, errorMessage, entity } = useContext(SettingContext.initial);

  return {
    settingStatus: status,
    settingErrorMessage: errorMessage,
    setting: entity,
  };
};
