import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList, ToastAndroid} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';


const timeArray:string[] = [
    '9:30',
    '11:00',
    '12:30',
    '14:00',
    '15:30',
    '17:00',
    '18:30',
    '20:00',
    '21:30',
];

const generateDate = () => {
    const date = new Date();
    let weekday = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let weekdays = [];
    for(let i = 0; i < 7; i++ ){
        let temp = {
            date: new Date(date.getTime() +i * 24 * 60 * 60 * 1000).getDate(),
            day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
        };
        weekdays.push(temp);
    }
    return weekdays;
}

const generateSeat = () => {
    let numRow = 8;
    let numColumn = 3;
    let rowArray = [];
    let start = 1;
    let reachNine = false;

    for(let i = 0; i < numRow; i++){
        let columnArray = [];
        for(let j = 0; j < numColumn; j++){
            let seatObject = {
                number: start,
                taken: Boolean(Math.round(Math.random())),
                selected: false,
            };
            columnArray.push(seatObject);
            start++;
        }
        if (i == 3) {
            numColumn += 2;
        }
        if (numColumn < 9 && !reachNine){
            numColumn += 2;
        }else{
            reachNine = true;
            numColumn -= 2;
        }
        rowArray.push(columnArray);  
    }
    return rowArray;
}

const SeatBookingScreen = ({navigation, route}: any) =>{

    const [dateArray, setDateArray] = useState<any[]>(generateDate());
    const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
    const [price, setPrice] = useState<number>(0);
    
    // 2 demension array
    const [seat, setSeat] = useState<any[][]>(generateSeat());
        
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

    // console.log(JSON.stringify(seat, null, 2));

    const selectSeat = (index:number, subindex: number, num: number) => {
        if(!seat[index][subindex].taken){
            let array: any = [...selectedSeat];
            let temp = [...seat];
            temp[index][subindex].selected = !temp[index][subindex].selected;
            if(!array.includes(num)){
                array.push(num);
                setSelectedSeat(array);
            }else{
                const tempindex = array.indexOf(num);
                if(tempindex > -1){
                    array.splice(tempindex,1);
                    setSelectedSeat(array);
                }
            }
            setPrice(array.length * 100000);
            setSeat(temp);
        }
    }

    const BookSeats = async () => {
        if(
            selectedSeat.length !==0 &&
            timeArray[selectedTimeIndex] !== undefined &&
            dateArray[selectedDateIndex] !== undefined
        ){
            try{
                await EncryptedStorage.setItem(
                    'ticket',
                    JSON.stringify({
                        seat: selectedSeat,
                        time: timeArray[selectedTimeIndex],
                        date: dateArray[selectedDateIndex],
                        ticketImage: route.params.PosterImage,
                    }),
                );
            }catch(error){
                console.error('Something went wrong in BookSeats function', error);
            }
            navigation.navigate('Ticket',{
                seat: selectedSeat,
                time: timeArray[selectedTimeIndex],
                date: dateArray[selectedDateIndex],
                ticketImage: route.params.PosterImage,
            });
        }else{
            ToastAndroid.showWithGravity('Please select seats, date and time of the show', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
    };


    return (
        <ScrollView 
            style={styles.constainer}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <StatusBar hidden/>
            <View>
                <ImageBackground
                    source={{uri: route.params?.bgImage}}
                    style={styles.ImageBG}>

                    <LinearGradient
                        colors={[COLORS.BlackRGB10, COLORS.Black]}
                        style={styles.linearGradient}>
                        <View style={styles.appHeaderContainer}>
                            <AppHeader 
                            name="close" 
                            header={''}
                            action={() => navigation.goBack()}
                            />
                        </View>

                    </LinearGradient>
                </ImageBackground>
                <Text style={styles.screenText}>Screen this side</Text>
            </View>
            <View style={styles.seatContainer}>
                <View style= {styles.containerGap20}>
                    {seat?.map((item, index) => {
                            return(
                                <View key={index} style={styles.seatRow}>
                                    {item?.map((subitem, subindex) => {
                                        return(
                                            <TouchableOpacity key={subitem.number} onPress={() => {
                                                selectSeat(index,subindex, subitem.number);
                                            }}>
                                                <CustomIcon name="seat" style={[
                                                    styles.seatIcon,
                                                    subitem.taken ? {color:COLORS.Grey} : {},
                                                    subitem.selected ? {color:COLORS.Orange} : {},
                                                    ]}/>

                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>    
                            );
                    })}

                </View>
            </View>
            <View style={styles.seatRadioContainer}>
                <View style={styles.radioContainer}>
                    <CustomIcon name="radio" style={[styles.radioIcon, {color:COLORS.White}]} />
                    <Text style={styles.radioText}>Available</Text>
                </View>
                <View style={styles.radioContainer}>
                    <CustomIcon name="radio" style={[styles.radioIcon, {color:COLORS.Grey}]} />
                    <Text style={styles.radioText}>Taken</Text>
                </View>
                <View style={styles.radioContainer}>
                    <CustomIcon name="radio" style={[styles.radioIcon, {color:COLORS.Orange}]} />
                    <Text style={styles.radioText}>Selected</Text>
                </View>
            </View>

            <View>
                <FlatList
                    data={dateArray}
                    keyExtractor={item => item.date}
                    horizontal
                    bounces={false}
                    contentContainerStyle={styles.constainerGap24}
                    renderItem={({item,index}) => {
                        return (
                            <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                                <View
                                    style={[
                                        styles.dateContainer,
                                        index == 0 ? {marginLeft: SPACING.space_24} : index == dateArray.length - 1 ? {marginRight:SPACING.space_24}:{},
                                        index == selectedDateIndex ? {backgroundColor: COLORS.Orange}:{},
                                    ]}>
                                    <Text style={styles.dateText}>{item.date}</Text>
                                    <Text style={styles.dayText}>{item.day}</Text>

                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />

            </View>

            <View style={styles.outerContainer}>
                <FlatList
                    data={timeArray}
                    keyExtractor={item => item}
                    horizontal
                    bounces={false}
                    contentContainerStyle={styles.constainerGap24}
                    renderItem={({item,index}) => {
                        return (
                            <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                                <View
                                    style={[
                                        styles.timeContainer,
                                        index == 0 ? {marginLeft: SPACING.space_24} : index == dateArray.length - 1 ? {marginRight:SPACING.space_24}:{},
                                        index == selectedTimeIndex ? {backgroundColor: COLORS.Orange}:{},
                                    ]}>
                                    <Text style={styles.timeText}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />

            </View>

            <View style={styles.buttonPriceContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.totalPriceText}>Total Price</Text>
                    <Text style={styles.price}>{price.toLocaleString()} VND</Text>
                </View>
                <TouchableOpacity onPress={BookSeats}>
                    <Text style={styles.buttonText}>Buy Ticket</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    constainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    ImageBG: {
        width: '100%',
        aspectRatio: 3072/1727,
    },
    linearGradient: {
        height: '100%',
    },
    appHeaderContainer:{
        marginHorizontal:SPACING.space_36,
        marginTop: SPACING.space_36,

    },
    screenText:{
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.WhiteRGBA15,
    },
    seatContainer: {
        marginVertical: SPACING.space_20,
    },
    containerGap20:{
        gap:SPACING.space_20,
    },
    seatRow: {
        flexDirection: 'row',
        gap: SPACING.space_20,
        justifyContent: 'center',
    },
    seatIcon: {
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
    },

    seatRadioContainer: {
        flexDirection: 'row',
        marginTop: SPACING.space_2,
        marginBottom:SPACING.space_20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    radioContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    radioIcon: {
        fontSize: FONTSIZE.size_20,
        color: COLORS.White,
    },
    radioText: {
        fontSize:FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_medium,
        color:COLORS.White,
    },
    constainerGap24: {
        gap: SPACING.space_24,
    },
    dateContainer:{
        width: SPACING.space_10 * 6,
        height: SPACING.space_10 * 8,
        borderRadius: BORDERRADIUS.radius_10*10,
        backgroundColor: COLORS.DarkGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_24,
        color: COLORS.White,
    },
    dayText:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_12,
        color: COLORS.White,
    },
    timeContainer:{
        paddingVertical:SPACING.space_10,
        paddingHorizontal:SPACING.space_20,
        borderWidth:1,
        borderColor: COLORS.WhiteRGBA50,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor:COLORS.DarkGrey,
        justifyContent: 'center',


    },
    timeText:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    outerContainer: {
        marginVertical: SPACING.space_20,
        
    },
    buttonPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.space_24,
        paddingBottom: SPACING.space_24,
    },
    priceContainer: {
        alignItems: 'center',
    },
    totalPriceText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.Grey,
    },
    price: {

        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
    },
    buttonText: {
        borderRadius: BORDERRADIUS.radius_25,
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_10,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.White,
        backgroundColor: COLORS.Orange,
    }




});

export default SeatBookingScreen;