import React from "react";
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './LoginScreen.js'




const AppNavigator = createStackNavigator(
  {
    Login:
    {
    screen: LoginScreen,
    navigationOptions:
    {
        header: null
    }
    },
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}