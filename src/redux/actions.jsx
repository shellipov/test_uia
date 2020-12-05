import {
    CHANGE_LANGUAGE,
    CHANGE_CITY,
    CHANGE_HISTORY,
  } from './actionTypes';
  
  export function changeLanguage(lang) {
    return {
      type: CHANGE_LANGUAGE,
      payload: lang,
    };
  }
  
  export function changeCity(city) {
    return {
      type: CHANGE_CITY,
      payload: city,
    };
  }


  export function changeHisrory(data) {
    return {
      type: CHANGE_HISTORY,
      payload: data,
    };
  }