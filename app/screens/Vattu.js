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

import {Tacphamitem} from '../views/Tacphamitem';
import config from "../configs/config"
import styles from '../configs/style';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import '../Context/global'


export default class Vattu extends Component {

    //Header ứng dụng (tùy chọn)
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Tài sản",
            headerTitleStyle: {
                alignSelf: 'center',
                headerLeft: null
            }
        };
    };

  constructor(props) {
    super(props);
    //alert(this.props.token1);
    //var bde=this;
    this.state = {
        isFetching: false,
        userid   : '',
        email   : '',
      token: '',
      hoten: '',
        message: "",
        display: "none",
        search:'',
        isLoading: true,
        unreadMessagesCount:0,
        listData: [],    //Khai báo listData để chứa dữ liệu
        listData1: [],    //Khai báo listData để chứa dữ liệu
        pagenum:1
    }
    this.arrayholder = [];
    
    this.onOpened = this.onOpened.bind(this);
    //this.onReceived = this.onReceived.bind(this);
    this.onIds = this.onIds.bind(this);   
    //this.getlistthongbaochuadoc = this.getlistthongbaochuadoc.bind(this);   

    
}

componentWillMount() { 
    //OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    // if (!IOS) {
    //   OneSignal.inFocusDisplaying(0);
    // }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    //OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    
  }
  
  onReceived(notification) {
    console.log("Notification received: ", notification);
    this.props.handler();
    //this.getlistthongbaochuadoc();
    //this.setState({unreadMessagesCount: unreadMessagesCount+1});
  }
  
  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    let data = openResult.notification.payload.additionalData;
    //alert(data)
    this.props.navigation.navigate("Thongbao",data)
    
  }
  
  onIds(device) {
    console.log('Device info: ', device);
  }

  onRefresh() {
      this.setState({ isFetching: true }, function() { this.getLanguagesFromServer() });
  }

  updateSearch = search =>{
      this.setState({
          search
      });
  }

  getlistthongbaochuadoc() {
          
    return fetch(config.SERVER_URL + 'apimobile.aspx/getlistchuadoc',{
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'TOKEN': this.state.token,
    },
    body: JSON.stringify({
        pID: '1833',
        qty: '13'
    }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //alert(JSON.stringify(responseJson.d));
        //console.error(responseJson.d);
        // this.arrayholder = JSON.parse(responseJson.d);      
        if (Array.isArray(JSON.parse(responseJson.d)) ){
          this.setState({
            listData1: JSON.parse(responseJson.d)
            }, function(){
    
            });
            global.unreadMessagesCount=JSON.parse(responseJson.d)[0]["COUNTER"];
        }
        
        //this.setState({unreadMessagesCount: this.state.listData1[0]["COUNTER"]});
        
        //alert(this.state.listData[0]["COUNTER"]);
        //alert(this.props.unreadMessagesCount);

    })
    .catch((error) =>{
        console.error(error);
    });
    
  }

  getLanguagesFromServer() {
          
      return fetch(config.SERVER_URL + 'apimobile.aspx/getlistvattu',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'TOKEN': this.state.token,
      },
      body: JSON.stringify({
          pID: '1833',
          qty: '13'
      }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          //alert(JSON.stringify(responseJson.d));
          //console.error(responseJson.d);
          this.arrayholder = JSON.parse(responseJson.d);      
          this.setState({
          isLoading: false,
          isFetching: false,
          message: JSON.stringify(responseJson.d),
          listData: JSON.parse(responseJson.d)
          }, function(){

          });

      })
      .catch((error) =>{
          console.error(error);
      });
      
  }

  // onPress Item Language
  onPressItem(item) {
      //alert("Click Item language: " +  item)
      //AppContainer.navigation.navigate("Details",{itemid:item})
      this.props.navigation.navigate("Details",{itemid:item})
  }

  searchFilterFunction = text => {    
      const newData = this.arrayholder.filter(item => {      
        const itemData = item.TEN_VAT_TU.toUpperCase() + ' ' + item.MA_VAT_TU.toUpperCase();
        
        const textData = text.toUpperCase();
        //alert(itemData);
        return itemData.indexOf(textData) > -1;    
      });
      
      this.setState({ listData: newData });  
    };

  componentDidMount() {
    //alert(this.state.token+ "123");
    var abc=this;
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        //abc.setState({email: Math.random()});
        abc.getdata();
      }
    );
    
  }

  getdata() {
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
                AsyncStorage.getItem("token").then(result =>{
                    //alert(result+ "123");
                    this.setState({isLoggedIn1: result, display: "flex"});

                    this.setState({token: result});
                    if(this.state.token==''||this.state.token==null){
                        this.props.navigation.navigate("Login")
                
                    }else{
                    this.getLanguagesFromServer();
                    this.getlistthongbaochuadoc();
                    //this.getlistthongbaochuadoc();
                    //console.log(result);
                    }
                });
                AsyncStorage.getItem("email").then(async (result) =>{
                    this.setState({email: result});
                    OneSignal.setSubscription(true);
                    //alert(result.replace(/"/g,""));
                    OneSignal.sendTag("tendangnhap", this.state.email.toString().toLocaleLowerCase().replace(/"/g,""));
                    //alert(result+ "123");
                    //console.log(result);
                  });
            }
            else 
            {
                this.props.navigation.navigate("Login");
            }
        });
        AsyncStorage.getItem("hoten").then(result =>{
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

    
render() {
       // alert(this.state.display);
      return(
        <SafeAreaView style={{flex:1, display:this.state.display}}>
            <View style={styles.container}>
                
                <View style={{margin: 5,flexDirection: 'row',alignItems: 'center'}}>
                    <TextInput placeholder='  Tìm kiếm'  onChangeText={text => this.searchFilterFunction(text)}
                     style={{width:'100%', height:40, padding:5, backgroundColor:'#FFF'}}></TextInput>
                </View>
                
                <FlatList
                    style={{margin:5}}
                    data={this.state.listData}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        </SafeAreaView>
        
        
      );
}

/* Hiển thị chi tiết 1 item như thế nào */
renderItem(item, index) {
    return (
        <Tacphamitem
            data={item} //Truyền item này qua ViewItem như một prop
            data1={index} //Truyền item này qua ViewItem như một prop
            onPressItem={(itemPress) => { this.onPressItem(itemPress) }}    // truyền một hàm qua để bắt sự kiện click item
        />
    )
}
}