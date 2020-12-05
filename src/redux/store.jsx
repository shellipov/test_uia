import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer from './reducers/mainReducer';
import thunk from 'redux-thunk'



const store = createStore(
  combineReducers({
    main: mainReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
