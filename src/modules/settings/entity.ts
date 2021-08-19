export type ISoundOption = {
  _id: string;
  name: string;
  isDefault: boolean;
  value: boolean;
};

export type IThemeOption = {
  _id: string;
  name: string;
  isDefault: boolean;
  value: {
    primary: string;
    secondary: string;
    danger: string;
  };
};

export type ISpeedTestLevelOption = {
  _id: string;
  name: string;
  isDefault: boolean;
  value: {
    amount: number;
    type: "time" | "word";
  };
};

export type ISpeedTestDataOption = {
  _id: string;
  name: string;
  isDefault: boolean;
  value: {
    words: string;
    isShuffle: boolean;
    hasUppercase: boolean;
  };
};

export interface ISettingsEntity {
  sound: {
    options: ISoundOption[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
  theme: {
    options: IThemeOption[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
  speedTestLevel: {
    options: ISpeedTestLevelOption[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
  speedTestData: {
    options: ISpeedTestDataOption[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
}
