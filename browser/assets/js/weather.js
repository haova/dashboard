const showWeatherForm = (error = '') => {
  const weatherElm = document.querySelector('.weather-form');
  const errorElm = weatherElm.querySelector('.error');

  const apiKeyInput = weatherElm.querySelector('#weather-api-key');
  const cityNameInput = weatherElm.querySelector('#weather-city-name');

  errorElm.innerHTML = error;

  apiKeyInput.value = localStorage.getItem('weather-api-key') || '';
  cityNameInput.value = localStorage.getItem('weather-city-name') || '';

  if (!weatherElm.querySelector('button')){
    weatherElm.querySelector('button').onclick = () => {
      localStorage.setItem('weather-api-key', apiKeyInput.value);
      localStorage.setItem('weather-city-name', cityNameInput.value);

      loadWeather();
    }
  }
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
    return;
  }

  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`)

  if (res.status !== 200){
    showWeatherForm('Invalid api key or city name');
    return;
  }
  
  const data = await res.json();

  displayWeather(data.current);
}

document.addEventListener('DOMContentLoaded', () => {
  showWeatherForm();  
  loadWeather();

  setInterval(() => {
    loadWeather();
  }, 1000 * 60 * 5); // every 5 minutes
});