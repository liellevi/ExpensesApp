import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {EXPENSES_DATA, PURPLE_COLOR, WHITE} from '../consts';
import {ExpenseData} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reportAnError} from '../Services/ErrorService';

export const CreateOrEditExpense = ({navigation, route}: any): JSX.Element => {
  let editMode = false;
  if (route.params) {
    editMode = true;
  }
  const [title, onChangeTitle] = React.useState<string>(
    route.params?.title || '',
  );
  const [amount, onChangeAmount] = React.useState<string>(
    route.params?.amount.toString() || '',
  );
  const [date, onChangeDate] = React.useState<string>(route.params?.date || '');
  const [userExpensesData, setUserExpensesData] = useState<ExpenseData[]>([]);

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

  const onActionButtonPress = () => {
    if (title && amount && date) {
      const newExpenseData: ExpenseData[] = [
        {
          title: title,
          amount: parseInt(amount, 10),
          date: new Date('Jun 05 2023 19:01:07'),
        },
      ];
      const updatedUserData = newExpenseData.concat(userExpensesData);
      updatedUserData &&
        AsyncStorage.setItem(
          EXPENSES_DATA,
          JSON.stringify(updatedUserData),
        ).catch(error => {
          reportAnError(error);
        });
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../images/closeIcon.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {editMode ? 'Edit Expense' : 'Create Expense'}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Amount"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeDate}
        value={date}
        keyboardType="numeric"
        placeholder="Date (mm.dd.yy)"
      />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onActionButtonPress}>
        <Text style={styles.actionText}> {editMode ? 'Save' : 'Create'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  closeIcon: {
    height: 20,
    width: 24,
  },
  closeButton: {
    paddingTop: 20,
    paddingRight: 20,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    paddingTop: 10,
  },
  input: {
    paddingTop: 50,
    height: 80,
    width: 350,
    backgroundColor: WHITE,
    borderColor: 'black',
    borderBottomWidth: 0.2,
    paddingLeft: 6,
  },
  actionButton: {
    backgroundColor: PURPLE_COLOR,
    height: 50,
    borderRadius: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    top: 200,
  },
  actionText: {
    color: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: '700',
  },
});
