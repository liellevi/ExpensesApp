import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {EXPENSES_DATA, WHITE_BACKGROUND} from '../consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reportAnError} from '../Services/ErrorService';
import {ExpenseData} from '../types';

export const ProfileScreen = ({navigation}: any): JSX.Element => {
  const [userExpensesData, setUserExpensesData] = useState<
    ExpenseData[] | null
  >([]);

  useEffect(() => {
    AsyncStorage.getItem(EXPENSES_DATA)
      .then(data => {
        if (data) {
          setUserExpensesData(JSON.parse(data));
        }
      })
      .catch(error => {
        reportAnError(error);
      });
  }, []);

  const onSignOutPress = () => {
    navigation.navigate('LoginScreen');
    AsyncStorage.removeItem(EXPENSES_DATA);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textItem}>
        <Text style={styles.totalText}>
          Total Expenses Items: {userExpensesData?.length}
        </Text>
      </View>
      <TouchableOpacity style={styles.textItem} onPress={onSignOutPress}>
        <Text style={styles.totalText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '400',
    paddingLeft: 30,
    borderTopWidth: 0.2,
    borderBottomColor: 'black',
  },
  textItem: {
    marginHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: 'black',
    height: 40,
    justifyContent: 'center',
  },
});
