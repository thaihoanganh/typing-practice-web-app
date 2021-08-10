import React, { useState, useEffect } from "react";
import {
  useSetting,
  initialSettingEntity,
  lessonLevelSchema,
  actionUpdateSetting,
} from "@/modules/setting";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { FormControl } from "@/components/molecules/Form";

export const LessonLevelSetting = () => {
  const { setting, settingStatus } = useSetting();
  const { options, selected } = setting.lessonLevel;

  const [state, setState] = useState({
    customOption: { ...options[selected] },
    errorMessage: {
      name: "",
      wordsPerMinuteMin: "",
      wordsPerMinuteMax: "",
      accuracyMin: "",
      accuracyMax: "",
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
          wordsPerMinuteMin: "",
          wordsPerMinuteMax: "",
          accuracyMin: "",
          accuracyMax: "",
        },
        isEdited: false,
        selected,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingStatus]);

  const onToggleLevel = (lessonLevelSelect: number | "custom") => {
    const cloneState = { ...state };
    if (lessonLevelSelect === "custom") {
      cloneState.customOption = { ...options[selected] };
      cloneState.selected = options.length;
    } else {
      cloneState.customOption = { ...options[lessonLevelSelect] };
      cloneState.selected = lessonLevelSelect;
      actionUpdateSetting({
        ...setting,
        lessonLevel: {
          ...setting.lessonLevel,
          selected: lessonLevelSelect,
        },
      });
    }
    cloneState.errorMessage = {
      name: "",
      wordsPerMinuteMin: "",
      wordsPerMinuteMax: "",
      accuracyMin: "",
      accuracyMax: "",
    };
    cloneState.isEdited = false;
    setState(cloneState);
  };

  const onHandleChangeLevel = (e: any) => {
    const { name, value } = e.target;
    const cloneState: any = { ...state };
    if (name === "name") {
      cloneState.customOption.name = value;
      cloneState.errorMessage[name] = "";
      cloneState.isEdited = true;
    } else if (!isNaN(value as any) && value < 10000) {
      if (name === "wordsPerMinuteMin" || name === "wordsPerMinuteMax") {
        cloneState.customOption[name] = Number(value);
        cloneState.errorMessage[name] = "";
        cloneState.isEdited = true;
      } else if (value <= 100) {
        cloneState.customOption[name] = value / 100;
        cloneState.errorMessage[name] = "";
        cloneState.isEdited = true;
      }
    }
    setState(cloneState);
  };

  const onHandleInsertOrUpdateLevel = (type: "insert" | "update") => {
    const validName: any = options.find((option) => option.name === state.customOption.name);
    const cloneState: any = { ...state };

    if (type === "insert" ? validName : validName && validName.name !== options[selected].name) {
      cloneState.errorMessage.name = "Tên cấp độ đã tồn tại";
    } else {
      try {
        lessonLevelSchema.parse(cloneState.customOption);
        if (cloneState.customOption.wordsPerMinuteMin > cloneState.customOption.wordsPerMinuteMax) {
          cloneState.errorMessage.wordsPerMinuteMax = "Tốc độ gõ tối đa phải lớn hơn tối thiểu";
        } else if (cloneState.customOption.accuracyMin > cloneState.customOption.accuracyMax) {
          cloneState.errorMessage.accuracyMax = "Độ chính xác tối đa phải lớn hơn tối thiểu";
        } else {
          if (type === "insert") {
            actionUpdateSetting({
              ...setting,
              lessonLevel: {
                options: [...options, { ...cloneState.customOption }],
                selected: options.length,
              },
            });
            cloneState.selected = options.length;
          } else {
            const cloneSetting = { ...setting };
            cloneSetting.lessonLevel.options[selected] = { ...cloneState.customOption };
            actionUpdateSetting(cloneSetting);
          }
          cloneState.isEdited = false;
        }
      } catch (error) {
        error.issues.map((err: any) => {
          cloneState.errorMessage[err.path[0]] = "Không hợp lệ";
        });
      }
    }
    setState(cloneState);
  };

  const onHandleRemoveLevel = () => {
    const cloneSetting = { ...setting };
    cloneSetting.lessonLevel.options.splice(selected, 1);
    cloneSetting.lessonLevel.selected = 0;
    actionUpdateSetting(cloneSetting);
  };

  return (
    <React.Fragment>
      <div className="text-headline-2 text-contrast-secondary">Cấp độ luyện tập</div>
      <div className="p-md">
        <div className="flex">
          {options.map((option, index) => (
            <div className="mr-md" key={index}>
              <Button
                color={index === state.selected ? "primary" : "secondary"}
                onClick={() => onToggleLevel(index)}
              >
                {option.name}
              </Button>
            </div>
          ))}
          <div>
            <Button
              color={state.selected === options.length ? "primary" : "secondary"}
              onClick={() => onToggleLevel("custom")}
            >
              Tuỳ chỉnh
            </Button>
          </div>
        </div>
        <div className="pt-md">
          <div className="mr-md">
            <FormControl label="Tên cấp độ" errorMessage={state.errorMessage.name}>
              <Input
                style={{ width: 250 }}
                name="name"
                autoComplete="off"
                value={state.customOption.name}
                onChange={onHandleChangeLevel}
              />
            </FormControl>
          </div>
        </div>
        <div className="flex pt-md">
          <div className="mr-md">
            <FormControl
              label="Tốc độ gõ tối thiểu"
              errorMessage={state.errorMessage.wordsPerMinuteMin}
            >
              <Input
                style={{ width: 250 }}
                name="wordsPerMinuteMin"
                autoComplete="off"
                suffix="wpm"
                value={state.customOption.wordsPerMinuteMin}
                onChange={onHandleChangeLevel}
              />
            </FormControl>
          </div>
          <div className="mr-md">
            <FormControl
              label="Tốc độ gõ tối đa"
              errorMessage={state.errorMessage.wordsPerMinuteMax}
            >
              <Input
                style={{ width: 250 }}
                name="wordsPerMinuteMax"
                autoComplete="off"
                suffix="wpm"
                value={state.customOption.wordsPerMinuteMax}
                onChange={onHandleChangeLevel}
              />
            </FormControl>
          </div>
        </div>
        <div className="flex pt-md">
          <div className="mr-md">
            <FormControl
              label="Độ chính xác tối thiểu"
              errorMessage={state.errorMessage.accuracyMin}
            >
              <Input
                style={{ width: 250 }}
                name="accuracyMin"
                autoComplete="off"
                suffix="%"
                value={(state.customOption.accuracyMin * 100).toFixed(0)}
                onChange={onHandleChangeLevel}
              />
            </FormControl>
          </div>
          <div className="mr-md">
            <FormControl label="Độ chính xác tối đa" errorMessage={state.errorMessage.accuracyMax}>
              <Input
                style={{ width: 250 }}
                name="accuracyMax"
                autoComplete="off"
                suffix="%"
                value={(state.customOption.accuracyMax * 100).toFixed(0)}
                onChange={onHandleChangeLevel}
              />
            </FormControl>
          </div>
        </div>
        <div className="flex pt-sm">
          <Button
            className="mr-md"
            disabled={
              state.selected === options.length ||
              state.selected < initialSettingEntity.lessonLevel.options.length
                ? true
                : !state.isEdited
            }
            onClick={() => onHandleInsertOrUpdateLevel("update")}
          >
            Cập nhật cấp độ
          </Button>
          <Button
            className="mr-md"
            disabled={!state.isEdited}
            onClick={() => onHandleInsertOrUpdateLevel("insert")}
          >
            Thêm cấp độ mới
          </Button>
          <Button
            className="mr-md"
            color="secondary"
            disabled={
              state.selected === options.length ||
              state.selected < initialSettingEntity.lessonLevel.options.length
            }
            onClick={onHandleRemoveLevel}
          >
            Xoá cấp độ
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LessonLevelSetting;
