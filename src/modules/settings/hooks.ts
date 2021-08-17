import { useContext } from "react";
import { SettingContext } from ".";

export const useSettings = () => {
  const { status, message, entity } = useContext(SettingContext.initial);

  return {
    settingsStatus: status,
    settingsMessage: message,
    settings: entity,
  };
};
