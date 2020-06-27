import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export class Tacphamitem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        //render ra màn hình item được truyền vào thông qua props
        return (
            <View style={this.props.data1%2===0?Styles.inputsContainer:Styles.inputsContainerold}>
            <TouchableOpacity style={Styles.fullwidth} onPress={() => this.props.onPressItem(this.props.data.ID)}>
               
            <Text style={Styles.textten}>{this.props.data.MA_VAT_TU + ' - ' + this.props.data.TEN_VAT_TU}</Text>
            </TouchableOpacity>
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
    fullwidth: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: '#FFF',
        marginBottom: 2,
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
        width: '100%',
        flexWrap: 'wrap'

    }
});

