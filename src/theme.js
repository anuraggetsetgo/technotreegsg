import { createMuiTheme } from "@material-ui/core/styles";
import Exo from './fonts/exo-2-v7-latin-regular.woff2';
import Exobold from './fonts/exo-2-v7-latin-600.woff2';
import Exoheavy from './fonts/exo-2-v7-latin-500.woff2';
import Exothin from './fonts/Exo2-Thin.ttf';
import { colors } from "./Utils/Services";

const exo = {
  fontFamily: "Exo",
  fontStyle: "normal",
  fontWeight: 200,
  src: `local('Exo'),
       local('Exo-Regular') , 
       url(${Exo}) format('woff2');`,
};
const exoHeavy = {
    fontFamily: 'Exo',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 500,
    src: `
      local('Exo'),
      local('Exo-Heavy'),
      url(${Exoheavy}) format('woff2')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };
const exoBold = {
    fontFamily: 'Exo',
    fontStyle: 'bold',
    fontDisplay: 'swap',
    fontWeight: 600,
    src: `
      local('Exo'),
      local('Exo-Bold'),
      url(${Exobold}) format('woff2')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };

const theme = createMuiTheme({

  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    action: {
      disabled: colors.disableButtonColor,
    },
  },
  spacing: (value) => `${value * 8}px`,

  typography: {
    fontFamily: 'Exo, Regular',
    fontWeightBold: 600,
    fontWeightRegular: 200,
    fontWeightMedium: 500,
    //fontFamily: "Poppins,Arial",
    spacing: (value) => value ** 8,
    color: colors.secondary, // '#fff',
    root: {
      color: colors.secondary, 
    },
    p: {
      fontSize: "1em",
      fontWeight: 400,
    },
    h1: {
      fontSize: "48px",
      lineHeight: "54px",
      textShadow: "1px 1px #1b1b1b",
    },
    h2: {
      fontSize: "40px",
      lineHeight: "48px",
      marginBottom: "16px",
    },
    h3: {
      fontSize: "30px",
      lineHeight: "38px",
    },
    h4: {
      fontSize: "1.6em",
      lineHeight: "1.6em",
    },
    h5: {
      fontSize: "1.2em",  
      lineHeight: "1.2px",
    },
    h6: {
      fontSize: "0.8em",
      lineHeight: "22px",
    },
    subtitle1: {
      fontSize: "1.5em",
      lineHeight: "1.2em",
    },
    subtitle2: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 'medium'
    },
    body1:{
      fontSize: '16px',
      fontWeight: 'normal'
    },
    body2:{
      fontSize: '12px',
    },
  },
  MuiButton: {
    root: {
      borderRadius: "50px",
      fontSize: '1.2rem!important'
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": exo
      },
    },
    MuiInputBase:{
      root:{
        caretColor:colors.primary,
        fontSize:'16px'
      },
      input:{
        padding:'12px 0px 4px',
        fontSize:'24px'
      },
    },
    MuiButton: {
      // Name of the rule
      root: {
        //borderRadius: '20px',
        textTransform: "none",
        fontSize: '1.0rem'
      },
      text:{
        color:colors.secondary,
      },
      outlined: {
        padding: "8px 20px",
      },
      contained: {
        padding: "8px 20px",
        borderRadius:'25px',
        width: 'fit-content',
        margin: '10px'
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
    MuiTableCell:{
      root:{padding: '5px 10px',textAlign:'center',
    },
  },
  MuiDialog:{
    paperWidthSm:{minHeight:'90vh',maxHeight:'92vh',minWidth:'80vw',maxWidth:'80vw'}
  },
  MuiChip:{colorPrimary:{fontSize:'1rem'}},
  
  MuiDivider:{
    root:{
      border:'1px solid',
      color:colors.grey,
    }
  }
  
  },
 
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});

export default theme;
