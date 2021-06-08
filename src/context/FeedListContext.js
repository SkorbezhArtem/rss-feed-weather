import { Alert } from 'react-native';
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved_feeds';

const saveFeeds = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(KEY, jsonValue);
        console.log('Feed Async');
    } catch (e) {
        console.log('Error: ' + e);
    }
}

//Remover item
const deleteItem = async () => {
    try {
        await AsyncStorage.removeItem(KEY)
        console.log('Remove')
      } catch(e) {
        alert('Ошибка!', 'Не удалось удалить!');
        console.log('Error: ' + e);
      }
  }

//get feeds 
const getMyFeed = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY).then(console.log);
      return jsonValue != null ? JSON.parse(jsonValue) : null
      
    } catch(e) {
      alert('Ошибка загрузки!', 'Не удалось загрузить RSS');
    }
  }


const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            let feed = {
                title: action.payload.title,
                urlFeed: action.payload.urlFeed,
            }
            newState = [
                ...state,
                feed
            ];

            saveFeeds(newState);

            rssFeeds.push(feed) 
            return newState
        case 'delete_feed':
            rssFeeds.forEach(element => {
                if(element.urlFeed == action.payload){
                    var index = rssFeeds.indexOf(element);
                    rssFeeds.splice(index, 1); 
                }
            });
            newState = state.filter(
                (feed) => feed.urlFeed !== action.payload);

            deleteItem(newState);    
            console.log('Deleted feed '+ action.payload);
            return newState
        case 'restore_state':
            newState = action.payload;
            return newState;
        case 'delete_all':
            console.log('Realize');
            return state;
        case 'get_all':
            newState = state.getMyFeed;
            return newState;
        default:
            return state;
    }
};

const addFeed = dispatch => {
    return (title, urlFeed, callback) => {
        if(title && urlFeed){
            dispatch({
                type: 'add_feed', 
                payload:{  
                    title,
                    urlFeed
                }
            })
            
            if (callback) {
                callback();
            }
            console.log('Add feed: '+ urlFeed);
        }
        else{
            Alert.alert('Ошибка!', 'Заполните поля!');
        }
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_feed', payload: id  });
    };
};

const restoreState = dispatch => async () => {
    try {
        const savedState = await AsyncStorage.getItem(KEY);
        if (!savedState) {
            console.log('No records found');
        }
        else {
            dispatch({ type: 'restore_state', payload: JSON.parse(savedState) })
        }
    } catch (e) {
        console.log('Error: ' + e);
    }
}

const deleteAll = dispatch => {
    return () => {
        console.log('Realize');
    }
}

const rssFeeds = [
    {
        title: 'Минск',
        urlFeed: 'https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/625144',
        description: '',
        urlSite: '',
        urlImage: ''
    },
    
    {
        title: 'Брест',
        urlFeed: 'https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/629634',
        description: '',
        urlSite: '',
        urlImage: ''
    },
    {
        title: 'Гродно',
        urlFeed: 'https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/627904',
        description: '',
        urlSite: '',
        urlImage: ''
    }
    
];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    rssFeeds
);
