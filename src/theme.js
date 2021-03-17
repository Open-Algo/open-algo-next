import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1B91DA',
    },
    secondary: {
      main: '#8899A6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#15202B',
    },
    info: {
      main: '#192734',
      light: '#22303c',
    },
  },
});

export default theme;
