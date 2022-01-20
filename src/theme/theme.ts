
import {extendTheme} from "@chakra-ui/react";
import "@fontsource/ubuntu-mono/700.css"


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

export const theme = extendTheme({
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
    colors: {
        failure: '#ED4B9E',
        primary: grey.primary,
        primaryBright: '#53DEE9',
        primaryDark: '#0098A1',
        secondary: '#9A6AFF',
        success: '#31D0AA',
        warning: '#FFB237',
        binance: '#F0B90B',
        background: '#100C18',
        backgroundDisabled: '#3c3742',
        contrast: '#FFFFFF',
        dropdown: '#1E1D20',
        invertedContrast: '#191326',
        input: '#483f5a',
        inputSecondary: '#66578D',
        tertiary: blue[200],
        text: grey.primary,
        textDisabled: '#666171',
        textSubtle: '#A28BD4',
        borderColor: 'transparent',
        card: '#27262c',
        gradients: {
            bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
        },
        blue: {
            100: '#41B1EF',
            200: '#3B67B9',
            300: '#3B67B9',

        }
    },
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

export default theme;
