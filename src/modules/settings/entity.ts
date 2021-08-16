export interface ISettingsEntity {
  sound: {
    options: {
      _id: string;
      name: string;
      isDefault: boolean;
      value: boolean;
    }[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
  theme: {
    options: {
      _id: string;
      name: string;
      isDefault: boolean;
      value: {
        primary: string;
        secondary: string;
        danger: string;
      };
    }[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
  speedTest: {
    options: {
      _id: string;
      name: string;
      isDefault: boolean;
      value: {
        amount: number;
        type: "time" | "word";
      };
    }[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
  topTrendingWords: {
    options: {
      _id: string;
      name: string;
      isDefault: boolean;
      value: {
        words: string;
        isShuffle: boolean;
        hasUppercase: boolean;
      };
    }[];
    customizable: boolean;
    primaryDefault: string;
    selected: string;
  };
}
