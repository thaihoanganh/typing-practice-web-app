import React from "react";

import { actionChangeSound, useSetting } from "@/modules/setting";
import Button from "@/components/atoms/Button";

export const SoundSetting: React.FC = () => {
  const { setting } = useSetting();

  const onToggleSound = (selected: number) => {
    if (selected !== setting.sound.selected) actionChangeSound(selected);
  };

  return (
    <div className="p-md">
      {setting.sound.options.map((option, index) => (
        <Button
          className="mr-xs"
          key={index}
          variant={index === setting.sound.selected ? "container" : "text"}
          onClick={() => onToggleSound(index)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default SoundSetting;
