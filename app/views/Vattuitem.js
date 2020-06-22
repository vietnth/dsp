import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export class Vattuitem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        //render ra màn hình item được truyền vào thông qua props
        return (
            <View style={Styles.inputsContainer}>
            <TouchableOpacity style={Styles.fullwidth} onPress={() => this.props.onPressItem(this.props.data.ID)}>
                <View style={{width:'100%'}}>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Mã vật tư' + ': ' + this.props.data.MA_VAT_TU}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Tên' + ': ' + this.props.data.TEN_VAT_TU}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Nhóm' + ': ' + this.props.data.TEN_NHOM_TAI_SAN}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Mô tả' + ': ' + this.props.data.MO_TA}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Đơn vị sử dụng' + ': ' + this.props.data.DON_VI_SU_DUNG}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Tình trạng' + ': ' + this.props.data.TEN_TINH_TRANG_SU_DUNG}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Đơn giá' + ': ' + this.props.data.DON_GIA}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Bảo hành' + ': ' + this.props.data.THOI_HAN_BAO_HANH}</Text></View>
                </View>
            
            </TouchableOpacity>
            </View>
            
        )
    }
}

const Styles = StyleSheet.create({
    inputsContainer: {
        flex: 1,
        width: '100%'
    },
    fullwidth: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 1,
        width: '100%'

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
        flexWrap: 'wrap',   
        borderBottomWidth:1,
        borderBottomColor:'#CCC',
        width:'100%'
    },
    vattuinfo:{
        borderBottomWidth:1, borderBottomColor:'#CCC'
    }
});

