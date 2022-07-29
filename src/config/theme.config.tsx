import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';

type ThemePropsProvider = {
    children : JSX.Element
}

export enum themePalette {
    BG = "#12181b",
    LIME = "#C8FA5F",
    FONT_GLOBAL = "'JetBrains Mono', monospace",
}

const themeStore = createTheme({
    palette : {
        mode : "dark",
        background : {
            default : themePalette.BG,
        },
        primary : {
            main : themePalette.LIME,
        }
    },
    typography : {
        fontFamily : themePalette.FONT_GLOBAL,
        fontSize : 16
    },
    components : {
        MuiButton : {
            defaultProps : {
                style : {
                    textTransform : 'none',
                    boxShadow : 'none',
                    borderRadius : '0.5em',
                    width : 110
                }
            }
        },
        MuiTable : {
            defaultProps : {
                style : {
                    color : themePalette.LIME,
                    fontSize: 18,
                }
            }
        },
        MuiDialogTitle : {
            defaultProps : {
                style : {
                    color : themePalette.LIME,
                    fontSize : 22,
                    textAlign : 'center'
                }
            }
        }
    }
});

export const ThemeConfig : React.FC<ThemePropsProvider> = ({children})  => {
  return(
    <ThemeProvider theme={themeStore}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  );
}
