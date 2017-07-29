import { combineReducers } from 'redux';
import nav from './navReducer';

const tickerDefault={id:null,first_tickerid:null,first_ticker:0,second_ticker:0,toggle_message:false}

const ticker=(state=tickerDefault,action)=>{
  switch(action.type){
    case "RESET_TICKER":
      return {id:null,first_tickerid:null,first_ticker:0,second_ticker:0,toggle_message:false};
      break;
    case "SET_FIRST_TIMER_ID":
      return {...state, first_tickerid:action.id};
      break;
    case "UPDATE_TICKER":
      return { ...state , first_ticker : action.first_ticker ,  second_ticker : action.second_ticker , toggle_message : action.toggle_message };
      break;
    default:
      return state;
  }
};


const images=(state=[],action)=>{
  switch(action.type){
    case "ADD_IMAGE":
      return [...state,{uri:action.image,location:action.location}];
      break;
    case "REMOVE_ALL_IMAGES":
      return [];
      break;
    default:
      return state;
  }
};

rootReducer=combineReducers({
  nav,
  images,
  ticker,
})
export default rootReducer;
