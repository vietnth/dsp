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
import { NavigationActions, StackActions } from 'react-navigation';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import styles from '../configs/style';

const resetAction = StackActions.reset({
  index:0,
  actions: [NavigationActions.navigate({routeName:"Vattu"})]
})
export default class User extends Component {

    //Header ứng dụng (tùy chọn)
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Thông in người dùng",
            headerTitleStyle: {
                alignSelf: 'center'
            }
        };
    };

    

  constructor(props) {
    super(props);
    //alert(this.props.token1);

    this.state = {
        userid   : '',
      token: '',
      hoten: '',
        message: 'none',
        listData: []    //Khai báo listData để chứa dữ liệu
    }
    }

    onPressItem(item) {
        //alert("Click Item language: " +  item)
        this.props.navigation.navigate("Vantay",{itemid:item})
    }

    logoutevent() {

      //this.props.navigation.dispatch(resetAction);      
        try{
            AsyncStorage.setItem("isLoggedIn1", 'false');
            AsyncStorage.setItem("userid", '');
            AsyncStorage.setItem("token", '');
            AsyncStorage.setItem("hoten", '');
            this.setState({hoten: ''});
            this.setState({message: 'none'});
            OneSignal.setSubscription(false);
            // this.props.navigation.dispatch(
            //   NavigationActions.reset({
            //     index:0,
            //     actions: [NavigationActions.navigate("Home")]
            //   })
            // );
        }catch(error){
          this.setState({isLoggedIn1: 'false'});
          this.setState({userid: ''});
          this.setState({token: ''});
          this.setState({hoten: ''});
        }
        this.props.navigation.navigate("Login");

       //
        }

    componentDidMount() {
        try{
            
            AsyncStorage.getItem("isLoggedIn1").then(result =>{
              this.setState({isLoggedIn1: result});
            });
            AsyncStorage.getItem("userid").then(result =>{
              this.setState({userid: result});
              var uid=this.state.userid.replace(/['"]+/g, '');
              if (!isNaN(uid) ) {
                //alert(uid);
                if ( parseInt(uid)==235 || parseInt(uid)==236 || parseInt(uid)==298)
                  this.setState({message:'flex'});
                  else
                  this.setState({message:'none'});
              }
              else 
                this.setState({message:'none'});
            });
            AsyncStorage.getItem("token").then(result =>{    
              this.setState({token: result});
            });
            AsyncStorage.getItem("hoten").then(result =>{
              this.setState({hoten: result});
            });
             
            
          } catch(error){ 
              AsyncStorage.setItem("isLoggedIn1", false);
              AsyncStorage.setItem("userid", '');
              AsyncStorage.setItem("token", '');
              AsyncStorage.setItem("hoten", '');
            this.setState({isLoggedIn1: false});
            this.setState({userid: ''});
            this.setState({token: ''});
            this.setState({hoten: ''});
            this.setState({message:'none'});
          
          }

          //alert(this.state.message);
         
          const {navigation} = this.props;
          this.focusListener = navigation.addListener('didFocus', ()=> {
            AsyncStorage.getItem("isLoggedIn1").then(result =>{
              this.setState({isLoggedIn1: result});
            });
            AsyncStorage.getItem("userid").then(result =>{
              this.setState({userid: result});
              var uid=this.state.userid.replace(/['"]+/g, '');
              if (!isNaN(uid) ) {
                //alert(uid);
                if ( parseInt(uid)==235 || parseInt(uid)==236 || parseInt(uid)==298)
                  this.setState({message:'flex'});
                  else
                  this.setState({message:'none'});
              }
              else 
                this.setState({message:'none'});
            });
            AsyncStorage.getItem("token").then(result =>{    
              this.setState({token: result});
            });
            AsyncStorage.getItem("hoten").then(result =>{
              this.setState({hoten: result});
            });
             
          })
       
    }

render() {
    
  
      return(
        <SafeAreaView style={{flex:1}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Text>{this.state.hoten}--{this.state.userid}</Text>
            </View>
            <View style={{marginTop:10}}>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
                onPress={() => this.logoutevent()}
                >
                <Text style={styles.loginText}>Đăng xuất</Text>
                </TouchableHighlight>
            </View>

            <View style={{marginTop:10, display:this.state.message}}>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
                onPress={() => this.onPressItem({itemid:this.state.userid})}
                >
                <Text style={styles.loginText}>Test</Text>
                </TouchableHighlight>
            </View>
            
            
        </View>
        </SafeAreaView>
        
        
      );
}


}