import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
// import Icon from 'react-native-vector-icons/FontAwesome';

import Vattu from './Vattu'
import Detail from './Detail'
import User from './User'
import Login from './Login'
import LoginView from '../index'

const BottomNavigator = createStackNavigator(
  {
    Home: Vattu,
    Details: Detail

  }
);
const RootStack = createStackNavigator(
  {
    Info: User,
    }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: BottomNavigator,
      navigationOptions: {
          title: "Trang chủ",
          // tabBarIcon: ({ tintColor }) => (
          //     <Icon name="home" size={22} color={tintColor} />              
          // )
      }
  },
    Info: {
      screen: RootStack,
      navigationOptions: {
          title: "Cá nhân",
          // tabBarIcon: ({ tintColor }) => (
          //     <Icon name="info" size={22} color={tintColor} />              
          // )
      }
  },
  },
);



const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  handler(){
    // this.setState({
    //   messageshow: true,
    //   isLoggedIn1: true
    // });
    alert(23);
  }
  render() {
    return (
      <AppContainer />)
      ;
  }
}
