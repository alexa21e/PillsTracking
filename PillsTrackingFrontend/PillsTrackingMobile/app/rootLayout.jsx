import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';
import Home from './home';
import PrescriptionDetails from './prescriptionDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pp" component={PrescriptionDetails} options={{ name:'Pp'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


