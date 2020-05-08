/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StatusBar,
} from 'react-native';
import SignalScreen from 'src/SignalScreen';

const App: () => React$Node = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle="dark-content"/>
            <SignalScreen/>
        </SafeAreaView>
    );
};

export default App;
