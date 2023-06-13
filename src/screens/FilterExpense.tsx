import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {BLUE_TEXT, EXPENSES_DATA, PURPLE_COLOR, WHITE} from '../consts';
import {ExpenseData} from '../types';
import {calculateTotalAmount} from '../Services/ExpensesDataService';
import {reportAnError} from '../Services/ErrorService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
const screenWidth = Dimensions.get('window').width;

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'FilterExpense'> {}

export const FilterExpense: React.FC<Props> = ({
  navigation,
  route,
}: any): JSX.Element => {
  const [title, onChangeTitle] = React.useState<string>('');
  const [amount, onChangeAmount] = React.useState<string>('');
  const [date, onChangeDate] = React.useState<string>('');

  const {setUserData, setTotalAmount} = route.params;
  const userData: ExpenseData[] = route.params.userData;

  const onFilterButtonPress = () => {
    let filteredUserData: ExpenseData[] | null = route.params.userData;
    if (title) {
      filteredUserData = userData.filter(item => !item.title.search(title));
    }
    if (amount) {
      filteredUserData = userData.filter(
        item => !item.amount.toString().search(amount),
      );
    }
    if (date) {
      filteredUserData = userData.filter(
        item => !item.date.toString().search(date),
      );
    }
    setUserData(filteredUserData);
    setTotalAmount(calculateTotalAmount(filteredUserData));
    navigation.goBack();
  };
  const onCleanButtonPress = () => {
    AsyncStorage.getItem(EXPENSES_DATA)
      .then(data => {
        if (data) {
          setUserData(JSON.parse(data));
        }
      })
      .catch(error => {
        reportAnError(error);
      });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onCleanButtonPress}>
          <Text style={styles.cleanText}>Clean</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/closeIcon.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>
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
        onPress={onFilterButtonPress}>
        <Text style={styles.actionText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    height: '60%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: screenWidth,
    paddingTop: 20,
    alignItems: 'center',
  },
  closeIcon: {
    height: 15,
    width: 15,
  },
  closeButton: {
    // alignSelf: 'flex-end',
  },
  cleanText: {
    color: BLUE_TEXT,
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
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
