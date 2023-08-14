import React, {useContext, useEffect, useState} from 'react';
import {SetThemeContext, ThemeContext} from './contexts/ThemeContext';
import {DataContext, DataContextProvider} from './contexts/DataContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './components/Home';
import Options from './components/Options';
import Loading from './components/Loading';
import {StatusBar} from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import {DarkTheme} from './styles/theme';
import {PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();
const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

const App = () => {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState(useContext(ThemeContext));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getThemeData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('theme');
        if (jsonValue !== null) {
          setTheme(jsonValue !== null ? JSON.parse(jsonValue) : null);
          console.log(JSON.parse(jsonValue).title);
        } else {
          setTheme(DarkTheme);
          console.log(JSON.parse(jsonValue).title);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setData(data);
      } catch (e) {
        console.error(e);
      }
    };
    const mountComponent = async () => {
      try {
        getThemeData();
        fetchData();
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    mountComponent();
  }, []);

  useEffect(() => {
    const changeNavBarColor = async () => {
      await NavigationBar.setBackgroundColorAsync(theme.colors.backgroundColor);
    };
    changeNavBarColor();
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <SetThemeContext.Provider value={setTheme}>
        <DataContext.Provider value={data}>
          <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {isLoading ? (
                  <Stack.Screen name="Loading" component={Loading} />
                ) : (
                  <Stack.Screen name="Home" component={Home} />
                )}
              </Stack.Navigator>
              <StatusBar style={theme.title === 'dark' ? 'light' : 'dark'} />
            </NavigationContainer>
          </PaperProvider>
        </DataContext.Provider>
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
