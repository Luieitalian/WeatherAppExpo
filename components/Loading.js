import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeContext} from '../contexts/ThemeContext';
import {ActivityIndicator} from 'react-native-paper';

const Loading = () => {
  const theme = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundColor,
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </SafeAreaView>
  );
};

export default Loading;
