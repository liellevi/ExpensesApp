import {ExpenseData, ExpensesListData} from '../types';

export const divideExpensesDatesIntoDateSections = (
  rawData: ExpenseData[],
  startId: number,
): ExpensesListData[] => {
  let retVal: ExpensesListData[] = [];
  if (rawData && rawData.length > 0) {
    let prevPairIsSameDay = false;

    const rawDataWithDateFormat: ExpenseData[] = rawData.map(item => {
      const dateNew = new Date(item.date);
      return {title: item.title, amount: item.amount, date: dateNew};
    });
    rawDataWithDateFormat.sort((a, b) => b?.date?.getTime() - a?.date?.getTime());
    
    for (let i = 0; i < rawDataWithDateFormat.length; i++) {
      const item1 = rawDataWithDateFormat[i];
      const item2 = rawDataWithDateFormat[i + 1];
      const newItemId = (i + startId).toString();
      if (sameDay(item1.date, item2?.date)) {
        item1.sectionTitle = prevPairIsSameDay ? '' : item2.date.toLocaleDateString('en-EN');
        retVal.push({id: newItemId, data: item1});
        prevPairIsSameDay = true;
      } else {
        item1.sectionTitle = prevPairIsSameDay ? '' : item1.date.toLocaleDateString('en-EN');
        retVal.push({id: newItemId, data: item1});
        prevPairIsSameDay = false;
      }
    }
  }
  return retVal;
};

const sameDay = (d1: Date, d2: Date): boolean => {
  if (!d1 || !d2) {
    return false;
  }
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
export const calculateTotalAmount = (
  userExpensesData: ExpenseData[] | null,
): number => {
  let totalExpensesAmount = 0;
  if (userExpensesData) {
    userExpensesData?.forEach(expense => {
      totalExpensesAmount += expense.amount;
    });
  }
  return totalExpensesAmount;
};
