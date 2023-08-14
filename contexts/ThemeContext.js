import {createContext} from 'react';
import {DarkTheme, LightTheme} from '../styles/theme';

export const ThemeContext = createContext(DarkTheme);
export const SetThemeContext = createContext(null);
