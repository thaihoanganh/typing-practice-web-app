import React, { useState, useEffect, useMemo } from "react";
import { LESSONS, LESSON_LEVEL } from "@/constants/lessons";
import { createAppContext } from "@/utils/context";
import { ISettingEntity, actionGetSetting } from ".";

export interface ISettingState {
  status: "READY" | "LOADING" | "ERROR";
  errorMessage: null | string;
  entity: ISettingEntity;
}

export const SettingContext = createAppContext<ISettingState>();

export const SettingProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ISettingState>({
    status: "LOADING",
    errorMessage: null,
    entity: {
      theme: {
        options: [
          {
            brand: "#000000",
          },
        ],
        selected: 0,
      },
      sound: {
        options: ["Bật", "Tắt"],
        selected: 0,
      },
      lesson: {
        options: LESSONS,
        selected: 0,
      },
      level: {
        options: LESSON_LEVEL,
        selected: 0,
      },
    },
  });

  useEffect(() => {
    actionGetSetting();
  }, []);

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <SettingContext.Provider value={exportValue}>{children}</SettingContext.Provider>;
};
