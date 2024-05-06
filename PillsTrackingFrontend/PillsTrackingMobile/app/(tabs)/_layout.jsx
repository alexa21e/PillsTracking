import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#000',
        tabBarShowLabel: false,
        tabBarStyle:{
            backgroundColor: '#fff',
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            height: 60,
            elevation: 0,
        },
    }}>
        <Tabs.Screen name="home" 
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: focused ? '#e91e63' : '#000'}}>Home</Text>
                </View>
            ),
        }}
        />
    </Tabs>
  );
};

export default _layout

const styles = StyleSheet.create({})