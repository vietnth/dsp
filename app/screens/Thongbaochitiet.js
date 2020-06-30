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

import config from "../configs/config"

import "../Context/global"

import {Thongbaochitietitem} from '../views/Thongbaochitietitem';



export default class Thongbaochitiet extends Component {

    //Header ứng dụng (tùy chọn)
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Nội dung thông báo",
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
        message: "",
        listData: [],    //Khai báo listData để chứa dữ liệu
        listDataLichsu: []    //Khai báo listData để chứa dữ liệu

    }
    this.state ={ isLoading: true}
}

 getLanguagesFromServer(itemid) {
    
    return fetch(config.SERVER_URL +'apimobile.aspx/getchitietthongbao?id='+itemid,{
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

        this.setState({
        isLoading: false,
        message: JSON.stringify(responseJson.d),
        listData: JSON.parse(responseJson.d)
        }, function(){

        });

    })
    .catch((error) =>{
        console.error(error);
    });
    
}

getLichsuFromServer(itemid) {
    
    return fetch(config.SERVER_URL +'apimobile.aspx/getlistthongbao?id='+itemid,{
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

        this.setState({
        isLoading: false,
        message: JSON.stringify(responseJson.d),
        listDataLichsu: JSON.parse(responseJson.d)
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
    this.props.navigation.navigate("Details")
}

componentDidMount() {
    AsyncStorage.getItem("token").then(result =>{
        this.setState({token: result});
        //alert(result+ "123");
        const {navigation}=this.props;
        const itemid = navigation.getParam('itemid','0')
    //alert(itemid)
        this.getLanguagesFromServer(itemid);
        global.unreadMessagesCount=(parseInt(global.unreadMessagesCount)-1);
        //this.getLichsuFromServer(itemid);

        //console.log(result);
      });
}

    
render() {
    const {navigation}=this.props;
    const itemid = navigation.getParam('itemid','0')
      return(
        <SafeAreaView style={{flex:6}}>
            <View style={{flex:4}}>
                <Text style={{display:'none'}}>itemid: {JSON.stringify(itemid)}</Text>
                <FlatList
                    style={{margin:5}}
                    data={this.state.listData}
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
        <Thongbaochitietitem
            data={item} //Truyền item này qua ViewItem như một prop
            onPressItem={(itemPress) => { this.onPressItem(itemPress) }}    // truyền một hàm qua để bắt sự kiện click item
        />
    )
}

renderItemLichsu(item, index) {
    return (
        <Vattulichsu
            data={item} //Truyền item này qua ViewItem như một prop
            onPressItem={(itemPress) => { this.onPressItem(itemPress) }}    // truyền một hàm qua để bắt sự kiện click item
        />
    )
}
}