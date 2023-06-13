import AsyncStorage from '@react-native-async-storage/async-storage';
import {reportAnError} from './ErrorService';

export const getItemFromAsyncStorage = (itemKey: string): Promise<any> => {
  return AsyncStorage.getItem(itemKey)
    .then(value => {
      return Promise.resolve(value);
    })
    .catch(error => {
      reportAnError(error);
      return Promise.reject(null);
    });
};
