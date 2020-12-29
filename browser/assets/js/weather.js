const showWeatherForm = (error = '') => {
  const weatherElm = document.querySelector('.weather-form');
  const errorElm = weatherElm.querySelector('.error');

  errorElm.innerHTML = error;

  if (weatherElm.getAttribute('status') !== 'hidden')
    return

  weatherElm.setAttribute('status', 'visible');
  weatherElm.querySelector('button').onclick = () => {
    const apiKeyInput = weatherElm.querySelector('#weather-api-key');
    const cityNameInput = weatherElm.querySelector('#weather-city-name');

    localStorage.setItem('weather-api-key', apiKeyInput.value);
    localStorage.setItem('weather-city-name', cityNameInput.value);

    loadWeather();
  }
}

const hideWeatherForm = () => {
  const weatherElm = document.querySelector('.weather-form');
  weatherElm.setAttribute('status', 'hidden');
}

const displayWeather = data => {
  const weatherElm = document.querySelector('.weather');
  weatherElm.setAttribute('status', 'visible');

  const tempElm = weatherElm.querySelector('.temp');
  tempElm.innerHTML = data.temp_c;

  const humiElm = weatherElm.querySelector('.humi');
  humiElm.innerHTML = data.humidity;
}

const loadWeather = async () => {
  const apiKey = localStorage.getItem('weather-api-key');
  const cityName = localStorage.getItem('weather-city-name');

  if (!apiKey && !cityName){
    showWeatherForm();  
    return;
  }

  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`)

  if (res.status !== 200){
    showWeatherForm('Invalid api key or city name');
    return;
  }
  
  const data = await res.json();

  hideWeatherForm();
  displayWeather(data.current);
}

document.addEventListener('DOMContentLoaded', () => {
  loadWeather();

  setInterval(() => {
    loadWeather();
  }, 1000 * 60 * 5); // every 5 minutes
});