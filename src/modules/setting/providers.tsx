import React, { useState, useEffect, useMemo } from "react";
import { createAppContext } from "@/helpers/context";

import { ISettingEntity, initialSettingEntity, actionGetSetting } from ".";

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
    entity: initialSettingEntity,
  });

  useEffect(() => {
    actionGetSetting();
  }, []);

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <SettingContext.Provider value={exportValue}>{children}</SettingContext.Provider>;
};

export default SettingProvider;
