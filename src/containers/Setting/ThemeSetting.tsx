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
      setState((prevState) => ({ ...prevState, selected: "custom" }));
    } else if (themeId === option._id) {
      setState((prevState) => ({ ...prevState, selected: option._id }));
    } else {
      actionToggleSetting("theme", themeId);
    }
  };

  const onHandleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const onHandleCreateTheme = () => {
    actionCreateThemeSetting({ name: state.option.name, value: state.option.value });
  };

  const onHandleUpdateTheme = () => {
    actionUpdateTheme(state.option._id, { name: state.option.name, value: state.option.value });
  };

  const onHandleDeleteTheme = () => {
    actionDeleteThemeSetting(state.option._id);
  };

  return (
    <React.Fragment>
      <div>
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

      <div className="flex items-center my-md">
        <div className="mr-md">
          <Input
            name="name"
            placeholder="Tên chủ đề"
            autoComplete="off"
            value={state.option.name}
            onChange={onHandleChangeTheme}
          />
        </div>
        <div style={{ width: 75, height: 52 }} className="mr-md">
          <input
            type="color"
            className="w-full h-full bg-transparent"
            name="primary"
            value={state.option.value.primary}
            onChange={onHandleChangeTheme}
          />
        </div>
        <div style={{ width: 75, height: 52 }} className="mr-md">
          <input
            type="color"
            className="w-full h-full bg-transparent"
            name="secondary"
            value={state.option.value.secondary}
            onChange={onHandleChangeTheme}
          />
        </div>
        <div style={{ width: 75, height: 52 }} className="mr-md">
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
        <div className="mr-md">
          <Button disabled={state.selected !== "custom"} onClick={onHandleCreateTheme}>
            Thêm chủ đề mới
          </Button>
        </div>
        <div className="mr-md">
          <Button
            disabled={state.selected === "custom" || !state.isEdited}
            onClick={onHandleUpdateTheme}
          >
            Cập nhật chủ đề
          </Button>
        </div>
        <div className="mr-md">
          <Button
            disabled={option.isDefault || state.selected === "custom"}
            color="secondary"
            onClick={onHandleDeleteTheme}
          >
            Xoá chủ đề
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThemeSetting;
