import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWeather } from "../../api/api";
import langData from '../../data/langData';
import cityList from '../../data/cityList';

const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState("Moscow");
    const [lang, setLang] = useState("ru");
    const [inputValue, setInputValue] = useState('Москва')

    useEffect(() => {

        let language = window.navigator ? (window.navigator.language ||
            window.navigator.systemLanguage ||
            window.navigator.userLanguage) : "ru";
        language = language.substr(0, 2).toLowerCase();
        console.log(language);

        (async () => {
            getWeather(city, lang).then(({ list }) => {
                const dayList = list.filter((elem, index) => index%8 === 0)
                setWeatherData(dayList);
            });
        })();
    }, [city, lang]);

    const handleLang = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLang(e.target.value)
    };

    const handleCity = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCity(e.target.value)
        setInputValue(e.target.value)
    };

    return (
        <>
            <Link to="history">{langData[lang].weatherHistory}</Link>
            
            <div>
            <span>{langData[lang].language}</span>
            <select onChange={handleLang}>
                <option value="ru">{langData[lang].ruLang}</option>
                <option value="en">{langData[lang].enLang}</option>
            </select>

            <span>{langData[lang].city}</span>
            <input name="city" list="cities" onChange={handleCity} value={inputValue} />
            <datalist id="cities">
                {cityList.map(city => {
                    return <option key={city.value}>{city[lang]}</option>
                })}
            </datalist>
            </div>


            <h1>{city}</h1>

            {weatherData.map((day) => {
                return (
                    <div key={day.dt_txt}>
                        <div> {langData[lang].date}: {day.dt_txt.slice(0,10)}</div>
                        <div> {langData[lang].temp}: {day.main.temp}</div>
                        <div> {langData[lang].feels_like}: {day.main.feels_like}</div>
                        <div> {langData[lang].description}: {day.weather[0].description}</div>
                        <br />
                    </div>
                );
            })}
        </>
    );
};

export default Weather;
