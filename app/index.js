import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  AsyncStorage,
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, createBottomTabNavigator,createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './screens/Login';
import Vattu from './screens/Vattu';
import Detail from './screens/Detail'
import User from './screens/User'
import SQrCode from './screens/qrcode'
import DetailQr from './screens/DetailQr'
import Vantay from './screens/Vantay'
import Thongbao from './screens/Thongbao'
import Thongbaochitiet from './screens/Thongbaochitiet'

import styles from './configs/style';

import OneSignal from 'react-native-onesignal'; // Import package from node modules

const HomeNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerMode: 'None',
        header: null,
        tabBarVisible: false,
      }
    },
    Vattu: {
      screen: Vattu,
      navigationOptions: {
        headerLeft: null,
        tabBarVisible: false
      ,
    }
  },
    Details: Detail,
  

  }, {
      defaultNavigationOptions:{
        gesturesEnabled: false,
      }
    }

    ,{
      navigationOptions: {
        gesturesEnabled: false,
      }
    }
);
const InfoStack = createStackNavigator(
  {
    Info: User,
    Vantay: Vantay
  }
);

const QrcodeStack = createStackNavigator(
  {
    Qrcode: SQrCode,
    DetailsQr: DetailQr
  }
);

const NotificationStack = createStackNavigator(
  {
    Thongbao: Thongbao,
    Thongbaochitiet: Thongbaochitiet
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
          title: "Trang chủ",
          tabBarIcon: ({ tintColor }) => (
               <Icon name="home" size={22} color={tintColor} />              
           )
      }
  },
    
  Qrcode: {
    screen: QrcodeStack,
    navigationOptions: {
        title: "QrCode",
         tabBarIcon: ({ tintColor }) => (
             <Icon name="qrcode" size={22} color={tintColor} />              
         )
    },
    lazy:false
  },
  Thongbao: {
    screen: NotificationStack,
    navigationOptions: {
        title: "Thông báo",
         tabBarIcon: ({ tintColor }) => (
             <Icon name="bell" size={22} color={tintColor} />              
         )
    },
    lazy:false
  },

  Info: {
    screen: InfoStack,
    navigationOptions: {
        title: "Cá nhân",
         tabBarIcon: ({ tintColor }) => (
            <Icon name="info" size={22} color={tintColor} />              
         )
    }
  }
    }
);

HomeNavigator.navigationOptions = ({ navigation }) => {
  const currentRoute = navigation.state.routes[navigation.state.index];
  const { routeName } = currentRoute;
  //alert(1);
  let tabBarVisible = true;
  if (routeName === 'Login') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
   }


  // let swipeEnable = true;
  // if (routeName === 'Login') {
  //   swipeEnable = false;
  // }
  // return {
  //   swipeEnable
  // }
};

// HomeNavigator.navigationOptions = ({ navigation }) => {
//   const currentRoute = navigation.state.routes[navigation.state.index];
//   const { routeName } = currentRoute;
//   //alert(1);
//   let swipeEnable = true;
//   if (routeName === 'Login') {
//     swipeEnable = false;
//   }

//   return {
//     swipeEnable
//   }
// };

// InfoStack.navigationOptions = ({ navigation }) => {  
//   return{
//   tabBarOnPress: (scene, jumToIndex)=>{
//       //alert(scene.index);
//   }
// }
// };



const AppContainer = createAppContainer(TabNavigator);
OneSignal.init("ec4e5f22-8e76-444e-a9ba-ead394b25b40");

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid   : '',
      user_name: '',
      token: '',
      hoten: '',
      isLoggedIn1: false,
      messageshow:false
    }
    
    
  }

  

  

  componentDidMount() {
    //AsyncStorage.getItem("isLoggedIn").then((value) =>{
    //  this.setState({"isLoggedIn": value});
    //}).done();
   try{
      AsyncStorage.getItem("isLoggedIn1").then(async (result) =>{
        //AsyncStorage.setItem("isLoggedIn1", false);
        this.setState({isLoggedIn1: result});
        //alert(result+ "123");
        //console.log(result);
      });
      AsyncStorage.getItem("hoten").then(async (result) =>{
        this.setState({hoten: result});
        //alert(result+ "123");
        //console.log(result);
      });
      AsyncStorage.getItem("user_name").then(async (result) =>{
        this.setState({user_name: result});
        
        //alert(result+ "123");
        //console.log(result);
        
      })
      
    } catch(error){ 
      AsyncStorage.setItem("isLoggedIn1", false);
      this.setState({isLoggedIn1: false});
      this.setState({userid: ''});
      this.setState({token: ''});
      this.setState({hoten: ''});
    }
    
    }

    
  render() {
    return (
      <AppContainer />
      );
  }
    //alert(this.state.isLoggedIn1);
    // if (this.state.isLoggedIn1==true || this.state.isLoggedIn1=='true' ) 
    //   return (
    //     <AppContainer action={this.handler1.bind(this)}/>
    //   )
    // else 
    //   return <Login action={this.handler.bind(this)} />;
    // }


}


 