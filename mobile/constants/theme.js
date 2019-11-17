const colors = {
    accent: "#F3534A",
    primary: "#0AC4BA",
    secondary: "#2BDA8E",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
    bgPrimary: "#0b0c0d",
    bgSecondary: "white",
    textPrimary: "white",
    textSecondary: "#b0c0d0",
    textTertiary: "#ffcc07",
    lightGrey: '#282c34',
    darkGrey: '#171a1a',
    lightBlack: '#333333'
};

const sizes = {
    // global sizes
    base: 8,
    font: 14,
    radius: 6,
    padding: 25,

    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
};

const fonts = {
    h1: {
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    },
};

const icons = {
    play: require('../assets/icons/pause.png'),
    default: require('../assets/icons/default.png'),
};

const bluish = {
    black1: '#000000',

    blue1: '#171a1a',
    blue2: '#0b0c0d',
    blue3: '#0b0c22',
    blue4: '#1a1b30',
    blue5: '#20232f',

    green1: '#387f11',
    green2: '#75a522',
    green3: '#73A421',
    green4: '#A49F2E',
    green5: '#013220',

    grey1: '#2B2B2B',
    grey2: '#313335',
    grey3: '#3C3F41',
};

const borderRadius = 2;
const fontFamily = 'URW-Geometric-Medium';

export {colors, sizes, fonts, icons, bluish, borderRadius, fontFamily};
