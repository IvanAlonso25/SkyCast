import { useState } from 'react';
import '../styles/WeatherLocal.css';
import img from '../assets/magnify.svg';

export const WeatherLocal = () => {
    const [arrayDays, setArrayDays] = useState([]);

    const getLocation = () => {
        const location = document.getElementById('input_location').value;
        document.getElementById('weather-location').style.display = 'flex';
        document.getElementById('weather-weekly').style.display = 'flex';
        document.getElementById('forecast').style.display = 'flex';
        if (location === '') {
            alert('Please enter a location');
            return;
        } else {
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=3c243d92e4e84cc4bb4144149250603&q=${location}&days=3&aqi=no&alerts=yes`)
                .then((resp) => resp.json())
                .then((data) => {
                    document.getElementById('location').value = data.location.name + ", " + data.location.region;
                    document.getElementById('temperature').value = "Temperature " + data.current.temp_c + " °C";
                    document.getElementById('img_weather').src = data.current.condition.icon;
                    document.getElementById('condition').value = data.current.condition.text;
                    document.getElementById('humidity').value = 'Humidity ' + data.current.humidity + ' %';

                    const daysArray = data.forecast.forecastday.map((forecastDay) => {
                        const date = new Date(forecastDay.date);
                        const day = date.toLocaleString('default', { weekday: 'long' });
                        return {
                            day,
                            icon: forecastDay.day.condition.icon,
                            condition: forecastDay.day.condition.text,
                            maxTemp: forecastDay.day.maxtemp_c,
                            minTemp: forecastDay.day.mintemp_c,
                        };
                    });

                    setArrayDays(daysArray); // Actualiza el estado con los datos de los días
                });
        }
    };

    return (
        <div className='weather-main'>
            <div className='search-location'>
                <input type="text" id='input_location' size='50' placeholder='Search city...' />
                <button>
                    <img src={img} alt="Magnify" onClick={getLocation} />
                </button>
            </div>
            <div className='weather-location' id='weather-location'>
                <input type="text" id='location' size='50' disabled />
                <img id='img_weather' alt='imagen weather' />
                <input type="text" id='condition' size='50' disabled />
                <input type="text" id='temperature' size='50' disabled />
                <input type="text" id='humidity' size='50' disabled />
            </div>

            <div className="forecast" id='forecast'>
                <h3>Forecast (3 days)</h3>
            </div>
            
            <div className="weather-weekly" id='weather-weekly'>
                <div className='weather-daily'>
                    {arrayDays.map((day, index) => (
                        <div key={index} className='weather-day'>
                            <div className='card'>
                                <h4>{day.day}</h4>
                                <img src={day.icon} alt="Weather Icon" />
                                <p>{day.condition}</p>
                                <p>Max: {day.maxTemp} °C</p>
                                <p>Min: {day.minTemp} °C</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};