import axios from 'axios';

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,
});
export const getWeather = (city: string, lang: string) => instance.get(`forecast?appid=ce1fe59a97e1d3ca691fd2a7a7a2db8a&q=${city}&units=metric&lang=${lang}`)
    .then((response) => response.data);

export const something = () => instance.get('something');