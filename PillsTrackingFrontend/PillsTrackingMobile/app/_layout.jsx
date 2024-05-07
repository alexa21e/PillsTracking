import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';
import Index from './index';
import Login from './login';

const Stack = createStackNavigator();
const RootLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={Index} options={{headerShown: false}}/>
      <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}


export default RootLayout


