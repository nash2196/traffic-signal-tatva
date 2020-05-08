import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 15,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCenterContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsBtn: {
        position: 'absolute',
        top: 10,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    timeLabel: {
        margin: 5,
        fontSize: 14,
        color: 'black',
    },
});
