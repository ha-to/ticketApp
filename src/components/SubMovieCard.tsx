import React from 'react';
import {Text, View, StyleSheet, Touchable, TouchableOpacity, Image} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SubMovieCard = (props: any) =>{
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
                <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
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
        fontSize: FONTSIZE.size_14,
        color:COLORS.White,
        textAlign: 'center',
        paddingVertical:SPACING.space_10,
    },
});

export default SubMovieCard;