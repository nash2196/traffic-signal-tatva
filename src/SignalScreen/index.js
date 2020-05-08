import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import Light from 'src/components/Light';
import SettingsPopUp from 'src/components/SettingsPopUp';
import AmbButton from 'src/components/AmbButton';

import {CommonStyles} from 'src/utils/CommonStyles';
import styles from './styles';
import SETTINGS_ICON from 'src/assets/settings.png';

export default (props) => {

    const [configOpen, setConfigOpen] = React.useState(false);
    const [timeDuration, setTimeDuration] = React.useState(5000);
    const [rotation, setRotation] = React.useState('clockwise');
    const [ambDuration, setAmbDuration] = React.useState(10000);
    const [ambActive, setAmbActive] = React.useState(false);

    let [timerA, setTimerA] = React.useState(timeDuration);
    const [currentLight, setCurrentLight] = React.useState(0);
    const [sequence, setSequence] = React.useState(['A', 'B', 'C', 'D']);

    React.useEffect(() => {
        if (timerA === 0) {
            if (ambActive) {
                setAmbActive(false);
            }
            setCurrentLight((currentLight + 1) % 4);
            return;
        }

        const timerInterval = setInterval(() => {
            console.log('interval', timerA);
            setTimerA(timerA - 1000);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [timerA]);

    React.useEffect(() => {
        if (ambActive) {
            setTimerA(ambDuration);
        } else {
            setTimerA(timeDuration);
        }
    }, [currentLight]);

    React.useEffect(() => {
        switch (rotation) {
            case 'clockwise':
                setSequence(['A', 'B', 'C', 'D']);
                break;
            case 'anticlockwise':
                setSequence(['A', 'D', 'C', 'B']);
                break;
            case 'cross':
                setSequence(['A', 'C', 'D', 'B']);
                break;
        }
    }, [rotation]);


    //User interaction

    const onToggleSettings = () => {
        setConfigOpen(!configOpen);
    };

    const onClickAmb = (key) => {
        let keyIdx = sequence.findIndex(i => i === key);
        setAmbActive(true);
        setCurrentLight(keyIdx);
    };

    const onChangeConfig = (changed) => {
        onToggleSettings();
        if (timeDuration !== changed.timeDuration) {
            setTimeDuration(changed.timeDuration);
        }
        if (ambDuration !== changed.ambDuration) {
            setAmbDuration(changed.ambDuration);
        }
        if (rotation !== changed.rotation) {
            setRotation(changed.rotation);
        }
    };

    return (
        <View style={CommonStyles.fullFlex}>
            <View style={styles.titleContainer}>
                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center',
                }}>
                    {'Traffic Signal'}
                </Text>
            </View>
            <TouchableOpacity style={styles.settingsBtn}
                              activeOpacity={0.8}
                              onPress={onToggleSettings}>
                <Image style={{height: 45, width: 45}}
                       source={SETTINGS_ICON}
                       resizeMode={'contain'}/>
            </TouchableOpacity>
            <View style={CommonStyles.fullFlex}>
                <View style={CommonStyles.fullCenter}>
                    <AmbButton onPress={() => onClickAmb('A')}
                               active={ambActive && sequence[currentLight] === 'A'}/>
                    <Light title={'A'}
                           tintColor={'black'}
                           active={sequence[currentLight] === 'A'}/>
                    <Text style={styles.timeLabel}>
                        {sequence[currentLight] === 'A' ? parseInt(timerA / 1000) : parseInt(timeDuration / 1000)}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowCenterContainer}>
                        <AmbButton onPress={() => onClickAmb('D')}
                                   active={ambActive && sequence[currentLight] === 'D'}/>

                        <Light title={'D'}
                               tintColor={'black'}
                               active={sequence[currentLight] === 'D'}/>
                        <Text style={styles.timeLabel}>
                            {sequence[currentLight] === 'D' ? parseInt(timerA / 1000) : parseInt(timeDuration / 1000)}
                        </Text>
                    </View>

                    <View style={styles.rowCenterContainer}>
                        <Text style={styles.timeLabel}>
                            {sequence[currentLight] === 'B' ? parseInt(timerA / 1000) : parseInt(timeDuration / 1000)}
                        </Text>
                        <Light title={'B'}
                               tintColor={'black'}
                               active={sequence[currentLight] === 'B'}/>
                        <AmbButton onPress={() => onClickAmb('B')}
                                   active={ambActive && sequence[currentLight] === 'B'}/>
                    </View>
                </View>
                <View style={CommonStyles.fullCenter}>
                    <AmbButton onPress={() => onClickAmb('C')}
                               active={ambActive && sequence[currentLight] === 'C'}/>

                    <Light title={'C'}
                           tintColor={'black'}
                           active={sequence[currentLight] === 'C'}/>
                    <Text style={styles.timeLabel}>
                        {sequence[currentLight] === 'C' ? parseInt(timerA / 1000) : parseInt(timeDuration / 1000)}
                    </Text>
                </View>
            </View>
            <SettingsPopUp isOpen={configOpen}
                           onClose={onToggleSettings}
                           currentValues={{
                               timeDuration,
                               rotation,
                               ambDuration,
                           }}
                           onConfirm={onChangeConfig}/>
        </View>
    );
}
