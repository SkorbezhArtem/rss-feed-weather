import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Context } from '../context/FeedListContext'
import { useEffect } from 'react';

const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, restoreState} = useContext(Context);

    useEffect(() => {
        restoreState();
    }, []);

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(rssfeed) => rssfeed.urlFeed}
                renderItem={({ item }) => {
                    return (
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => 
                                    navigation.navigate('Show', { id: item.urlFeed })}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => {deleteFeed(item.urlFeed)}}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                    );
                }}
            />
        </>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() =>  navigation.navigate('Add')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
            
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray', 
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 24,
    }
});

export default IndexScreen;
