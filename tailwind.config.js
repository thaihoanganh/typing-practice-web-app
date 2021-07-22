module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        desktop: "1024px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "32px",
        xl: "64px",
        640: "640px",
        960: "960px",
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
    },
    backgroundColor: {
      primary: {
        DEFAULT: "#FFFFFF",
      },
      secondary: {
        DEFAULT: "#FDFDFD",
      },
      accent: {
        DEFAULT: "#D32F2F",
      },
      contrast: {
        DEFAULT: "#000000",
      },
    },
    textColor: {
      primary: {
        DEFAULT: "#000000",
      },
      accent: {
        DEFAULT: "#D32F2F",
      },
      contrast: {
        DEFAULT: "#FFFFFF",
      },
    },
    borderColor: {
      primary: {
        DEFAULT: "#000000",
      },
      accent: {
        DEFAULT: "#D32F2F",
      },
    },
    fontSize: {
      "headline-1": "2.125rem",
      "headline-2": "1.5rem",
      "headline-3": "1.25",
      "subtitle-1": "1rem",
      "subtitle-2": "0.875rem",
      "body-1": "1rem",
      "body-2": "0.875rem",
      button: "0.875rem",
      caption: "0.75rem",
      overline: "0.625rem",
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
