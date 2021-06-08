import React from 'react';
import { useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {Context} from '../context/FeedListContext';
import FormFeed from "../components/FormFeed";


const AddFeedScreen = ({ navigation }) => {
    const { addFeed } = useContext(Context);
    return (
        <View>
           <FormFeed saveFeed={
               (title, urlFeed) => {
                addFeed(
                    title,
                    urlFeed,
                    () => navigation.navigate('Index'))}
           }></FormFeed>
        </View>
        
    );
};

export default AddFeedScreen;
