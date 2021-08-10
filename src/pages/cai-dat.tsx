import React from "react";

import { SoundSetting, ThemeSetting, LessonLevelSetting } from "@/containers/Setting";

const SettingPage = () => {
  return (
    <div className="p-lg">
      <div className="my-lg">
        <LessonLevelSetting />
      </div>
      <div className="my-lg">
        <ThemeSetting />
      </div>
      <div className="mt-lg">
        <SoundSetting />
      </div>
    </div>
  );
};

export default SettingPage;
