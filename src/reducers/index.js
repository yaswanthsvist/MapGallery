import { combineReducers } from 'redux';
import nav from './navReducer';

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