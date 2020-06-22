import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export class Vattulichsu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        //render ra màn hình item được truyền vào thông qua props
        return (
            <View style={Styles.inputsContainer}>
            <TouchableOpacity style={Styles.fullwidth} onPress={() => this.props.onPressItem(this.props.data.ID)}>
                <View style={{width:'100%'}}>
                    <View style={Styles.vattuinfo}><Text style={Styles.textngay}>{'Ngày cập nhật' + ': ' + this.props.data.NGAY_THAY_DOI}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Thông tin' + ': ' + this.props.data.THONG_TIN}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Nội dung' + ': ' + this.props.data.NOI_DUNG}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Tình trạng' + ': ' + this.props.data.TEN_TINH_TRANG_SU_DUNG}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Người cập nhật' + ': ' + this.props.data.HO_TEN}</Text></View>
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
        backgroundColor: '#f4f4f4',
        marginBottom: 10,
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
    textngay:{
        fontSize: 16,
        fontWeight: 'normal',
        color: 'blue',
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

