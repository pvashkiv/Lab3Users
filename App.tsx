import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import UsersScreen from './screens/UsersScreen.tsx';
import UpdateUserScreen from './screens/UpdateUserScreen.tsx';
import DeleteUserScreen from './screens/DeleteUserScreen.tsx';
import AddUserScreen from './screens/AddUserScreen.tsx';
import {DbService} from './src/service/db.service.ts';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    DbService.init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
        <Stack.Screen name="DeleteUser" component={DeleteUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
