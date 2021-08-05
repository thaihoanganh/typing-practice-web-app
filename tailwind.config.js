const customColor =
  (colorName) =>
  ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${colorName}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${colorName}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${colorName}))`;
  };

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
    screens: {
      tablet: "640px",
      desktop: "1024px",
    },
    spacing: {
      0: "0",
      640: "640px",
      960: "960px",
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "32px",
      xl: "64px",
    },
    opacity: {
      0: "0",
      4: "0.04",
      8: "0.08",
      12: "0.12",
      16: "0.16",
      24: "0.24",
      32: "0.32",
      36: "0.36",
      48: "0.48",
      60: "0.60",
      87: "0.87",
      100: "1",
    },
    colors: {
      primary: customColor("--primary"),
      "contrast-primary": customColor("--contrast-primary"),
      secondary: customColor("--secondary"),
      "contrast-secondary": customColor("--contrast-secondary"),
      danger: customColor("--danger"),
      "contrast-danger": customColor("--contrast-danger"),
    },
    fontSize: {
      "headline-1": "2.125rem",
      "headline-2": "1.5rem",
      "headline-3": "1.25",
      "body-1": "1rem",
      "body-2": "0.875rem",
      button: "0.875rem",
      caption: "0.75rem",
    },
  },
  variants: {
    extend: {
      margin: ["first", "last"],
      padding: ["first", "last"],
      borderColor: ["disabled", "hover", "focus", "active"],
      backgroundColor: ["disabled", "hover", "focus", "active"],
      backgroundOpacity: ["disabled", "hover", "focus", "active"],
      textOpacity: ["disabled", "hover", "focus", "active"],
      opacity: ["disabled", "hover", "focus", "active"],
      pointerEvents: ["disabled", "hover", "focus", "active"],
    },
  },
  plugins: [],
};
