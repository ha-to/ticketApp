import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, ActivityIndicator, StatusBar, ImageBackground, Image, FlatList, TouchableOpacity, } from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { movieDetails, movieCastDetails, baseImagePath } from '../api/apicall';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CatagoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';


const getMovieDetails = async (movieid:number) => {
    try{
        let response = await fetch(movieDetails(movieid));
        let json = await response.json();
        return json;
    }catch(error){
        console.error('Something went wrong in getMovieDetails', error);
    }
};

const getMovieCastDetails = async (movieid:number) => {
    // console.log(movieCastDetails(movieid));
    try{
        let response = await fetch(movieCastDetails(movieid));
        let json = await response.json();
        return json;
    }catch(error){
        console.error('Something went wrong in getCastMovieDetails', error);
    }
};


const MovieDetailsScreen = ({navigation, route}:any) =>{

    const [movieData, setMovieData] = useState<any>(undefined); 
    const [movieCastData, setMovieCastData] = useState<any>(undefined);

    useEffect(() => {
        (async () => {
            const tempMovieData = await getMovieDetails(route.params.movieid);
            setMovieData(tempMovieData);
        })();

        (async () => {
            const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
            setMovieCastData(tempMovieCastData.cast);
        })();
    }, [])

    // console.log(movieData, movieCastData);
    
    if(movieData == undefined &&
        movieData == null &&
        movieCastData == undefined &&
        movieCastData == null
    ){
        return(
            <ScrollView style={styles.constainer}
                contentContainerStyle={styles.scrollViewContainer}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.appHeaderContainer}>
                    <AppHeader 
                    name="close" 
                    header={'Movie Details'}
                    action={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.Orange} />
                </View>

            </ScrollView>
        );

    }
    return (
        <ScrollView style={styles.constainer}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <StatusBar hidden/>

            <View>

                <ImageBackground source={{uri: baseImagePath('w780', movieData?.backdrop_path)}}
                    style={styles.imageBG}>
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

                <View style={styles.imageBG}></View>
                <Image source={{uri: baseImagePath('w342', movieData?.poster_path)}} 
                style={styles.cardImage}/>

            </View>
            

            <View style={styles.timeContainer} >
                <CustomIcon name="clock" style={styles.clockIcon} />
                <Text style={styles.timeText} > {Math.floor(movieData?.runtime / 60)}h{' '}{Math.floor(movieData?.runtime) % 60}m </Text>
            </View>

            <View>
                <Text style={styles.title}> {movieData?.original_title} </Text>
                <View style={styles.genreContainer}>
                    {movieData?.genres.map((item: any) => {
                        return(
                            <View style={styles.genreBox} key={item.id}>
                                <Text style={styles.genreText}> {item.name} </Text>
                            </View>
                        );
                    })}
                </View>
                <Text style={styles.tagline} > {movieData?.tagline} </Text>
            </View>

            <View style={styles.infoContainer} >
                <View style={styles.rateContainer}>
                    <CustomIcon name="star" style={styles.starIcon}/>
                    <Text style={styles.timeText} >
                        {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
                    </Text>
                    <Text style={styles.timeText}>
                        {movieData?.release_date.substring(8,10)}{' '}
                        {new Date(movieData?.release_date).toLocaleString('default', {month: 'long',})}{' '}
                        {movieData?.release_date.substring(0,4)}
                    </Text>
                </View>
                <Text style={styles.descriptionText}>{movieData?.overview} </Text>
            </View>
            <View>
                <CatagoryHeader title="Top Cast" />
                <FlatList data={movieCastData} keyExtractor={(item:any) =>item.id}
                    horizontal
                    contentContainerStyle={styles.containerGap24} 
                    renderItem={({item,index}) => (<CastCard
                        shouldMarginatedAtEnd={true}
                        cardWidth={80}
                        isFirst={index == 0 ? true: false}
                        isLast={index == movieCastData.length - 1 ? true : false}
                        imagePath={baseImagePath('w185', item.profile_path)}
                        title={item.original_name}
                        subtitle={item.character}   
                    />
                )}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.buttonBG} onPress={() =>{
                    navigation.push('SeatBooking', {
                        bgImage: baseImagePath('w780', movieData.backdrop_path),
                        PosterImage:baseImagePath('original', movieData.poster_path)
                    });
                }}>
                    <Text style={styles.buttonText}>Book</Text>
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
    loadingContainer:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        flex:1,
    },
    appHeaderContainer:{
        marginHorizontal:SPACING.space_36,
        marginTop: SPACING.space_36,

    },
    imageBG:{
        width: '100%',
        aspectRatio: 3072/1727,
    },
    linearGradient: {
        height: '100%',

    },
    cardImage:{
        width: '60%',
        aspectRatio: 200/300,
        position: 'absolute',
        bottom:0,
        alignSelf: 'center',
        borderRadius: BORDERRADIUS.radius_25,
    },
    clockIcon:{
        fontSize: FONTSIZE.size_20,
        color: COLORS.WhiteRGBA50,
        marginRight: SPACING.space_8,
    },
    timeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.WhiteRGBA75,
    },
    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: SPACING.space_15,
    },
    title: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
        marginHorizontal: SPACING.space_36,
        marginVertical: SPACING.space_15,
        textAlign: 'center',
    },
    genreContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: SPACING.space_20,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    genreBox: {
        borderColor: COLORS.WhiteRGBA50,
        borderWidth: 1,
        paddingHorizontal: SPACING.space_10,
        paddingVertical: SPACING.space_4,
        borderRadius: BORDERRADIUS.radius_25,
    },
    genreText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.WhiteRGBA75,

    },
    tagline: {
        fontFamily: FONTFAMILY.poppins_thin,
        fontSize: FONTSIZE.size_14,
        fontStyle: 'italic',
        color: COLORS.White,
        marginHorizontal: SPACING.space_36,
        marginVertical: SPACING.space_15,
        textAlign: 'center',
    },
    infoContainer: {
        marginHorizontal: SPACING.space_24,

    },
    rateContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',        
    },
    starIcon: {
        fontSize: FONTSIZE.size_20,
        color: COLORS.Orange,

    },
    descriptionText:{
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_12,
        color: COLORS.White,
        paddingTop: SPACING.space_4,
    },
    containerGap24: {
        gap: SPACING.space_24,

    },
    buttonBG:{
        alignItems:'center',
        marginVertical: SPACING.space_24,
    },
    buttonText: {
        borderRadius: BORDERRADIUS.radius_25 * 2,
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_10,
        backgroundColor: COLORS.Orange,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    }



});

export default MovieDetailsScreen;