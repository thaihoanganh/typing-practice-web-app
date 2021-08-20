import React, { useState, useEffect } from "react";
import produce from "immer";

import {
  ISpeedTestLevelOption,
  actionToggleSetting,
  useSettings,
  actionCreateSpeedTestLevel,
  actionUpdateSpeedTestLevel,
  actionDeleteSpeedTestLevel,
} from "@/modules/settings";
import Button from "@/components/atoms/Button";
import Radio from "@/components/atoms/Radio";
import Input from "@/components/atoms/Input";

interface ISpeedTestLevelSettingState {
  option: ISpeedTestLevelOption;
  selected: string;
  isEdited: boolean;
}

export const SpeedTestLevelSetting = () => {
  const {
    settings: { speedTestLevel },
  } = useSettings();

  const option = speedTestLevel.options.find(
    (option) => option._id === speedTestLevel.selected
  ) as ISpeedTestLevelOption;

  const [state, setState] = useState<ISpeedTestLevelSettingState>({
    option: option,
    selected: speedTestLevel.selected,
    isEdited: false,
  });

  useEffect(() => {
    setState({
      option: option,
      selected: speedTestLevel.selected,
      isEdited: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speedTestLevel.selected]);

  const onToggleSpeedTestLevel = (speedTestLevelId: string) => {
    if (speedTestLevelId === "custom") {
      setState((prevState) => ({
        ...prevState,
        option: {
          ...prevState.option,
          isDefault: false,
        },
        selected: "custom",
      }));
    } else if (speedTestLevelId === speedTestLevel.selected) {
      setState({
        option: option,
        selected: speedTestLevel.selected,
        isEdited: false,
      });
    } else {
      actionToggleSetting("speedTestLevel", speedTestLevelId);
    }
  };

  const onHandleChangeSpeedTestLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(
      produce((draft: any) => {
        if (!draft.option.isDefault) {
          draft.isEdited = true;
          if (name === "amount") {
            if (!isNaN(value as any)) {
              draft.option.value.amount = Number(value);
            }
          } else {
            draft.option.value.type = value;
          }
        }
      })
    );
  };

  const onHandleCreateSpeedTestLevel = () => {
    if (state.selected === "custom") {
      actionCreateSpeedTestLevel(state.option.value);
    }
  };

  const onHandleUpdateSpeedTestLevel = () => {
    if (!state.option.isDefault && state.selected !== "custom" && state.isEdited) {
      actionUpdateSpeedTestLevel(state.selected, state.option.value);
    }
  };

  const onHandleDeleteSpeedTestLevel = () => {
    if (!state.option.isDefault && state.selected !== "custom") {
      actionDeleteSpeedTestLevel(state.selected);
    }
  };

  return (
    <React.Fragment>
      <div className="my-md">
        <h3 className="text-headline-3 text-contrast-secondary text-opacity-87 font-semibold">
          Tuỳ chọn kiểm tra tốc độ gõ
        </h3>
      </div>
      <div className="flex flex-wrap my-md mb-lg">
        {speedTestLevel.options.map((option, index) => (
          <div className="mr-md my-sm" key={index}>
            <Button
              color={state.selected === option._id ? "primary" : "secondary"}
              onClick={() => onToggleSpeedTestLevel(option._id)}
            >
              {option.name}
            </Button>
          </div>
        ))}
        <div className="my-sm">
          <Button
            color={state.selected === "custom" ? "primary" : "secondary"}
            onClick={() => onToggleSpeedTestLevel("custom")}
          >
            Tuỳ chỉnh
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center my-md">
        <div style={{ minWidth: 250 }} className="w-full desktop:w-auto my-sm">
          <Input
            autoComplete="off"
            name="amount"
            value={state.option.value.amount}
            onChange={onHandleChangeSpeedTestLevel}
            suffix={state.option.value.type === "time" ? "giây" : "từ"}
            fullWidth
          />
        </div>
        <div className="desktop:ml-md my-sm">
          <Radio
            name="type"
            value="time"
            checked={state.option.value.type === "time"}
            onChange={onHandleChangeSpeedTestLevel}
          >
            Giây
          </Radio>
        </div>
        <div className="ml-md my-sm">
          <Radio
            name="type"
            value="word"
            checked={state.option.value.type === "word"}
            onChange={onHandleChangeSpeedTestLevel}
          >
            Từ
          </Radio>
        </div>
      </div>

      <div className="flex my-md">
        <div className="mr-sm">
          <Button
            color="secondary"
            disabled={state.selected !== "custom"}
            onClick={onHandleCreateSpeedTestLevel}
          >
            Thêm tuỳ chọn
          </Button>
        </div>
        <div className="mr-sm">
          <Button
            color="secondary"
            disabled={option.isDefault || state.selected === "custom"}
            onClick={onHandleUpdateSpeedTestLevel}
          >
            Cập nhật tuỳ chọn
          </Button>
        </div>
        <div>
          <Button
            color="danger"
            disabled={state.option.isDefault || state.selected === "custom"}
            onClick={onHandleDeleteSpeedTestLevel}
          >
            Xoá tuỳ chọn
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SpeedTestLevelSetting;
