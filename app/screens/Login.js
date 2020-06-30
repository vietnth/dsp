import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  AsyncStorage,
  FlatList,
  SafeAreaView
} from 'react-native';

import styles from '../configs/style';
import Secured from './Secured';
import { NavigationActions, StackActions } from 'react-navigation';
import config from "../configs/config"
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

import OneSignal from 'react-native-onesignal'; // Import package from node modules

const resetAction = StackActions.reset({
  index:0,
  actions: [NavigationActions.navigate({routeName:"Vattu",params:{item:1}})]
})


export default class Login extends Component {
  //Header ứng dụng (tùy chọn)
  static navigationOptions = ({ navigation }) => {
    return {
        title: "Thông tin ",
        header: null,
        headerLeft: null,
        tabBarVisible: false,
        headerTitleStyle: {
            alignSelf: 'center'
        },
    };
  };
  constructor(props) {
    super(props);
    
    this.state = {
        email: "",
        password: "",
        userid:"",
        token:"",
        hoten:"",
        isLoggedIn1: false,
        isLoading: true,
        userinfo: []    //Khai báo listData để chứa dữ liệu
    }    
}

    loginevent(){
      //getuserFromServer("url",this.state.email,this.state.password,"3KrZlj82pcH62exCLFP1sxJCbEZPGdc0");
      let formdata= new FormData();
      formdata.append("user_name",this.state.email);
      formdata.append("pass_word",this.state.password,);
      formdata.append("keys","3KrZlj82pcH62exCLFP1sxJCbEZPGdc0");
      return fetch(config.SERVER_URL +'api.aspx?type=DangNhap',{
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(JSON.stringify(responseJson.user[0]["ID"]));
        
        //console.error(responseJson.d);
        try{
           AsyncStorage.setItem("userid", JSON.stringify(responseJson.user[0]["ID"]));
           AsyncStorage.setItem("token", JSON.stringify(responseJson.user[0]["TOKEN"]));
           AsyncStorage.setItem("hoten", JSON.stringify(responseJson.user[0]["TEN"]));
           AsyncStorage.setItem("email", JSON.stringify(this.state.email));
           AsyncStorage.setItem("isLoggedIn1", "true");
           
           OneSignal.setSubscription(true);
           OneSignal.sendTag("tendangnhap", this.state.email.toLowerCase());
           
           this.setState({
            //userinfo: JSON.parse(responseJson.user),
            userid: JSON.stringify(responseJson.user[0]["ID"]),
            token: JSON.stringify(responseJson.user[0]["TOKEN"]),
            hoten: JSON.stringify(responseJson.user[0]["TEN"]),
            isLoggedIn1: true
          }, function(){
           
          });
          //this.props.navigation.navigate("Vattu");
          this.props.navigation.dispatch(resetAction);
          // this.props.navigation.dispatch(
          //   NavigationActions.reset({
          //     index:0,
          //     actions: [NavigationActions.navigate({routeName: "Home"})]
          //   })
          // );
          
        }catch(error){
          this.setState({isLoggedIn1: false})
        }
      })
      .catch((error) =>{
            //alert(error);
            alert("Đăng nhập không thành công!");
      });
      
    }


    componentDidMount(){
  
      //alert(this.state.token+ "123");
    const {navigation}=this.props;

    const itemid = navigation.getParam('item','0')
    //alert(itemid);
    try{

        AsyncStorage.getItem("isLoggedIn1").then(async (result) =>{
          //AsyncStorage.setItem("isLoggedIn1", false);
          //alert(result+ "123");
          //console.log(result);
          if (result==true || result=='true' ) 
            {   
              this.props.navigation.navigate("Vattu")

            }
            else 
            {
                //this.props.navigation.navigate("Login");
            }
        });
        AsyncStorage.getItem("hoten").then(async (result) =>{
          this.setState({hoten: result});
          //alert(result+ "123");
          //console.log(result);
        });

        
    }catch(error){ 
        AsyncStorage.setItem("isLoggedIn1", false);
        this.setState({isLoggedIn1: false});
        this.setState({userid: ''});
        this.setState({token: ''});
        this.setState({hoten: ''});
      }
      
    }
   
    updateParent(e){
      e.preventDefault();
      this.props.action();
    }

    render() {
      //alert(this.state.token);
     
        return (
          <View style={styles.container}>
               <View style={styles.inputContainer}>
               <Image style={styles.inputIcon} 
               source={require('../images/user.png')}
               />
               <TextInput style={styles.inputs}
                   placeholder="Tên đăng nhập"
                   keyboardType="email-address"
                   underlineColorAndroid='transparent'
                   onChangeText={(email) => this.setState({email})}/>
               </View>
               
               <View style={styles.inputContainer}>
               <Image style={styles.inputIcon} 
               //source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}
               source={require('../images/download.png')}
               />
               <TextInput style={styles.inputs}
                   placeholder="Mật khẩu"
                   secureTextEntry={true}
                   underlineColorAndroid='transparent'
                   onChangeText={(password) => this.setState({password})}/>
               </View>

               <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
               onPress={() => this.loginevent()}
               >
               <Text style={styles.loginText}>Đăng nhập</Text>
               </TouchableHighlight>
              

           </View>
     );
      
        
    }

    
}
