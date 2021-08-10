import React, { useState, useEffect, useMemo } from "react";
import { createAppContext } from "@/helpers/context";
import { setVariableColor, getContrastColor } from "@/helpers/color";

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

  useEffect(() => {
    const { primary, secondary, danger } = state.entity.theme.options[state.entity.theme.selected];
    setVariableColor("--primary", primary);
    setVariableColor("--contrast-primary", getContrastColor(primary));
    setVariableColor("--secondary", secondary);
    setVariableColor("--contrast-secondary", getContrastColor(secondary));
    setVariableColor("--danger", danger);
    setVariableColor("--contrast-danger", getContrastColor(danger));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.entity.theme.selected]);

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <SettingContext.Provider value={exportValue}>{children}</SettingContext.Provider>;
};

export default SettingProvider;
