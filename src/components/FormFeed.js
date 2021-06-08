import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const FormFeed = ({saveFeed}) => {
    const [title, setTitle] = useState();
    const [urlFeed, setUrlFeed] = useState();
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Название города</Text>
            <TextInput style={styles.inputStyle} value={title} 
                onChangeText={text => setTitle(text)}/>

            <Text style={styles.textStyle}>Адрес RSS</Text>
            <TextInput style={styles.inputStyle} value={urlFeed} 
                onChangeText={text => setUrlFeed(text)}/>
            
            <TouchableOpacity style={styles.buttonStyle}
                onPress={() => {
                    saveFeed(title, urlFeed);
                }}
            >
                <Text style={styles.textButtonStyle}>Добавить</Text>
            </TouchableOpacity>
            <Text style={styles.author}>Скорбеж Артём, группа 881073</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle:{
        paddingTop: 150
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center'
    },
    inputStyle: {
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 10
    },
    buttonStyle: {
        margin: 55,
        width: 300,
        height: 70,
        elevation: 10,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    textButtonStyle: {
        marginTop: 8,
        fontSize: 30,
        textAlign: 'center',
        color:'#ffffff'
    },
    author: {
        fontStyle: 'italic',
        marginTop: 280,
        marginLeft: 80,
        fontSize: 20,
    }
});

export default FormFeed;