import { combineReducers, createStore} from 'redux';
import throttle from "lodash.throttle";


import board from './board';
import cardsById from './cardsById';
import listsById from './listsById';

const reducers = combineReducers({ board, cardsById,listsById});

const saveState = state => {
  console.log(state);
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch(error) {
      console.log(error);
    }
  };
  
  const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  const persistedState = loadState();
  const store = createStore(reducers, persistedState);
  
  store.subscribe(
    throttle(() => {
      // console.log(store.getState());
      saveState(store.getState());
    })
  );
  
  console.log(store.getState());
  
  export default store;