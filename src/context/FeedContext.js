import createDataContext from './createDataContext';
import { parse } from 'fast-xml-parser';

const getUrlImg = (string) => {
    str = string.match(/<img(.*?)[/]>/g);
    
    if(str){
        stringRep = string.replace(str[0], '');

        url = str[0].match(
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
            );
        return [url ? "https://"+url[0] : null, stringRep.replace('<br />', '')];
    }
    return [null, string];
    
}

const feedReducer = (state, action) => {
    let newState = [];
    let item;
    switch (action.type) {
        case 'fetch_items':
            action.payload.feedItems.rss.channel.item.forEach(element => {

                let values = getUrlImg(element.description);
                let img = values[0];
                let desc = values[1];
                
                
                item = {
                    title: element.title,
                    link: element.link,
                    description: desc,
                    image: img ? img : null,
                    dataPubl: element.pubDate
                }
                
                newState.push(item);
                
                rssItems.push(item);    
            });
             
            return newState;
        case 'add_item':
            console.log('Realize');
            return state
        case 'delete_item':
            
            rssItems.forEach(element => {
                if(element.link == action.payload){
                    var index = rssItems.indexOf(element);
                    rssItems.splice(index, 1); 
                }
            });
            
            newState = state.filter(
                (item) => item.link !== action.payload);
            console.log('Deleted feed '+ action.payload);
            return newState
        case 'restore_state':
            console.log('Realize');
            return state;
        case 'delete_all':
            
            console.log('Clearing list');
            rssItems.splice(0,rssItems.length)
            return [];
        default:
            return state;
    }
};

const addItem = dispatch => {
    return (title,link,description,image,datePubl) => {
        console.log('Realize');
    };
};

//Remove item
const deleteItem = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_item', payload: id  });
    };
};

//fetch do xml
const fetchItems = dispatch => async (fetch) => {
    const response = await fetch.get();
    const feedItems = parse(response.data);

    dispatch({
        type: 'fetch_items',
        payload: {feedItems}
    });
};

const restoreState = dispatch => async () => {
    return () => {
        console.log('Realize');
    }
}

const deleteAll = dispatch => {
    return () => {
        dispatch({
            type: 'delete_all',
        });
    }
}

const rssItems = [
];

export const { Context, Provider } = createDataContext(
    feedReducer,
    { addItem, deleteItem, fetchItems, restoreState, deleteAll },
    rssItems
);
