import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, ImageBackground, Image} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';

const TicketScreen = ({navigation, route}: any) =>{

    const [ticketData, setTicketData] = useState<any>(route.params);
    useEffect(() =>{
        (async () => {
            try{
                const ticket = await EncryptedStorage.getItem('ticket');
                if(ticket !== undefined && ticket !== null){
                    setTicketData(JSON.parse(ticket));
                }

            }catch(error){
                console.error('Something went wrong while getting data', error);
            }
        })();
    },[]);

    if(ticketData !== route.params && route.params != undefined){
        setTicketData(route.params);
    }

    console.log('ticket', ticketData);
    if(ticketData ==undefined || ticketData == null){
        return (
            <View style={styles.constainer}>
                <StatusBar hidden/>
                <View style={styles.appHeaderContainer}>
                            <AppHeader 
                            name="close" 
                            header={'My Tickets'}
                            action={() => navigation.goBack()}
                            />
                </View>
            </View>
        );
    }
    

    return (
        <View style={styles.constainer}>
            <StatusBar hidden/>
                <View style={styles.appHeaderContainer}>
                    <AppHeader 
                    name="close" 
                    header={'My Tickets'}
                    action={() => navigation.goBack()}
                    />
        </View>

            <View style={styles.ticketContainer}>
                <ImageBackground source={{uri:ticketData?.ticketImage}} style={styles.ticketImage}>
                    <LinearGradient colors={[COLORS.OrangeRGBA0, COLORS.Orange]} style={styles.linearGradient}>

                    </LinearGradient>
                </ImageBackground>
                
                <View style={styles.linear}></View>

                <View style={styles.ticketFooter}>
                    <View style={[styles.blackCircle, {position: 'absolute', top: -40, left: -40}]}></View>
                    <View style={[styles.blackCircle, {position: 'absolute', top: -40, right: -40}]}></View>

                    <View style={styles.ticketDateContainer}>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.dateTitle}> {ticketData?.date.date} </Text>
                            <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
                        </View>
                        <View style={styles.subtitleContainer}>
                            <CustomIcon name="clock" style={styles.clockIcon}/>
                            <Text style={styles.subtitle}>{ticketData?.time}</Text>
                        </View>
                    </View>

                    <View style={styles.ticketSaetContainer}>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subheading}>Hall</Text>
                            <Text style={styles.subtitle}>02</Text>
                        </View>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subheading}>Row</Text>
                            <Text style={styles.subtitle}>04</Text>
                        </View>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subheading}>Seats</Text>
                            <Text style={styles.subtitle}>
                                {ticketData?.seat.slice(0,ticketData?.seat.length).map((item:any, index: number, arr: any)=> {
                                    return item + (index == arr.length - 1 ? '' : ', ');
                                })}
                            </Text>
                        </View>

                    </View>
                    <Image source={require('../assets/img/barcode.png')} style={styles.barcodeImage}/>
                </View>
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
    ticketContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    ticketImage:{
        alignSelf: 'center',
        width: 300,
        aspectRatio: 200 / 300,
        borderTopLeftRadius: BORDERRADIUS.radius_25,
        borderTopRightRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
        justifyContent: 'flex-end',    
    },
    linearGradient:{
        height: '70%',
    },
    linear: {
        borderTopColor: COLORS.Black,
        borderTopWidth: 3,
        width: 300,
        alignSelf: 'center',
        backgroundColor: COLORS.Orange,
        borderStyle: 'dashed',
    },
    ticketFooter: {
        backgroundColor: COLORS.Orange,
        width: 300,
        alignItems: 'center',
        paddingBottom: SPACING.space_36,
        alignSelf: 'center',
        borderBottomLeftRadius: BORDERRADIUS.radius_25,
        borderBottomRightRadius: BORDERRADIUS.radius_25,
    },
    ticketDateContainer: {
        flexDirection: 'row',
        gap: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SPACING.space_10,    
    },
    dateTitle:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,    
    },
    subtitle:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    clockIcon:{
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
        paddingBottom: SPACING.space_10,
    },
    ticketSaetContainer:{
        flexDirection: 'row',
        gap: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SPACING.space_10,
    },
    subtitleContainer:{
        alignItems: 'center',
    },
    subheading: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.White,
    
    },
    barcodeImage:{
        height: 50,
        aspectRatio: 158/52,
    },
    blackCircle: {
        height: 80,
        width: 80,
        borderRadius: 80,
        backgroundColor: COLORS.Black,
        position: 'absolute',
    }

})

export default TicketScreen;