import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage, changeCity} from '../../redux/actions';
import { Link } from "react-router-dom";
import langData from '../../data/langData';
import cityList from '../../data/cityList';
import './style.scss';

const Header: React.FC = () => {

    const dispatch = useDispatch();
    const lang = useSelector((store)=>store.main.lang)
    const city = useSelector((store)=>store.main.city)
    const userHistory = JSON.parse(window.localStorage.getItem('userHistory'))

    useEffect(() => {

        if(!userHistory){
            const history = [];
            window.localStorage.setItem('userHistory', JSON.stringify(history));
        }

        let language = window.navigator ? (window.navigator.language ||
            window.navigator.systemLanguage ||
            window.navigator.userLanguage) : "ru";
            language = language.substr(0, 2).toLowerCase();

        const languages =  Object.keys(langData)
        if(languages.includes(language)){
          dispatch(changeLanguage(language))
          dispatch(changeCity(cityList[0][language]))
        }
            
    }, []);

    const handleLang = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeLanguage(e.target.value))
        const previousLanguage = e.target.value === 'ru' ?  'en' : 'ru'
        const cities = cityList.map(city => city[previousLanguage])
        if(cities.includes(city)){
          const index = cities.indexOf(city);
          dispatch(changeCity(cityList[index][e.target.value]))
        }
    };

  return (
    <>
      <header className="row justify-content-center">
        <div className="col-md-4">
          <Link to="/">{langData[lang].weather}</Link>
        </div>
        <div className="col-md-4">
          <Link to="history">{langData[lang].weatherHistory}</Link>
        </div>
        <div className="col-md-4">
        <span>{langData[lang].language}</span>
                <select onChange={handleLang}>
                    <option selected={lang === "ru"} value="ru">{langData[lang].ruLang}</option>
                    <option selected={lang === "en"} value="en">{langData[lang].enLang}</option>
                </select>
        </div>
      </header>
    </>
  );
};

export default Header;
