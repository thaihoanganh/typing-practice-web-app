import React, { useState, useEffect } from "react";
import { setVariableColor, getContrastColor } from "@/helpers/color";
import { useSetting, initialSettingEntity, actionUpdateSetting } from "@/modules/setting";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { FormControl } from "@/components/molecules/Form";

export const ThemeSetting: React.FC = () => {
  const { setting, settingStatus } = useSetting();
  const { options, selected } = setting.theme;

  const [state, setState] = useState({
    customOption: { ...options[selected] },
    errorMessage: {
      name: "",
    },
    isEdited: false,
    selected,
  });

  useEffect(() => {
    if (settingStatus === "READY") {
      setState((prevState) => ({
        ...prevState,
        customOption: { ...options[selected] },
        errorMessage: {
          name: "",
        },
        isEdited: false,
        selected,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingStatus, selected]);

  const onToggleTheme = (themeSelected: number | "custom") => {
    const cloneState = { ...state };
    if (themeSelected === "custom") {
      cloneState.customOption = { ...options[selected] };
      cloneState.selected = options.length;
    } else {
      cloneState.customOption = { ...options[themeSelected] };
      cloneState.selected = themeSelected;
      actionUpdateSetting({
        ...setting,
        theme: {
          ...setting.theme,
          selected: themeSelected,
        },
      });
    }
    cloneState.errorMessage = {
      name: "",
    };
    cloneState.isEdited = false;
    setState(cloneState);
  };

  const onHandleChangeTheme = (e: any) => {
    const { name, value } = e.target;
    const cloneState: any = { ...state };
    if (name === "name") {
      cloneState.customOption.name = value;
      cloneState.errorMessage.name = "";
      cloneState.isEdited = true;
    } else {
      cloneState.customOption[name] = value;
      cloneState.isEdited = true;
      setVariableColor("--" + name, value);
      setVariableColor("--contrast-" + name, getContrastColor(value));
    }
    setState(cloneState);
  };

  const onHandleInsertOrUpdateTheme = (type: "insert" | "update") => {
    const validName: any = options.find((option) => option.name === state.customOption.name);
    const cloneState: any = { ...state };

    if (type === "insert" ? validName : validName && validName.name !== options[selected].name) {
      cloneState.errorMessage.name = "Tên chủ đề đã tồn tại";
    } else {
      if (type === "insert") {
        actionUpdateSetting({
          ...setting,
          theme: {
            options: [...options, { ...cloneState.customOption }],
            selected: options.length,
          },
        });
        cloneState.selected = options.length;
      } else {
        const cloneSetting = { ...setting };
        cloneSetting.theme.options[selected] = { ...cloneState.customOption };
        actionUpdateSetting(cloneSetting);
      }
      cloneState.isEdited = false;
    }
    setState(cloneState);
  };

  const onHandleRemoveTheme = () => {
    const cloneSetting = { ...setting };
    cloneSetting.theme.options.splice(selected, 1);
    cloneSetting.theme.selected = 0;
    actionUpdateSetting(cloneSetting);
  };

  return (
    <React.Fragment>
      <div className="text-headline-2 text-contrast-secondary">Chủ đề</div>
      <div className="p-md">
        <div className="flex">
          {options.map((option, index) => (
            <div className="mr-md" key={index}>
              <Button
                color={index === state.selected ? "primary" : "secondary"}
                onClick={() => onToggleTheme(index)}
              >
                {option.name}
              </Button>
            </div>
          ))}
          <div>
            <Button
              color={state.selected === options.length ? "primary" : "secondary"}
              onClick={() => onToggleTheme("custom")}
            >
              Tuỳ chỉnh
            </Button>
          </div>
        </div>
        <div className="flex pt-md">
          <div className="flex">
            <div className="mr-md">
              <FormControl label="Tên chủ đề" errorMessage={state.errorMessage.name}>
                <Input
                  name="name"
                  autoComplete="off"
                  value={state.customOption.name}
                  onChange={onHandleChangeTheme}
                />
              </FormControl>
            </div>
            <div className="mr-md">
              <p className="text-contrast-secondary">Màu nền</p>
              <label style={{ minWidth: 100, height: 42 }} className="block">
                <input
                  className="w-full h-full bg-transparent"
                  type="color"
                  name="secondary"
                  value={state.customOption.secondary}
                  onChange={onHandleChangeTheme}
                />
              </label>
            </div>
            <div className="mr-md">
              <p className="text-contrast-secondary">Màu chính</p>
              <label style={{ minWidth: 100, height: 42 }} className="block">
                <input
                  className="w-full h-full bg-transparent"
                  type="color"
                  name="primary"
                  value={state.customOption.primary}
                  onChange={onHandleChangeTheme}
                />
              </label>
            </div>
            <div className="mr-md">
              <p className="text-contrast-secondary">Màu chữ lỗi</p>
              <label style={{ minWidth: 100, height: 42 }} className="block">
                <input
                  className="w-full h-full bg-transparent"
                  type="color"
                  name="danger"
                  value={state.customOption.danger}
                  onChange={onHandleChangeTheme}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex pt-sm">
          <Button
            className="mr-md"
            disabled={
              state.selected === options.length ||
              state.selected < initialSettingEntity.theme.options.length
                ? true
                : !state.isEdited
            }
            onClick={() => onHandleInsertOrUpdateTheme("update")}
          >
            Cập nhật chủ đề
          </Button>
          <Button
            className="mr-md"
            disabled={!state.isEdited}
            onClick={() => onHandleInsertOrUpdateTheme("insert")}
          >
            Thêm chủ đề mới
          </Button>
          <Button
            className="mr-md"
            color="secondary"
            disabled={
              state.selected === options.length ||
              state.selected < initialSettingEntity.theme.options.length
            }
            onClick={onHandleRemoveTheme}
          >
            Xoá chủ đề
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThemeSetting;
