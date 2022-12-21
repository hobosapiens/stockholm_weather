const API_KEY = '9c84d21cda099352f0de3197359df73b'

export async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}