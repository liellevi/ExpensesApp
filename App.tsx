import React from 'react';
import {LoginScreen} from './src/screens/Login';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WHITE_BACKGROUND} from './src/consts';
import {HomeScreen} from './src/screens/Home';
import {ProfileScreen} from './src/screens/Profile';
import {CreateOrEditExpense} from './src/screens/CreateOrEditExpense';
import {FilterExpense} from './src/screens/FilterExpense';
import {ExpenseData} from './src/types';

export type RootStackParamList = {
  LoginScreen: undefined;
  Home: {userId: string};
  CreateOrEditExpense: undefined;
  FilterExpense: {
    userData: ExpenseData[];
    setUserData: (data: ExpenseData[]) => void;
    setTotalAmount: (data: ExpenseData[]) => void;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const CreateNewPlaceHolder = (): JSX.Element => (
  <View style={styles.modalView} />
);
const createCreateIconComponent = (): JSX.Element => {
  return (
    <Image
      source={require('./src/images/plusIcon.png')}
      style={styles.plusIcon}
    />
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{tabBarStyle: {backgroundColor: WHITE_BACKGROUND}}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIconStyle: {display: 'none'},
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontWeight: '400',
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateNewPlaceHolder}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('CreateOrEditExpense');
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: createCreateIconComponent,
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIconStyle: {display: 'none'},
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontWeight: '400',
            fontSize: 13,
          },
        }}
      />
    </Tab.Navigator>
  );
}
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={({route}) => ({
              headerStyle: {
                backgroundColor: WHITE_BACKGROUND,
              },
              title: route.params?.userId,
              headerBackVisible: false,
              gestureEnabled: false,
            })}
          />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="CreateOrEditExpense"
              component={CreateOrEditExpense}
              options={{headerShown: false}}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen
              name="FilterExpense"
              component={FilterExpense}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
  },
  plusIcon: {
    height: 50,
    width: 50,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;
