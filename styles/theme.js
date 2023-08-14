import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
export const LightTheme = {
  title: 'light',
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1f87f0',
    textColor: '#121212',
    highlightedTextColor: '#000000',
    backgroundColor: '#e0e0e0',
  },
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
};
export const DarkTheme = {
  title: 'dark',
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1f87f0',
    textColor: '#e0e0e0',
    highlightedTextColor: '#ffffff',
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
};
