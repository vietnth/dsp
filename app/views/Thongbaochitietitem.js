import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export class Thongbaochitietitem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        //render ra màn hình item được truyền vào thông qua props
        return (
            <View style={Styles.inputsContainer}>
            <TouchableOpacity style={Styles.fullwidth} >
                <View style={{width:'100%'}}>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten}>{'Ngày' + ': ' + this.props.data.NGAY_THONG_BAO}</Text></View>
                    <View style={Styles.vattuinfo1}><Text style={Styles.textten1}>{this.props.data.NGUOI_GUI}</Text></View>
                    <View style={Styles.vattuinfo}><Text style={Styles.textten2}>{'Tiêu đề' + ': ' + this.props.data.TIEU_DE}</Text></View>
                    <View style={Styles.vattuinfo1}><Text style={Styles.textten3}>{"\n"}{this.props.data.NOI_DUNG}</Text></View>
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
    textten1: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        padding: 10,        
        flexWrap: 'wrap',   
        borderBottomWidth:1,
        borderBottomColor:'#CCC',
        width:'100%'
    },
    textten2: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        padding: 10,        
        flexWrap: 'wrap',   
        borderBottomWidth:1,
        borderBottomColor:'#CCC',
        width:'100%'
    },
    textten3: {
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
        borderBottomWidth:1, borderBottomColor:'#CCC',
        backgroundColor:'#cdf2e9'
    },
    vattuinfo1:{
        borderBottomWidth:1, borderBottomColor:'#CCC'
    }
});

