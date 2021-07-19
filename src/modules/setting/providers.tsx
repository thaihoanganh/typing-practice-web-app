import { createContext, useState, useEffect, useMemo } from "react";
import { getSettingInLocalService } from ".";

export interface ISettingState {
  themeMode: {
    options: ["light", "dark"];
    selected: string;
  };
  lesson: {
    options: ILessons;
    selected: string;
  };
  level: {
    options: ILessonLevel;
    selected: string;
  };
}

export interface ISettingContext {
  settingState: ISettingState;
  setSettingState: React.Dispatch<React.SetStateAction<ISettingState>>;
}

export const SettingContext = createContext({} as ISettingContext);

export const SettingProvider: React.FC = ({ children }) => {
  const [state, setState] = useState({} as ISettingState);

  useEffect(() => {
    const setting = getSettingInLocalService();
    setState(setting);
  }, []);

  useEffect(() => {
    if (state.themeMode) {
      document.body.className = state.themeMode.selected;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.themeMode]);

  const exportValue = useMemo<ISettingContext>(() => {
    return {
      settingState: state,
      setSettingState: setState,
    };
  }, [state]);

  return <SettingContext.Provider value={exportValue}>{children}</SettingContext.Provider>;
};
