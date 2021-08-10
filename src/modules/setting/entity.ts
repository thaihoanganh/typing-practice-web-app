import { z } from "zod";
import { settingSchema } from ".";

export type ISettingEntity = z.infer<typeof settingSchema>;

export const initialSettingEntity: ISettingEntity = {
  theme: {
    options: [
      {
        name: "Light",
        primary: "#161616",
        secondary: "#FBFBFB",
        danger: "#FD8181",
      },
      {
        name: "Dark",
        primary: "#FAFAFA",
        secondary: "#121212",
        danger: "#FD8181",
      },
    ],
    selected: 0,
  },
  sound: {
    options: [
      {
        name: "Bật",
      },
      {
        name: "Tắt",
      },
    ],
    selected: 0,
  },
  lesson: {
    options: [
      {
        name: "Tiếng anh",
        data: [
          101, 110, 105, 116, 114, 108, 115, 97, 117, 111, 100, 121, 99, 104, 103, 109, 112, 98,
          107, 118, 119, 102, 122, 120, 113, 106,
        ],
      },
    ],
    selected: 0,
  },
  lessonLevel: {
    options: [
      {
        name: "Dễ",
        accuracyMin: 0.85,
        accuracyMax: 1,
        wordsPerMinuteMin: 25,
        wordsPerMinuteMax: 50,
      },
      {
        name: "Trung bình",
        accuracyMin: 0.9,
        accuracyMax: 1,
        wordsPerMinuteMin: 30,
        wordsPerMinuteMax: 75,
      },
      {
        name: "Khó",
        accuracyMin: 0.95,
        accuracyMax: 1,
        wordsPerMinuteMin: 35,
        wordsPerMinuteMax: 105,
      },
    ],
    selected: 0,
  },
};
