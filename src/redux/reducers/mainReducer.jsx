



import {
    CHANGE_LANGUAGE,
    CHANGE_CITY,
    CHANGE_HISTORY,

  } from '../actionTypes';
  
  const init = {
    lang: 'ru',
    city: 'Москва',
    userHistory: JSON.parse(window.localStorage.getItem('userHistory'))? JSON.parse(window.localStorage.getItem('userHistory')) : [],
  };
  
  export default function reducer(state = init, action) {
    switch (action.type) {

      case CHANGE_LANGUAGE:
        return {
          ...state,
          lang: action.payload,
        };

      case CHANGE_CITY:
        return {
          ...state,
          city: action.payload,
        };

      case CHANGE_HISTORY:
        return {
          ...state,
          userHistory: action.payload,
        };

      default:
        return state;
    }
  }
  