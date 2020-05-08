import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import {CommonStyles} from 'src/utils/CommonStyles';
import Slider from 'react-native-slider';
import RadioForm from 'react-native-simple-radio-button';

const radioOptions = [
    {label: 'Clockwise', value: 'clockwise'},
    {label: 'AntiClockwise', value: 'anticlockwise'},
    {label: 'Cross', value: 'cross'},
];

export default (props) => {

    const {
        isOpen = false,
        onClose,
        onConfirm,
        currentValues,
    } = props;

    const [timeDuration, setTimeDuration] = React.useState(currentValues?.timeDuration ?? 5000);
    const [rotation, setRotation] = React.useState(currentValues?.rotation ?? 'clockwise');
    const [ambDuration, setAmbDuration] = React.useState(currentValues?.ambDuration ?? 10000);


    React.useEffect(() => {
        if (timeDuration !== currentValues.timeDuration) {
            setTimeDuration(currentValues.timeDuration);
        }
        if (ambDuration !== currentValues.ambDuration) {
            setAmbDuration(currentValues.ambDuration);
        }
        if (rotation !== currentValues.rotation) {
            setRotation(currentValues.rotation);
        }
    }, [isOpen]);

    const onClickConfirm = () => {
        onConfirm && onConfirm({
            timeDuration,
            rotation,
            ambDuration,
        });
    };

    return (
        <Modal visible={isOpen}
               animationType={'slide'}
               transparent={true}
               onRequestClose={onClose}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end'}}>
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    minHeight: '50%',
                    paddingHorizontal: 10,
                }}>
                    <View style={{flex: 1, marginVertical: 5}}>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                        }}>
                            {`Time duration: ${timeDuration / 1000}s`}
                        </Text>
                        <Slider
                            minimumValue={5}
                            maximumValue={120}
                            value={timeDuration / 1000}
                            onValueChange={value => setTimeDuration(value * 1000)}
                            step={10}
                        />
                    </View>
                    <View style={{flex: 1, marginVertical: 5}}>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                        }}>
                            {'Signal Rotation'}
                        </Text>
                        <RadioForm
                            radio_props={radioOptions}
                            animation={false}
                            formHorizontal={true}
                            labelHorizontal={true}
                            initial={radioOptions.findIndex(obj => obj === rotation)}
                            onPress={(value) => {
                                setRotation(value);
                            }}
                        />
                    </View>
                    <View style={{flex: 1, marginVertical: 5}}>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                        }}>
                            {`AMB Time Duration: ${ambDuration / 1000}s`}
                        </Text>
                        <Slider
                            minimumValue={10}
                            maximumValue={300}
                            value={ambDuration / 1000}
                            onValueChange={value => setAmbDuration(value * 1000)}
                            step={10}
                        />
                    </View>
                </View>

                <Button title={'Confirm'} onPress={onClickConfirm}/>
            </View>
        </Modal>
    );
}
