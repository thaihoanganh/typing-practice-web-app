import React from "react";
import { useSetting, actionUpdateSetting } from "@/modules/setting";
import Button from "@/components/atoms/Button";

export const SoundSetting: React.FC = () => {
  const { setting } = useSetting();
  const { options, selected } = setting.sound;

  const onToggleSound = (soundSelected: number) => {
    actionUpdateSetting({
      ...setting,
      sound: {
        ...setting.sound,
        selected: soundSelected,
      },
    });
  };

  return (
    <React.Fragment>
      <div className="text-headline-2 text-contrast-secondary">Âm thanh</div>
      <div className="p-md">
        <div className="flex">
          {options.map((option, index) => (
            <div className="mr-md" key={index}>
              <Button
                color={index === selected ? "primary" : "secondary"}
                onClick={() => onToggleSound(index)}
              >
                {option.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SoundSetting;
