import { createMuiTheme } from "@material-ui/core/styles";

import Poppins from "./fonts/poppins-v15-latin-regular.woff";

import { colors } from "./services";

const poppins = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  src: `local('Poppins'),
       local('Poppins-Regular') , 
       url(${Poppins}) format('woff');`,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  spacing: (value) => `${value * 8}px`,
  typography: {
    fontFamily: "Poppins,Arial",
    spacing: (value) => value ** 8,
    color: colors.secondary,

    root: {
      color: colors.secondary,
    },
    body1: {
      fontSize: "1.3rem",
    },
    h1: {
      fontSize: "48px",
      lineHeight: "54px",
      marginBottom: "24px",
      letterSpacing: "4px",
    },
    h2: {
      fontSize: "40px",
      lineHeight: "48px",
      marginBottom: "16px",
    },
    h3: {
      fontSize: "32px",
      lineHeight: "36px",
    },
    h4: {
      fontSize: "24px",
      lineHeight: "28px",
    },
    h5: {
      fontSize: "18px",
      lineHeight: "24px",
    },
    h6: {
      fontSize: "16px",
      lineHeight: "22px",
    },
    h7: {
      fontSize: "14px",
      lineHeight: "22px",
    },
    subtitle1: {
      fontSize: "1.5rem",
      lineHeight: "2.2rem",
    },
    subtitle2: {
      fontSize: "1.2rem",
      lineHeight: "1.8rem",
    },
  },
  MuiButton: {
    root: {
      borderRadius: "50px",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [poppins],
      },
    },
    MuiButton: {
      // Name of the rule
      root: {
        //borderRadius: '20px',
        textTransform: "none",
      },
      outlined: {
        padding: "8px 20px",
      },
      contained: {
        padding: "8px 20px",
      },
      containedPrimary: {
        color: colors.secondary,
      },
    },

    MuiSelect: {
      root: { color: "#c0c0c0" },
    },
    MuiList: {
      root: { background: "none" },
    },
    MuiTextField: {
      root: {
        margin: "10px",
        width: "25ch",
      },
    },
  },
  props: {
    // Name of the component ️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});

export default theme;
