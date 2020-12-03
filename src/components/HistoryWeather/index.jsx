import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const HistoryWeather: React.FC = () => {
 
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?appid=ce1fe59a97e1d3ca691fd2a7a7a2db8a&q=Moscow&units=metric&lang=ru
                `,
              );
              const {list} = await response.json();
              setData(list)
              console.log(list);
              
        })();
      }, []);

    return <>
        <Link to='/'>Погода</Link>
        <h1>История погоды</h1>
        {data.length>1 && data.map((day) => {
            return <div>{day.weather[0].description}</div>
            
        
        }  )}
    </>
}

export default HistoryWeather