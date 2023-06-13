import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {EXPENSES_DATA, GRAY, LIGHT_RED, WHITE_BACKGROUND} from '../consts';
import {ExpenseData, ExpensesListData} from '../types';
import {
  divideExpensesDatesIntoDateSections,
  calculateTotalAmount,
} from '../Services/ExpensesDataService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reportAnError} from '../Services/ErrorService';

export const HomeScreen = ({navigation, route}: any): JSX.Element => {
  const isFocused = useIsFocused();
  const [totalExpensesAmount, setTotalExpensesAmount] = useState<number>(0);
  const [userExpensesData, setUserExpensesData] = useState<
    ExpenseData[] | null
  >([]);

  useEffect(() => {
    const totalAmount = calculateTotalAmount(userExpensesData);
    setTotalExpensesAmount(totalAmount);
    AsyncStorage.getItem(EXPENSES_DATA)
      .then(data => {
        if (data) {
          setUserExpensesData(JSON.parse(data));
        }
      })
      .catch(error => {
        reportAnError(error);
      });
  }, [isFocused, userExpensesData]);

  const getListData = () => {
    let retVal: ExpensesListData[] | null = [];
    const firstItemsInList: ExpensesListData[] = [
      {id: 'title'},
      {id: 'filterButton'},
    ];
    retVal = firstItemsInList;
    if (userExpensesData && userExpensesData.length > 0) {
      const dividedExpensesDates = divideExpensesDatesIntoDateSections(
        userExpensesData,
        2,
      );
      retVal = retVal.concat(dividedExpensesDates);
    }
    return retVal;
  };

  const renderItem = ({item}: any): JSX.Element | null => {
    let retVal: JSX.Element | null = null;
    switch (item.id) {
      case 'title':
        const fractionalPart =
          totalExpensesAmount?.toString().split('.')[1] || '00';
        retVal = (
          <View style={styles.totalExpenses}>
            <Text style={styles.totalExpensesText}>Total Expenses: </Text>
            <Text style={styles.totalAmount}>
              ${Math.trunc(totalExpensesAmount)}
              <Text style={styles.fractionalPart}>.{fractionalPart}</Text>
            </Text>
          </View>
        );
        break;
      case 'filterButton':
        retVal = (
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              navigation.navigate('FilterExpense', {
                userData: userExpensesData,
                setUserData: setUserExpensesData,
                setTotalAmount: setTotalExpensesAmount,
              });
            }}>
            <Image
              source={require('../images/filter.png')}
              style={styles.filterIcon}
            />
            <Text style={styles.filterText}>Filters</Text>
          </TouchableOpacity>
        );

        break;
      default:
        const expenseFractionalPart =
          item.data.amount?.toString().split('.')[1] || '00';
        retVal = (
          <View>
            {item.data.sectionTitle && (
              <View style={styles.sectionView}>
                <Text style={styles.sectionText}>{item.data.sectionTitle}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateOrEditExpense', {
                  isEditMode: true,
                  title: item.data.title,
                  amount: item.data.amount,
                  date: item.data.date.toLocaleDateString('en-EN'),
                })
              }
              style={
                item.data.sectionTitle
                  ? styles.expenseItem
                  : styles.expenseItemWithSeperator
              }>
              <View style={styles.expenseView}>
                <Text style={styles.expenseText}>{item.data.title}</Text>
                <Text style={styles.expenseText}>
                  ${Math.trunc(item.data.amount)}
                  <Text style={styles.fractionalPart}>
                    .{expenseFractionalPart}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
    return retVal;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getListData()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  activityIndicator: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  totalExpensesText: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 24,
  },
  fractionalPart: {
    fontSize: 16,
  },
  totalExpenses: {
    paddingTop: 28,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingRight: 160,
  },
  expenseText: {
    fontSize: 20,
    color: 'black',
  },
  expenseView: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseItem: {
    height: 62,
    justifyContent: 'center',
  },
  expenseItemWithSeperator: {
    height: 62,
    justifyContent: 'center',
    borderTopWidth: 0.2,
    borderBottomColor: 'black',
  },
  seperator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  sectionView: {
    backgroundColor: LIGHT_RED,
    height: 40,
    paddingLeft: 11,
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    lineHeight: 14,
  },
  imageLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    height: 20,
    width: 20,
  },
  filterButton: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row',
    height: 29,
    width: 94,
    borderRadius: 60,
    backgroundColor: GRAY,
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
