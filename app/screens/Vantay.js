import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  AsyncStorage,
  FlatList,
  SafeAreaView,
  Datetime,
  DatePickerIOS
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import styles from '../configs/style';
import Secured from './Secured';
import { NavigationActions, StackActions } from 'react-navigation';
import config from "../configs/config"
import { colors } from 'react-native-elements';

const resetAction = StackActions.reset({
  index:0,
  actions: [NavigationActions.navigate({routeName:"Vattu",params:{item:1}})]
})

export default class Login extends Component {
  //Header ứng dụng (tùy chọn)
  
  static navigationOptions = ({ navigation }) => {
    return {
        title: "Kiểm tra API",
        tabBarVisible: false,
        headerTitleStyle: {
            alignSelf: 'center'
        }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
        mcc: "201",
        ngay: "",
        gio:"",
        chosenDate: new Date() ,
        datet: new Date() 
    }
    //this.setDate = this.setDate.bind(this);

    //this.state ={ isLoading: true}
  }

  setDate(newDate) {
    alert(newDate);
    alert(this.state.chosenDate);
    this.setState({ chosenDate: newDate });
    
  }

  componentDidMount() {
    //this.setState({chosenDate: new Date() });
    //alert(this.state.chosenDate);
  }
  loginevent(){
      //getuserFromServer("url",this.state.email,this.state.password,"3KrZlj82pcH62exCLFP1sxJCbEZPGdc0");
      let formdata= new FormData();
      formdata.append("mcc",this.state.mcc);
      //alert(this.state.datet.getDate());
      let momentObj = moment(this.state.datet, 'YYYY-MM-DD HH:mm:ss')
      // alert(momentObj.format("YYYY") + "-" + (momentObj.format("MM") ) + "-" + momentObj.format("DD") 
      // + " " + momentObj.format("hh") + "-" + momentObj.format("mm") + "-"
      // + momentObj.format("ss") + ":"  + ".000");

      formdata.append("ngay",momentObj.format("YYYY") + "-" + (momentObj.format("MM") ) + "-" + momentObj.format("DD") );
      formdata.append("gio",momentObj.format("YYYY") + "-" + (momentObj.format("MM")) + "-" + momentObj.format("DD") 
      + " " + momentObj.format("HH") + ":" + momentObj.format("mm")  + ":" + momentObj.format("ss") + ".000");
      formdata.append("keys","3KrZlj82pcH62exCLFP1sxJCbEZPGdc0");
      return fetch(config.DSP_URL +'api.aspx?type=insert',{
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(JSON.stringify("Thành công"));

        //console.error(responseJson.d);
        
      })
      .catch((error) =>{
            alert("Kết nối API không thành công!");
      });
      
    }
   
    updateParent(e){
      e.preventDefault();
      this.props.action();
    }

    render() {
      //alert(this.state.token);
     
        return (
          <SafeAreaView style={{flex:1, display:this.state.display}}>
          <View >
                
                 <Picker
                 selectedValue={this.state.mcc}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({mcc: itemValue})
                  }
                  mode={"dropdown"}
                  >
                  <Picker.Item label="AAA" value="201" />
                  <Picker.Item label="BBB" value="202" />
                  <Picker.Item label="CCC" value="203" />
                </Picker>
                
                      
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <DatePicker
                  style={{width: 200, color:'#111111'}}
                  date={this.state.datet}
                  mode="datetime"
                  placeholder="select date"
                  format="YYYY-MM-DD HH:mm:ss"
                  minDate="2019-05-01"
                  maxDate="2036-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({datet: date})}}
                />

                </View>

                <View style={{justifyContent: 'center', alignItems: 'center', marginTop:10}}>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
                  onPress={() => this.loginevent()}
                  >
                  <Text style={styles.loginText}>Kiểm tra kêt nối</Text>
                  </TouchableHighlight>

                </View>

          </View>
           </SafeAreaView>
     );
      
        
    }

    
}
