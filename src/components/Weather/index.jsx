import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeather } from "../../api/api";
import { changeCity, changeHisrory } from "../../redux/actions";
import langData from "../../data/langData";
import cityList from "../../data/cityList";

const Weather: React.FC = () => {
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState([]);
  const [inputValue, setInputValue] = useState("Moscow");
  const [error, setError] = useState("");
  const lang = useSelector((store) => store.main.lang);
  const city = useSelector((store) => store.main.city);

  useEffect(() => {
    let language = window.navigator
      ? window.navigator.language ||
        window.navigator.systemLanguage ||
        window.navigator.userLanguage
      : "ru";
    language = language.substr(0, 2).toLowerCase();

    const isExistingCity = cityList.map((city) => city[lang]).includes(city);

    if (isExistingCity) {
      (async () => {
        getWeather(city, lang).then(({ list }) => {
          const dayList = list.filter((elem, index) => index % 8 === 0);
          setError("");
          setInputValue(city);
          setWeatherData(dayList);
          const history = JSON.parse(
            window.localStorage.getItem("userHistory")
          );
          const time = new Date();
          const number = history.length + 1;
          history.push({
            number: number,
            date: dayList[0].dt_txt.slice(0, 10),
            hour: `${time.getHours()}`,
            city: city,
            temp: dayList[0].main.temp,
          });
          window.localStorage.setItem("userHistory", JSON.stringify(history));
          dispatch(changeHisrory(history));
        });
      })();
    } else {
      setError(langData[lang].cityError);
      setWeatherData([]);
    }
  }, [city, lang, dispatch]);

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeCity(e.target.value));
    setInputValue(e.target.value);
  };

  return (
    <>
      <section className="container-fluid">
        <div>
          <span>{langData[lang].city} </span>
          <input
            name="city"
            list="cities"
            onChange={handleCity}
            value={inputValue}
          />
          <datalist id="cities">
            {cityList.map((city) => {
              return <option key={city.value}>{city[lang]}</option>;
            })}
          </datalist>
          <div>{error}</div>
        </div>

        <h1>{city}</h1>

        {weatherData.map((day) => {
          return (
            <div className="card" key={day.dt_txt}>
              <div>
                {" "}
                {langData[lang].date}: {day.dt_txt.slice(0, 10)}
              </div>
              <div>
                {" "}
                {langData[lang].temp}: {day.main.temp}
              </div>
              <div>
                {" "}
                {langData[lang].feels_like}: {day.main.feels_like}
              </div>
              <div>
                {" "}
                {langData[lang].description}: {day.weather[0].description}
              </div>
              <br />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Weather;
