import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default (props) => {

    let size = (screenWidth * 15) / 100;

    const {
        active,
        onPress,
    } = props;

    return (
        <TouchableOpacity style={{
            height: size,
            width: size,
            borderRadius: 10,
            borderColor: 'red',
            borderWidth: 2,
            backgroundColor: active ? 'green' : 'white',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
        }}
                          activeOpacity={0.8}
                          onPress={onPress}>
            <Text style={{
                fontSize: 14,
                color: 'red',
            }}>
                {'AMB'}
            </Text>
        </TouchableOpacity>
    );
}
