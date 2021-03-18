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
});

export default theme;
