import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
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

// export interface Palette {
//   common: CommonColors;
//   type: PaletteType;
//   contrastThreshold: number;
//   tonalOffset: PaletteTonalOffset;
//   primary: PaletteColor;
//   secondary: PaletteColor;
//   error: PaletteColor;
//   warning: PaletteColor;
//   info: PaletteColor;
//   success: PaletteColor;
//   grey: Color;
//   text: TypeText;
//   divider: TypeDivider;
//   action: TypeAction;
//   background: TypeBackground;
//   getContrastText: (background: string) => string;
//   augmentColor: {
//     (
//       color: ColorPartial,
//       mainShade?: number | string,
//       lightShade?: number | string,
//       darkShade?: number | string
//     ): PaletteColor;
//     (color: PaletteColorOptions): PaletteColor;
//   };
// }
