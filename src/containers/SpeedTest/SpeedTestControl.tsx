import React, { useState, useEffect } from "react";
import { useSetting } from "@/modules/setting";
import { useSpeedTest, SpeedTestContext } from "@/modules/speedtest";
import { actionCreateTestDataFromString } from "@/modules/speedtest";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { SoundSetting } from "@/containers/Setting";

export const SpeedTestControl: React.FC = () => {
  const {
    setting: { topTrendingWords },
    settingStatus,
  } = useSetting();
  const { speedTest } = useSpeedTest();

  const [state, setState] = useState({
    count: 0,
    isOpenSetting: false,
    options: [
      {
        name: "60 giây",
        type: "time",
        value: 60,
      },
      {
        name: "30 giây",
        type: "time",
        value: 30,
      },
      {
        name: "5 giây",
        type: "time",
        value: 5,
      },
    ],
    selected: 0,
  });

  useEffect(() => {
    onHandleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingStatus, state.selected]);

  useEffect(() => {
    let timer: any;
    if (speedTest.isTyping && state.options[state.selected].type === "time") {
      if (state.count > 0) {
        timer = setTimeout(() => {
          setState((prevState) => ({ ...prevState, count: prevState.count - 1 }));
        }, 1000);
      } else {
        SpeedTestContext.setState((prevState) => ({
          ...prevState,
          entity: {
            ...prevState.entity,
            isCompleted: true,
            isTyping: false,
          },
        }));
      }
    }

    return () => {
      if (speedTest.isTyping && state.options[state.selected].type === "time") {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speedTest.isTyping, state.count]);

  const onHandleReset = () => {
    if (settingStatus === "READY") {
      actionCreateTestDataFromString(topTrendingWords.options[topTrendingWords.selected].words);
      setState((prevState) => ({
        ...prevState,
        count: prevState.options[prevState.selected].value,
      }));
    }
  };

  const onToggleOption = (selected: number) => {
    setState((prevState) => ({
      ...prevState,
      count: prevState.options[selected].value,
      selected,
    }));
  };

  const onToggleSetting = () => {
    setState((prevState) => ({
      ...prevState,
      isOpenSetting: !prevState.isOpenSetting,
    }));
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={state.isOpenSetting}
        onClickOutside={() => {
          onToggleSetting();
        }}
      >
        <div className="p-md rounded bg-secondary">
          <div className="m-md">
            <div className="text-headline-2 text-contrast-secondary">Tuỳ chỉnh văn bản</div>
            <div className="p-md">
              <textarea
                style={{ height: 180 }}
                className="w-full py-sm px-md rounded border border-contrast-secondary border-opacity-12 focus:outline-none bg-transparent text-contrast-secondary resize-none"
              />
            </div>
          </div>
          <div className="m-md">
            <SoundSetting />
          </div>
        </div>
      </Modal>
      <div className="flex">
        <div
          style={{ width: 40 }}
          className="h-full my-auto mr-sm rounded text-contrast-secondary text-headline-2 font-semibold"
        >
          {state.count}
        </div>
        <div className="ml-sm">
          <Button color="secondary" disabled={!speedTest.isCompleted} onClick={onHandleReset}>
            Bắt đầu lại
          </Button>
        </div>

        <div className="flex ml-auto">
          {state.options.map((options, index) => (
            <div key={index} className="mr-sm">
              <Button
                color={index === state.selected ? "primary" : "secondary"}
                onClick={() => onToggleOption(index)}
              >
                {options.name}
              </Button>
            </div>
          ))}
          <Button color="secondary" onClick={onToggleSetting}>
            Tuỳ chỉnh
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SpeedTestControl;
