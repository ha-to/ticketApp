import * as React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import AppHeader from '../components/AppHeader';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import SettingComponent from '../components/SettingComponent';


const UserAccountScreen = ({navigation, item}: any) =>{
    return (
        <View style={styles.constainer}>
            <StatusBar hidden />
            <View style={styles.appHeaderContainer}>
                    <AppHeader 
                    name="close" 
                    header={'My Profile'}
                    action={() => navigation.goBack()}
                    />
            </View>

            <View style={styles.profileContainer} ></View>
            <View style={styles.profileContainer}>
                <SettingComponent
                    icon="user"
                    heading="Account"
                    subheading="Edit Profile"
                    subtitle="Change Password"
                />
                <SettingComponent
                    icon="setting"
                    heading="Settings"
                    subheading="Theme"
                    subtitle="Permissions"
                />
                <SettingComponent
                    icon="dollar"
                    heading="Offers & Refferrals"
                    subheading="Offers"
                    subtitle="Refferrals"
                />
                <SettingComponent
                    icon="info"
                    heading="About"
                    subheading="About Movies"
                    subtitle="More"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    constainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    appHeaderContainer:{
        marginHorizontal:SPACING.space_36,
        marginTop: SPACING.space_36,

    },
    profileContainer: {
        alignItems: 'center',
        padding:SPACING.space_36,
    }
});

export default UserAccountScreen;