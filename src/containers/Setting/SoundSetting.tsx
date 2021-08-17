import React from "react";

import { actionToggleSetting, useSettings } from "@/modules/settings";
import Button from "@/components/atoms/Button";

export const SoundSetting = () => {
  const {
    settings: { sound },
  } = useSettings();

  const onHandleClick = (themeId: string) => {
    if (themeId !== sound.selected) {
      actionToggleSetting("sound", themeId);
    }
  };

  return (
    <React.Fragment>
      <div>
        <h3 className="text-headline-3 text-contrast-secondary text-opacity-87 font-semibold">
          Âm thanh
        </h3>
      </div>
      <div className="flex pt-md">
        {sound.options.map((option, index) => (
          <div className="mr-md" key={index}>
            <Button
              color={sound.selected === option._id ? "primary" : "secondary"}
              onClick={() => onHandleClick(option._id)}
            >
              {option.name}
            </Button>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default SoundSetting;
