import React from 'react';
import {Text, View, StyleSheet, Touchable, TouchableOpacity, Image, InteractionManager} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomIcon from './CustomIcon';


const genre: any = {
    28: 'Action', 
    12: 'Advanture', 
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentry',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    104: 'Music',
    9648: 'Mystry',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

const MovieCard = (props: any) =>{
    return (

        <TouchableOpacity onPress={() => props.cardFuntion()}>
            <View style={[styles.constainer, 
                props.shouldMarginatedAtEnd ?
                    props.isFirst ?
                        {marginLeft:SPACING.space_36} :
                        props.isLast ? {marginRight:SPACING.space_36}:{}
                    :{},
                    props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
                    {maxWidth: props.cardWidth},
                    ]} >
                <Image 
                style={[styles.cardImage, {width: props.cardWidth}]} 
                source={{uri: props.imagePath}}
                />
                <View style={styles.rateContainer}>
                    <CustomIcon name="star" style={styles.starIcon}/>
                    <Text style={styles.voteText}> 
                        {props.vote_average}  ({props.vote_count} votes)
                    </Text>
                </View>
                <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
                <View style={styles.genreContainer}>
                    {props.genre.map((item: any) => {
                        return (
                            <View key={item} style={styles.genreBox}>
                                <Text style={styles.genreText}> {genre[item]} </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </TouchableOpacity>

    ); 
}; 

const styles = StyleSheet.create({
    constainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    cardImage: {
        aspectRatio: 2/3,
        borderRadius: BORDERRADIUS.radius_20,
    },
    textTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_24,
        color:COLORS.White,
        textAlign: 'center',
        paddingVertical:SPACING.space_10,
    },
    rateContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.space_10,
    },
    starIcon: {
        fontSize:FONTSIZE.size_20,
        color: COLORS.Orange,
    },
    voteText: {
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_14,
        color: COLORS.White,
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
        paddingVertical: SPACING.space_4,
        paddingHorizontal: SPACING.space_10,
        borderRadius: SPACING.space_20,
    },
    genreText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.WhiteRGBA75,
    },
});

export default MovieCard;