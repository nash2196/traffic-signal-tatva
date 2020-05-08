import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default (props) => {

    let size = (screenWidth * 20) / 100;

    const {
        title,
        tintColor,
        active,
    } = props;

    return (
        <View style={{
            height: size,
            width: size,
            borderRadius: 10,
            backgroundColor: active ? 'green' : 'gray',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{
                fontSize: 14,
                color: tintColor,
            }}>
                {title}
            </Text>
        </View>
    );
}
