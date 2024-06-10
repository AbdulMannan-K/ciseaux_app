import { createContext } from 'react';

export const themes = {
    primaryBlue:'#6A7FDB',
    primarySilver:'#BFC1C2',
    primaryLilac:'#C8A2C8',
    primaryPearl:'#F2EDE4',
    primaryBlack:'#343434',
};

export const ThemeContext = createContext(themes);