import React, { useState, useEffect } from "react";
import produce from "immer";

import {
  ISpeedTestDataOption,
  useSettings,
  actionToggleSetting,
  actionCreateSpeedTestData,
  actionUpdateSpeedTestData,
  actionDeleteSpeedTestData,
} from "@/modules/settings";

import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import Input from "@/components/atoms/Input";

export interface ISpeedTestDataSettingState {
  option: ISpeedTestDataOption;
  selected: string;
  isEdited: boolean;
}

export const SpeedTestDataSetting: React.FC = () => {
  const {
    settings: { speedTestData },
  } = useSettings();

  const option = speedTestData.options.find(
    (option) => option._id === speedTestData.selected
  ) as ISpeedTestDataOption;

  const [state, setState] = useState<ISpeedTestDataSettingState>({
    option: option,
    selected: speedTestData.selected,
    isEdited: false,
  });

  useEffect(() => {
    setState({
      option: option,
      selected: speedTestData.selected,
      isEdited: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speedTestData.selected]);

  const onToggleSpeedTestData = (SpeedTestDataId: string) => {
    if (SpeedTestDataId === "custom") {
      setState((prevState) => ({
        ...prevState,
        option: {
          ...prevState.option,
          isDefault: false,
        },
        selected: "custom",
      }));
    } else if (SpeedTestDataId === speedTestData.selected) {
      setState({
        option: option,
        selected: speedTestData.selected,
        isEdited: false,
      });
    } else {
      actionToggleSetting("speedTestData", SpeedTestDataId);
    }
  };

  const onChangeSpeedTestData = (e: any) => {
    if (!state.option.isDefault) {
      const { name, value } = e.target;
      setState(
        produce((draft: any) => {
          draft.isEdited = true;
          if (name === "name") {
            draft.option.name = value;
          } else {
            draft.option.value[name] = name === "word" ? value : e.target.checked;
          }
        })
      );
    }
  };

  const onHandleCreateSpeedTestData = () => {
    if (state.selected === "custom") {
      actionCreateSpeedTestData({ name: state.option.name, value: state.option.value });
    }
  };

  const onHandleUpdateSpeedTestData = () => {
    if (!state.option.isDefault && state.selected !== "custom" && state.isEdited) {
      actionUpdateSpeedTestData(state.selected, {
        name: state.option.name,
        value: state.option.value,
      });
    }
  };

  const onHandleDeleteSpeedTestData = () => {
    if (!state.option.isDefault && state.selected !== "custom") {
      actionDeleteSpeedTestData(state.selected);
    }
  };

  return (
    <React.Fragment>
      <div className="my-md">
        <h3 className="text-headline-3 text-contrast-secondary text-opacity-87 font-semibold">
          Tuỳ chọn văn bản kiểm tra tốc độ gõ
        </h3>
      </div>

      <div className="flex flex-wrap my-md">
        {speedTestData.options.map((option, index) => (
          <div key={index} className="mr-md my-sm">
            <Button
              color={state.selected === option._id ? "primary" : "secondary"}
              onClick={() => onToggleSpeedTestData(option._id)}
            >
              {option.name}
            </Button>
          </div>
        ))}
        <div className="my-sm">
          <Button
            color={state.selected === "custom" ? "primary" : "secondary"}
            onClick={() => onToggleSpeedTestData("custom")}
          >
            Tuỳ chọn
          </Button>
        </div>
      </div>

      <div className="my-md mt-lg">
        <div className="my-md">
          <Input
            className="w-full desktop:w-auto"
            placeholder="Tên tuỳ chọn"
            autoComplete="off"
            name="name"
            value={state.option.name}
            onChange={onChangeSpeedTestData}
          />
        </div>
        <div className="my-md">
          <textarea
            style={{ height: 200 }}
            className="w-full desktop:w-640 py-sm px-md border-2 border-contrast-secondary border-opacity-12 hover:border-opacity-24 focus:border-opacity-100 rounded outline-none bg-transparent text-body-1 text-contrast-secondary resize-none"
            placeholder="Danh sách từ"
            name="words"
            value={state.option.value.words}
            onChange={onChangeSpeedTestData}
          ></textarea>
        </div>
        <div className="my-md">
          <Checkbox
            name="isShuffle"
            checked={state.option.value.isShuffle}
            onChange={onChangeSpeedTestData}
          >
            Tự động xáo trộn các từ trong văn bản
          </Checkbox>
        </div>
        <div className="my-md">
          <Checkbox
            name="hasUppercase"
            checked={state.option.value.hasUppercase}
            onChange={onChangeSpeedTestData}
          >
            Tự động thêm chữ hoa và dấu câu
          </Checkbox>
        </div>
      </div>

      <div className="flex my-md">
        <div className="mr-sm">
          <Button
            color="secondary"
            disabled={state.selected !== "custom"}
            onClick={onHandleCreateSpeedTestData}
          >
            Thêm tuỳ chọn
          </Button>
        </div>
        <div className="mr-sm">
          <Button
            color="secondary"
            disabled={option.isDefault || state.selected === "custom"}
            onClick={onHandleUpdateSpeedTestData}
          >
            Cập nhật tuỳ chọn
          </Button>
        </div>
        <div>
          <Button
            color="danger"
            disabled={state.option.isDefault || state.selected === "custom"}
            onClick={onHandleDeleteSpeedTestData}
          >
            Xoá tuỳ chọn
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SpeedTestDataSetting;
2;
