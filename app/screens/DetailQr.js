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
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, createBottomTabNavigator,createAppContainer } from "react-navigation";
import config from "../configs/config"

import {Vattuitem} from '../views/Vattuitem';
import {Vattulichsu} from '../views/Vattulichsu';
import Detail from '../screens/Detail';

import styles from '../configs/style';


export default class Vattu extends Component {

    //Header ứng dụng (tùy chọn)
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Thông tin vật tư",
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
    
    return fetch(config.SERVER_URL +'apimobile.aspx/gettvattuqr?id='+itemid,{
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
    
    return fetch(config.SERVER_URL +'apimobile.aspx/gettvattulichsuqr?id='+itemid,{
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
        this.getLichsuFromServer(itemid);

        //console.log(result);
      });
    }

    
render() {
    const {navigation}=this.props;
    const itemid = navigation.getParam('itemid','0')
      return(
        <SafeAreaView style={{flex:6}}>
            <View style={{flex:3}}>
                <Text style={{display:'none'}}>itemid: {JSON.stringify(itemid)}</Text>
                <FlatList
                    style={{margin:5}}
                    data={this.state.listData}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
                
            </View>
            <View style={{height:50}}>
                <View style={{marginTop: 5,flexDirection: 'row',alignItems: 'center'}}>
                    <Image
                        style={styles.imgLogo} 
                        resizeMode={'contain'}  
                        source={require('../images/history.png')}
                    />
                    <Text style={{fontSize:20, fontWeight: 'bold', color: 'green', padding:10, textAlign:'center'}}>
                        Lịch sử vật tư</Text>
                </View>
            </View>
            <View style={{flex:3}}>
                <FlatList
                    style={{margin:5}}
                    data={this.state.listDataLichsu}
                    renderItem={({ item, index }) => this.renderItemLichsu(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
                
            </View>
        </SafeAreaView>
        
        
      );
}

/* Hiển thị chi tiết 1 item như thế nào */
renderItem(item, index) {
    return (
        <Vattuitem
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