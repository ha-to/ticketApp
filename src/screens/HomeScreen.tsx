import React, {useEffect, useState} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    ActivityIndicator, 
    ScrollView, 
    StatusBar,
    FlatList,
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { 
    upComingMovies, 
    nowPlayingMovies, 
    baseImagePath, 
    searchMovies} from '../api/apicall';
import InputHeader from '../components/InputHeader';
import CatagoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
import SearchScreen from './SearchScreen';


const {width, height} = Dimensions.get('window');


const getnowPlayingMoviesList = async () => {
    // console.log(nowPlayingMovies);
    try{
        let response = await fetch(nowPlayingMovies);
        let json = await response.json();
        return json;
    }
    catch(error){
        console.log(`Something went wrong in getNowPlayingMoviesList Function`, error);

    }
};


const getUpcomingMoviesList = async () => {
    try{
        let response = await fetch(upComingMovies);
        let json = await response.json();
        return json;
    }
    catch(error){
        console.error(`Something went wrong in getUpcomingMoviesList Function`, error);

    }

}


const HomeScreen = ({navigation}: any) =>{

    const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
    const [upComingMoviesList, setUpComingMoviesList] = useState<any>(undefined);
    
    
    useEffect(() => {
        (async() =>{
            let tempNowPlaying = await getnowPlayingMoviesList();
            setNowPlayingMoviesList([{id:'dummy1'},...tempNowPlaying.results, {id:'dummy2'}]);
            
            let tempUpComing = await getUpcomingMoviesList();
            setUpComingMoviesList(tempUpComing.results);
        })();
    },[]);

// console.log(nowPlayingMoviesList.length);

    const searchMoviesFunction = async (name:string) =>{
        navigation.navigate('Search')    
    }

//If no data loaded, display ActivityIndicator
    if(
        nowPlayingMovies == undefined &&
        nowPlayingMovies == null &&
        upComingMovies == undefined &&
        upComingMovies == null
    ){
        return (
            <ScrollView style={styles.constainer} bounces={false}
            contentContainerStyle={styles.scrollViewContainer}>
                <StatusBar hidden />

                <View style={styles.InputHeaderContainer}>
                    <InputHeader searchFunction={searchMoviesFunction}/>
                </View>

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.Orange} />
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.constainer} bounces={false}>
            <StatusBar hidden />

            <View style={styles.InputHeaderContainer}>
                <InputHeader searchFunction={searchMoviesFunction}/>
            </View>

            <CatagoryHeader title = {'Now Plapying'} />

            <FlatList 
                data={nowPlayingMoviesList}
                keyExtractor={(item:any) => item.id}
                horizontal
                decelerationRate={0}
                bounces = {false}
                snapToInterval={width * 0.7 + SPACING.space_36}
                contentContainerStyle={styles.containerGap36}
                renderItem={({item,index}) => {
                    if(!item.original_title){
                        return(
                            <View style={{
                                width: (width - (width * 0.7 +SPACING.space_36 * 2)) / 2 ,
                            }}></View>
                        )
                    }
                    return (
                        <MovieCard
                            shouldMarginatedAtEnd={true}
                            cardFuntion={() => {
                                navigation.push('MovieDetails', {movieid: item.id});
                            }}
                            cardWidth={width * 0.7}
                            isFirst={index == 0 ? true : false}
                            isLast={index == upComingMoviesList?.length - 1 ? true : false}
                            title={item.original_title}
                            imagePath={baseImagePath('w780', item.poster_path)} 
                            genre={item.genre_ids.slice(1,4)}
                            vote_average={item.vote_average}
                            vote_count={item.vote_count}

                        />
                    );
                }}
            />

            <CatagoryHeader title = {'Upcoming'} />

            <FlatList 
                data={upComingMoviesList}
                keyExtractor={(item:any) => item.id}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerGap36}
                renderItem={({item,index}) => (
                    <SubMovieCard
                        shouldMarginatedAtEnd={true}
                        cardFuntion={() => {
                            navigation.push('MovieDetails', {movieid: item.id});
                        }}
                        cardWidth={width / 3}
                        isFirst={index == 0 ? true : false}
                        isLast={index == upComingMoviesList?.length - 1 ? true : false}
                        title={item.original_title}
                        imagePath={baseImagePath('w342', item.poster_path)} 
                    />)}
            />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    constainer:{
        display: 'flex',
        backgroundColor: COLORS.Black,
    },
    scrollViewContainer:{
        flex: 1,
    },
    loadingContainer:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    InputHeaderContainer:{
        marginHorizontal:SPACING.space_36,
        marginTop: SPACING.space_28,
    },
    containerGap36: {
        gap: SPACING.space_36,

    },
    
});

export default HomeScreen;