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


import {Thongbaoitem} from '../views/Thongbaoitem';
import {Tacphamitem} from '../views/Tacphamitem';
import config from "../configs/config"
import styles from '../configs/style';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
export default class Thongbao extends Component {

  //Header ứng dụng (tùy chọn)
  static navigationOptions = ({ navigation }) => {
      return {
          title: "Thông báo",
          headerTitleStyle: {
              alignSelf: 'center',
              headerLeft: null
          }
      };
  };

  constructor(props) {
    super(props);
    //alert(this.props.token1);

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
        listData: []    //Khai báo listData để chứa dữ liệu
    }
    this.arrayholder = [];
    this.onReceived = this.onReceived.bind(this);
}

onRefresh() {
    this.setState({ isFetching: true }, function() { this.getLanguagesFromServer() });
 }

updateSearch = search =>{
    this.setState({
        search
    });
}

 getLanguagesFromServer() {
        
    return fetch(config.SERVER_URL + 'apimobile.aspx/getlistthongbao',{
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
    this.props.navigation.navigate("Thongbaochitiet",{itemid:item})
}

searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = item.TIEU_DE.toUpperCase() + ' ' + item.NOI_DUNG.toUpperCase();
      
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
    OneSignal.addEventListener('received', this.onReceived);
  }

  onReceived(notification) {
    //alert(notification);
    var abc=this;
    //abc.getdata();
    //this.props.handler();
    this.getLanguagesFromServer();
    //abc.setState({isFetching: true})
  }

  
getdata() {
    //alert(this.state.token+ "123");
    
    const {navigation}=this.props;

    const itemid = navigation.getParam('item','0')
    //alert(itemid);
    try{

        AsyncStorage.getItem("isLoggedIn1").then(async (result) =>{
         
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
            
                    //console.log(result);
                    }
                });
                
            }
            else 
            {
                this.props.navigation.navigate("Login");
            }
        });
        AsyncStorage.getItem("hoten").then(result =>{
          this.setState({hoten: result});

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
      //alert(this.state.email);
      return(
        <SafeAreaView style={{flex:1, display:this.state.display}}>
            <View style={styles.container}>
                
                <View style={{margin: 5,flexDirection: 'row',alignItems: 'center'}}>
                    <TextInput placeholder='  Tìm kiếm'  onChangeText={text => this.searchFilterFunction(text)}
                     style={{width:'100%', height:40, padding:15, backgroundColor:'#FFF'}}></TextInput>
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
        <Thongbaoitem
            data={item} //Truyền item này qua ViewItem như một prop
            data1={index} //Truyền item này qua ViewItem như một prop
            onPressItem={(itemPress) => { this.onPressItem(itemPress) }}    // truyền một hàm qua để bắt sự kiện click item
        />
    )
}
}