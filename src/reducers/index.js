import { combineReducers } from 'redux';
import nav from './navReducer';


const ticker=(state=[],action)=>{
  switch(action.type){
    case "RESET_TICKER":
      return {id:null,first_tickerid:null,first_ticker:null,toggle_tickerid:false};
      break;
    case "SET_FIRST_TICKER_ID":
      return { ...state , first_tickerid : action.id };
      break;
    case "SET_FIRST_TICKER":
      return { ...state , first_ticker : action.val };
      break;
    case "SET_SECOND_TICKER":
      return { ...state , second_ticker : action.val };
      break;
    case "SHOW_MESSAGE":
      return { ...state , toggle_tickerid : true };
      break;
    case "HIDE_MESSAGE":
      return { ...state , toggle_message : false };
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
})
export default rootReducer;
