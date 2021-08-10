import Color from "color";

export const getContrastColor = (colorValue: string) => {
  return Color(colorValue).isLight() ? "#000000" : "#FFFFFF";
};

export const setVariableColor = (variableName: string, colorValue: string) => {
  document.documentElement.style.setProperty(variableName, Color(colorValue).array().join(","));
};
