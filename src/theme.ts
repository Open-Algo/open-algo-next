import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    code: {
      background: React.CSSProperties['color'];
      text: React.CSSProperties['color'];
    };
  }
  interface ThemeOptions {
    code: {
      background: React.CSSProperties['color'];
      text: React.CSSProperties['color'];
    };
  }
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1B91DA',
    },
    secondary: {
      main: '#8899A6',
      light: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#15202B',
    },
    info: {
      main: '#192734',
      light: '#22303C',
    },
    success: {
      main: '#3CD75F',
    },
  },
  code: {
    background: '#FAFAFA',
    text: red.A400,
  },
});

export default theme;