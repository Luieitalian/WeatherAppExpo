import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Switch,
  Button,
  ActivityIndicator,
  Portal,
  Modal,
} from 'react-native-paper';
import {DarkTheme, LightTheme} from '../styles/theme';
import {SetThemeContext, ThemeContext} from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../contexts/DataContext';
import Loading from './Loading';
import * as NavigationBar from 'expo-navigation-bar';
import Options from './Options';

const Home = ({navigation, route}) => {
  const theme = useContext(ThemeContext);
  const setTheme = useContext(SetThemeContext);
  const data = useContext(DataContext);
  const [isDark, setIsDark] = useState(theme.title === 'dark' ? true : false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalDismiss = () => {
    const changeNavBarColor = async () => {
      await NavigationBar.setBackgroundColorAsync(theme.colors.backgroundColor);
    };
    changeNavBarColor();
    setIsModalVisible(false);
  };

  const setModalVisible = () => {
    const changeNavBarColor = async () => {
      await NavigationBar.setBackgroundColorAsync('#999999');
    };
    changeNavBarColor();
    setIsModalVisible(true);
  };

  const storeThemeData = async (value) => {
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (data === null) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  const switchTheme = () => {
    storeThemeData(theme.title === 'dark' ? LightTheme : DarkTheme);
    setIsDark(!isDark);
    setTheme(theme.title === 'dark' ? LightTheme : DarkTheme);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={theme.container}>
      <View>
        <Text style={{color: theme.colors.textColor, fontSize: 40}}>
          {`this is my data: ${data.title}`}
        </Text>

        <Button textColor="green" onPress={setModalVisible}>
          Go to Options
        </Button>
      </View>
      <Portal>
        <Modal
          onDismiss={onModalDismiss}
          visible={isModalVisible}
          contentContainerStyle={[
            style.modalContainer,
            {backgroundColor: theme.colors.backgroundColor},
          ]}
        >
          <Options isDark={isDark} switchTheme={switchTheme} />
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    padding: 10,
    flex: 1,
    margin: 20,
    justifyContent: 'start',
    alignItems: 'center',
    borderRadius: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
