import React, { useState, useEffect, useMemo } from "react";
import { IDBPDatabase, openDB } from "idb";
import { createAppContext } from "@/helpers/context";
import { getContrastColor, setVariableColor } from "@/helpers/color";
import { STATUS, STORAGE, DEFAULT_SETTINGS } from "@/modules/config";
import Toast from "@/components/molecules/Toast";

import { ISettingsEntity, actionGetSettings } from ".";

export interface ISettingsState {
  status: string;
  message: null | string;
  entity: ISettingsEntity;
  storage: null | IDBPDatabase;
}

export const SettingContext = createAppContext<ISettingsState>();

export const SettingsProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ISettingsState>({
    status: STATUS.loading,
    message: null,
    entity: DEFAULT_SETTINGS,
    storage: null,
  });

  useEffect(() => {
    openDB(STORAGE.settings.root, 1, {
      upgrade(storage) {
        storage.createObjectStore(STORAGE.settings.options, { keyPath: "_id" });
        storage.createObjectStore(STORAGE.settings.select, { keyPath: "settingName" });
      },
    }).then((storage) => {
      setState((prevState) => ({ ...prevState, storage }));
    });
  }, []);

  useEffect(() => {
    if (state.storage) {
      actionGetSettings();
    }
  }, [state.storage]);

  useEffect(() => {
    if (state.message) {
      setState((prevState) => ({ ...prevState, status: STATUS.ready, message: null }));
      Toast({
        message: state.message,
        isError: state.status === STATUS.error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message]);

  useEffect(() => {
    const themeSetting: any = state.entity.theme.options.find(
      (option) => option._id === state.entity.theme.selected
    );

    const { primary, secondary, danger } = themeSetting?.value || state.entity.theme.options[0];

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

export default SettingsProvider;
