document.addEventListener('DOMContentLoaded', function() {
    
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const errorMessage = document.getElementById('errorMessage');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weatherIcon');

    
    getWeatherBtn.addEventListener('click', getWeather);
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getWeather();
        }
    });

   
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        weatherDisplay.classList.remove('active');
    }

    
    async function getWeather() {
        const city = cityInput.value.trim();
        const apiKey = 'YOUR_API_KEY_HERE'; 
        
        weatherDisplay.classList.remove('active');
        errorMessage.style.display = 'none';
        
        if (!city) {
            showError('Please enter a city name');
            return;
        }
        
        try {
            
            getWeatherBtn.textContent = 'Loading...';
            getWeatherBtn.disabled = true;
            
           
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            
           
            getWeatherBtn.textContent = 'Get Weather';
            getWeatherBtn.disabled = false;
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else {
                    throw new Error('Failed to fetch weather data. Please try again later.');
                }
            }
            
        
            const data = await response.json();
            
            
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
            humidity.textContent = `${data.main.humidity}%`;
            wind.textContent = `${data.wind.speed} m/s`;
            description.textContent = data.weather[0].description.charAt(0).toUpperCase() + 
                                     data.weather[0].description.slice(1);
            
           
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
            
       
            weatherDisplay.classList.add('active');
            
        } catch (error) {
            showError(error.message);
            console.error('Error fetching weather data:', error);
        }
    }
});