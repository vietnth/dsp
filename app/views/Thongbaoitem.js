import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export class Thongbaoitem extends React.Component {

    constructor(props) {
        super(props);
        //alert(this.props.data.DA_XEM);
    }

    render() {
        //render ra màn hình item được truyền vào thông qua props
        //alert(this.props.data1)
        // if(index%2===0) {
            
        // }
     
        return (
            <View style={this.props.data1%2===0?Styles.inputsContainerold:Styles.inputsContainer}>
                
                {/* <TouchableOpacity onPress={() => this.props.onPressItem(this.props.data.ID)}>
                <View>
                    <Text>     
                        <Icon color="white" name="share-alt" size={42}/>
                    </Text>
                </View>
                </TouchableOpacity> */}
                <TouchableOpacity style={Styles.fullwidth} onPress={() => this.props.onPressItem(this.props.data.ID)}>
                    
                    <View style={Styles.inputsContainer1}>
                        
                        <Text style={Styles.noidungthongbao}>
                            {this.props.data.TIEU_DE}
                            
                        </Text> 
                             
                    </View>

                    <View style={Styles.inputsContainer1}>
                        <Image style={[{height:30, width:30, marginTop:5, marginLeft:5}, this.props.data.DA_XEM? Styles.hide:Styles.visible]} 
                            source={require('../images/new.png')}   />
                        <Text style={Styles.tieudethongbao}>
                            {this.props.data.NGAY_THONG_BAO + ' - ' + this.props.data.NGUOI_GUI}
                        </Text>
                             
                    </View>
                               
                </TouchableOpacity>
             
                {/* <View>
                <Image style={{height:20, width:20}} source={{uri:'https://toanha.dsp.vn/Images/thundericon1.png'}}   />
                </View> */}
            </View>
            
            
        )
    }
}

const Styles = StyleSheet.create({
    inputsContainer: {
        flex: 1,
        width: '100%',
        backgroundColor:"#FFF"
        
    },
    inputsContainerold: {
        flex: 1,
        width: '100%',
        backgroundColor:"#cdf2e9"
    },
    inputsContainer1: {
        flex: 1,
        width: '100%',
        flexDirection: 'row'
    },
    visible:{
        display:"flex"
    },
    hide:{
        display:"none"
    },
    fullwidth: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 4,
        width: '100%',
       
    },
    imgLogo: {
        width: 50,
        height: 50,
        margin: 8,
        marginLeft: 16,
        marginRight: 16
    },
    textLanguage: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#000',
        marginLeft: 5, 


    },
    textten: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        padding: 10,        
        width: '100%',
        flexWrap: 'wrap'

    },
    tieudethongbao: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        padding: 10,        
        width: '100%',
        flexWrap: 'wrap',
        fontStyle:"italic",
        
    },
    noidungthongbao: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        padding: 10,        
        width: '100%',
        flexWrap: 'wrap'

    }
});

