import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { BORDERRADIUS, COLORS, SPACING, FONTFAMILY, FONTSIZE } from '../theme/theme';
import CustomIcon from './CustomIcon';

const InputHeader = (props:any) => {

    const [searchText, setSearchText] = useState<string>('');

    return (
        <View style={styles.inputBox}>

            <TextInput style={styles.textInput} 
            onChangeText={textInput => setSearchText(textInput)}
            value={searchText}
            placeholder='Search for  Movies...'
            placeholderTextColor={COLORS.WhiteRGBA15}/>

            <TouchableOpacity style={styles.searchIcon}
            onPress={() => props.searchFunction(searchText)}>
                <CustomIcon name="search" color={COLORS.Orange} size={FONTSIZE.size_20} />
            </TouchableOpacity>
            
            </View>
    );
};

const styles =StyleSheet.create({
    container:{

    },
    inputBox:{
        display: 'flex',
        paddingVertical:SPACING.space_8,
        paddingHorizontal: SPACING.space_24,
        borderWidth: 2,
        borderColor:COLORS.WhiteRGBA15,
        borderRadius: BORDERRADIUS.radius_25,
        flexDirection: 'row',
    },
    textInput:{
        width: '90%',
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:FONTSIZE.size_14,
        color:COLORS.White,
    },
    searchIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.space_10,
    }


});

export default InputHeader;


