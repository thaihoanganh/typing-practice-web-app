import React, { useEffect, useState } from "react";
import produce from "immer";

import { getContrastColor, setVariableColor } from "@/helpers/color";
import {
  actionCreateThemeSetting,
  actionDeleteThemeSetting,
  actionToggleSetting,
  actionUpdateTheme,
  useSettings,
} from "@/modules/settings";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
export interface ThemeSettingState {
  option: {
    _id: string;
    name: string;
    isDefault: boolean;
    value: {
      primary: string;
      secondary: string;
      danger: string;
    };
  };
  selected: string;
  isEdited: boolean;
}

export const ThemeSetting = () => {
  const {
    settings: { theme },
  } = useSettings();

  const option = theme.options.find(
    (option) => option._id === theme.selected
  ) as ThemeSettingState["option"];

  const [state, setState] = useState<ThemeSettingState>({
    option: option,
    selected: theme.selected,
    isEdited: false,
  });

  useEffect(() => {
    setState({
      option: option,
      selected: theme.selected,
      isEdited: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.selected]);

  const onToggleTheme = (themeId: string) => {
    if (themeId === "custom") {
      setState((prevState) => ({
        ...prevState,
        option: {
          ...prevState.option,
          isDefault: false,
        },
        selected: "custom",
      }));
    } else if (themeId === option._id) {
      setState((prevState) => ({ ...prevState, selected: option._id }));
    } else {
      actionToggleSetting("theme", themeId);
    }
  };

  const onHandleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!state.option.isDefault) {
      const { name, value } = e.target;
      setState(
        produce((draft: any) => {
          draft.isEdited = true;
          if (name === "name") {
            draft.option.name = value;
          } else {
            draft.option.value[name] = value;
            setVariableColor("--" + name, value);
            setVariableColor("--contrast-" + name, getContrastColor(value));
          }
        })
      );
    }
  };

  const onHandleCreateTheme = () => {
    if (state.selected === "custom") {
      actionCreateThemeSetting({ name: state.option.name, value: state.option.value });
    }
  };

  const onHandleUpdateTheme = () => {
    if (state.isEdited && !state.option.isDefault) {
      actionUpdateTheme(state.option._id, { name: state.option.name, value: state.option.value });
    }
  };

  const onHandleDeleteTheme = () => {
    if (!state.option.isDefault && state.selected !== "custom") {
      actionDeleteThemeSetting(state.option._id);
    }
  };

  return (
    <React.Fragment>
      <div className="my-md">
        <h3 className="text-headline-3 text-contrast-secondary text-opacity-87 font-semibold">
          Chủ đề
        </h3>
      </div>
      <div className="flex my-md">
        {theme.options.map((option, index) => (
          <div className="mr-md" key={index}>
            <Button
              color={state.selected === option._id ? "primary" : "secondary"}
              onClick={() => onToggleTheme(option._id)}
            >
              {option.name}
            </Button>
          </div>
        ))}
        <div>
          <Button
            color={state.selected === "custom" ? "primary" : "secondary"}
            onClick={() => onToggleTheme("custom")}
          >
            Tuỳ chỉnh
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center my-md mt-lg">
        <div className="w-full desktop:w-auto mr-md my-sm">
          <Input
            name="name"
            placeholder="Tên tuỳ chọn"
            autoComplete="off"
            value={state.option.name}
            onChange={onHandleChangeTheme}
            fullWidth
          />
        </div>
        <div style={{ width: 75, height: 52 }} className="mr-md my-sm">
          <input
            type="color"
            className="w-full h-full bg-transparent"
            name="primary"
            value={state.option.value.primary}
            onChange={onHandleChangeTheme}
          />
        </div>
        <div style={{ width: 75, height: 52 }} className="mr-md my-sm">
          <input
            type="color"
            className="w-full h-full bg-transparent"
            name="secondary"
            value={state.option.value.secondary}
            onChange={onHandleChangeTheme}
          />
        </div>
        <div style={{ width: 75, height: 52 }} className="mr-md my-sm">
          <input
            type="color"
            className="w-full h-full bg-transparent"
            name="danger"
            value={state.option.value.danger}
            onChange={onHandleChangeTheme}
          />
        </div>
      </div>

      <div className="flex my-md">
        <div className="mr-sm">
          <Button
            color="secondary"
            disabled={state.selected !== "custom"}
            onClick={onHandleCreateTheme}
          >
            Thêm tuỳ chọn
          </Button>
        </div>
        <div className="mr-sm">
          <Button
            color="secondary"
            disabled={option.isDefault || state.selected === "custom"}
            onClick={onHandleUpdateTheme}
          >
            Cập nhật tuỳ chọn
          </Button>
        </div>
        <div>
          <Button
            color="danger"
            disabled={state.option.isDefault || state.selected === "custom"}
            onClick={onHandleDeleteTheme}
          >
            Xoá tuỳ chọn
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThemeSetting;
