import { useContext } from "react";
import { SettingContext, ISettingState, updateSettingInLocalService } from ".";

export const useSetting = () => {
  const { settingState, setSettingState } = useContext(SettingContext);

  const onHandleUpdateSetting = (value: ISettingState) => {
    updateSettingInLocalService(value);
    setSettingState(value);
  };

  return {
    setting: settingState,
    onHandleUpdateSetting,
  };
};
