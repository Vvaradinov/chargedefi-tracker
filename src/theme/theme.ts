
import {extendTheme} from "@chakra-ui/react";
import "@fontsource/ubuntu-mono/700.css"
import { theme } from '@chakra-ui/pro-theme'


// export const theme = extendTheme({
// })

import {
    black,
    purple,
    teal,
    grey,
    blue,
    red,
    white,
    peg,
    hover,
} from '../common/assets/charge-styles';
// import { light } from '@pancakeswap-libs/uikit';

export const myTheme = extendTheme({
    colors: { ...theme.colors, brand: theme.colors.purple },
    fonts: {
        body: "Ubuntu Mono",
        heading: "Ubuntu Mono"
    },
    layerStyles: {
        charge: {
            w: "50px",
            h: "50px",
        },
        static: {
            w: "50px",
            h: "50px",
        },
        pulse: {
            w: "50px",
            h: "50px",
        },
        "static-busd": {
            w: "83px",
            h: "50px",
        },
        "charge-busd": {
            w: "83px",
            h: "50px",
        }
    },
    borderRadius: 12,
    color: {
        black,
        grey,
        purple,
        blue,
        primary: {
            light: red[200],
            main: red[500],
        },
        secondary: {
            main: teal[200],
        },
        white,
        teal,
        peg,
        hover,
    },
    // ...light,
    radii: {
        small: '4px',
        default: '50px',
        card: '50px',
        circle: '50%',
    },
    zIndices: {
        dropdown: 10,
        modal: 100,
    },
    isDark: true,
    card: {
        background: '#27262c',
        borderRadius: '50px',
        boxShadow:
            '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
        boxShadowActive:
            '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
        boxShadowSuccess:
            '0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)',
        boxShadowWarning:
            '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
        cardHeaderBackground: {
            default: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
            blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
            violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
        },
        dropShadow: 'drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))',
    },
    toggle: {
        handleBackground: '#27262c',
    },
    nav: {
        background: '#27262c',
        hover: '#473d5d',
    },
    modal: {
        borderRadius: '1px',
        background: blue[300],
        button: {
            borderRadius: '50px',
            background: blue[100],
        },
    },
    radio: {
        handleBackground: '#27262c',
    },

    tooltip: {
        text: blue[200],
    },
    siteWidth: '78vw',
    spacing: {
        0: 2,
        1: 4,
        2: 8,
        3: 16,
        4: 24,
        5: 32,
        6: 48,
        7: 64,
    },
    topBarSize: 120,

});

export default myTheme;
