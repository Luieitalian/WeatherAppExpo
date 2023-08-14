import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../contexts/ThemeContext';
import {Switch} from 'react-native-paper';

const Options = ({isDark, switchTheme}) => {
  const theme = useContext(ThemeContext);
  return (
    <View>
      <View style={style.optionContainer}>
        <Switch
          value={isDark}
          onValueChange={switchTheme}
          theme={theme}
        ></Switch>
        <Text style={{color: theme.colors.textColor}}>Change Color Theme</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Options;
