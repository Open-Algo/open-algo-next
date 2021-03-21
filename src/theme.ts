import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    code: {
      background: React.CSSProperties['color'];
      text: React.CSSProperties['color'];
    };
    difficulty: {
      easy: { main: React.CSSProperties['color'] };
      medium: { main: React.CSSProperties['color'] };
      hard: { main: React.CSSProperties['color'] };
      very_hard: { main: React.CSSProperties['color'] };
    };
    solution: {
      solution: { main: React.CSSProperties['color'] };
      explanation: { main: React.CSSProperties['color'] };
      template: { main: React.CSSProperties['color'] };
      video: { main: React.CSSProperties['color'] };
    };
  }
  interface ThemeOptions {
    code: {
      background: React.CSSProperties['color'];
      text: React.CSSProperties['color'];
    };
    difficulty: {
      easy: { main: React.CSSProperties['color'] };
      medium: { main: React.CSSProperties['color'] };
      hard: { main: React.CSSProperties['color'] };
      very_hard: { main: React.CSSProperties['color'] };
    };
    solution: {
      solution: { main: React.CSSProperties['color'] };
      explanation: { main: React.CSSProperties['color'] };
      template: { main: React.CSSProperties['color'] };
      video: { main: React.CSSProperties['color'] };
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
  difficulty: {
    easy: {
      main: '#3CD75F',
    },
    medium: {
      main: '#1B91DA',
    },
    hard: {
      main: red.A400,
    },
    very_hard: {
      main: '#282828',
    },
  },
  solution: {
    solution: {
      main: '#0075ca',
    },
    explanation: {
      main: '#7057ff',
    },
    template: {
      main: '#a2eeef',
    },
    video: {
      main: '#F90201',
    },
  },
});

export default theme;
