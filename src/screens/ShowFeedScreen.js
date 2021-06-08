import React from 'react';
import { View, Text, StyleSheet, Linking, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext } from 'react';
import rssfeed from '../api/rssfeed';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

const ShowFeedScreen = ({ navigation }) => {
    const feedListContext = useContext(FeedListContext);
    const feedID = navigation.getParam('id');
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID);
    const fetch = rssfeed(feed.urlFeed);
    const { state, fetchItems, deleteAll, deleteItem} = useContext(FeedContext);
    

    
    useEffect(() => {
        deleteAll();
        fetchItems(fetch);
    }, []);

    const abrirLink = (link) => {
        Linking.openURL(link);
    }

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(item) => item.link }
                renderItem={({ item }) => {
                    
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.texto} onPress={() => abrirLink(item.link)}>
                            <Image style={styles.image} source={{ uri:
                                item.image ? item.image : 
                                'https://freefrontend.com/assets/img/css-weather-icons/html-css-animated-weather-icons.png'
                            }} />
                                <Text style={styles.dataPubl}>{new Date(item.dataPubl).toLocaleString('ru-RU')}</Text>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description} >{item.description.slice(0,1000)}...(Продолжение в источнике)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {deleteItem(item.link)}}>
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 3,
        borderColor: 'gray',
    },
    texto:{
        width:'95%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 350,
        height: 120,
        borderRadius: 4,
        margin: 4
    },
    description: {
        fontSize: 15,
    },
    dataPubl: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 20,
    }
});

export default ShowFeedScreen;
