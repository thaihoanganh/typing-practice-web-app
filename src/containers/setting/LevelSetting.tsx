import React, { useState, useEffect } from "react";

import { useSetting, actionChangeLevel } from "@/modules/setting";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";

export const LevelSetting: React.FC = () => {
  const {
    setting: {
      level: { options, selected },
    },
  } = useSetting();

  const [state, setState] = useState<any>({
    levelSelected: 0,
    levelValue: options[selected],
    customLevelErrorMessage: null,
  });

  useEffect(() => {
    setState((prevState: any) => ({
      ...prevState,
      levelSelected: selected,
      levelValue: options[selected],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const onToggleLevel = (value: number) => {
    setState((prevState: any) => ({
      ...prevState,
      levelSelected: value,
      levelValue: options[value],
      customLevelErrorMessage: null,
    }));
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = e.target.value;

    if (!isNaN(value as any)) {
      const cloneState: any = { ...state };
      const path = e.target.name.split("-");

      if (path[0] === "wpm") {
        cloneState.levelValue[path[0]][path[1]] = value;
      } else {
        cloneState.levelValue[path[0]][path[1]] = value / 100;
      }

      if (cloneState.levelValue.accuracy.min > cloneState.levelValue.accuracy.max) {
        cloneState.customLevelErrorMessage = "Độ chính xác tối thiểu phải nhỏ hơn độ chính xác tối đa";
        return setState(cloneState);
      }
      if (cloneState.levelValue.wpm.min > cloneState.levelValue.wpm.max) {
        cloneState.customLevelErrorMessage = "Tốc độ gõ tối thiểu phải nhỏ hơn tốc độ gõ tối đa";
        return setState(cloneState);
      }

      cloneState.customLevelErrorMessage = "";
      setState(cloneState);
    }
  };

  const onHandleUpdateLevel = () => {
    if (state.levelSelected === options.length - 1) {
      setState((prevState: any) => ({
        ...prevState,
        levelSelected: selected,
        levelValue: options[selected],
        customLevelErrorMessage: null,
      }));
      actionChangeLevel(state.levelValue);
    } else {
      actionChangeLevel(state.levelSelected);
    }
  };

  return (
    <div className="p-md">
      {options.map((option, index) => (
        <Button
          className="mr-xs"
          key={index}
          variant={index === state.levelSelected ? "container" : "text"}
          onClick={() => onToggleLevel(index)}
        >
          {option.name}
        </Button>
      ))}
      <div className="flex my-sm">
        <div className="mr-sm">
          <div className="h-7">
            <Text>Tốc độ gõ tối thiểu (WPM)</Text>
          </div>
          <Input
            name="wpm-min"
            value={state.levelValue.wpm.min}
            disabled={state.levelSelected !== options.length - 1}
            onChange={onHandleChange}
          />
        </div>
        <div className="ml-sm">
          <div className="h-7">
            <Text>Tốc độ gõ tối đa (WPM)</Text>
          </div>
          <Input
            name="wpm-max"
            value={state.levelValue.wpm.max}
            disabled={state.levelSelected !== options.length - 1}
            onChange={onHandleChange}
          />
        </div>
      </div>
      <div className="flex my-sm">
        <div className="mr-sm">
          <div className="h-7">
            <Text>Độ chính xác tối thiểu (%)</Text>
          </div>
          <Input
            name="accuracy-min"
            value={Math.floor(state.levelValue.accuracy.min * 100)}
            disabled={state.levelSelected !== options.length - 1}
            onChange={onHandleChange}
          />
        </div>
        <div className="ml-sm">
          <div className="h-7">
            <Text>Độ chính xác tối đa (%)</Text>
          </div>
          <Input
            name="accuracy-max"
            value={Math.floor(state.levelValue.accuracy.max * 100)}
            disabled={state.levelSelected !== options.length - 1}
            onChange={onHandleChange}
          />
        </div>
      </div>
      <div className="my-sm h-5">
        <Text color="danger">{state.levelSelected === options.length - 1 && state.customLevelErrorMessage}</Text>
      </div>

      <Button
        disabled={
          state.levelSelected === options.length - 1
            ? state.levelSelected === selected
              ? state.customLevelErrorMessage === null || state.customLevelErrorMessage !== ""
              : false
            : state.levelSelected === selected
        }
        onClick={onHandleUpdateLevel}
      >
        Cập nhật cấp độ
      </Button>
    </div>
  );
};

export default LevelSetting;
