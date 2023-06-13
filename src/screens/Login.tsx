import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  CURRENT_LOGGED_IN_USER,
  PURPLE_COLOR,
  WHITE,
  WHITE_BACKGROUND,
  EXPENSES_DATA,
} from '../consts';
import {reportAnError} from '../Services/ErrorService';

export interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const LoginScreen = ({navigation}: LoginScreenProps): JSX.Element => {
  const [userName, onChangeUserName] = React.useState<string>('');

  const onLoginButtonPress = (): void => {
    if (userName.length > 1) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUserName}
        value={userName}
        placeholder="Enter Name"
      />
      <TouchableOpacity style={styles.loginbutton} onPress={onLoginButtonPress}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbutton: {
    backgroundColor: PURPLE_COLOR,
    height: 50,
    borderRadius: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    top: 200,
  },
  loginText: {
    color: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    height: 55,
    width: 255,
    backgroundColor: WHITE,
    borderColor: PURPLE_COLOR,
    borderWidth: 1,
    paddingLeft: 6,
  },
});

const expensesDataArray = [
  {date: new Date('Mon Jun 05 2023 19:01:07'), amount: 22.2, title: 'Food'},
  {date: new Date('Mon Jun 05 2023 18:01:07'), amount: 22.03, title: 'Milk'},
  {date: new Date('Mon Jun 05 2023 20:01:07'), amount: 70, title: 'GYM'},
  {date: new Date('Sun May 26 2023 19:01:07'), amount: 85.9, title: 'Gaz'},
  //   {date: new Date('Mon Jul 05 2022 19:01:07'), amount: 100.1, title: 'Cloths'},
  //   {date: new Date('Mon Sep 05 2023 19:01:07'), amount: 40, title: 'Cinema'},
  //   {date: new Date('Mon Nov 03 2021 19:01:07'), amount: 5, title: 'Pet Food'},
  //   {date: new Date('Mon Jun 15 2023 19:01:07'), amount: 10.9, title: 'Beer'},
  //   {date: new Date('Mon Jun 15 2023 18:01:07'), amount: 10, title: 'Drinks'},
  //   {date: new Date('Mon Jun 15 2023 01:01:07'), amount: 10, title: 'Pizza'},
  //   {date: new Date('Mon Dec 39 2023 19:01:07'), amount: 300, title: 'New phone'},
  //   {date: new Date('Mon Jun 19 2020 19:01:07'), amount: 1000, title: 'New Car'},
];
