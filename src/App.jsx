import { useState, useEffect } from 'react'
import axios from 'axios';
import WeatherSearch from "./components/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather";
import WeatherMetrics from "./components/WeatherMetrics";
import WeatherForecast from "./components/WeatherForecast";
import { Cloud, Cloudy, CloudRain, CloudSun, Sun, CloudSnow, CloudLightning, Moon, CloudDrizzle, CloudFog, MoonStar, CloudMoon } from "lucide-react";


// Configura aquí tu API key de OpenWeatherMap
const OPENWEATHER_API_KEY = "77b46cc3c4004fbe79b360868a678e67";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Mapa de códigos de OpenWeatherMap a iconos de Lucide
const weatherIconMap = {
  "01d": Sun, // Sol (día)
  "01n": MoonStar, // Sol (noche)
  "02d": CloudSun, // Parcialmente nublado (día)
  "02n": CloudMoon, // Parcialmente nublado (noche)
  "03d": Cloud, // Nubes dispersas
  "03n": Cloud,
  "04d": Cloudy, // Nubes rotas
  "04n": Cloudy,
  "09d": CloudRain, // Lluvia moderada
  "09n": CloudRain,
  "10d": CloudDrizzle, // Lluvia ligera (día)
  "10n": CloudDrizzle, // Lluvia ligera (noche)
  "11d": CloudLightning, // Tormentas eléctricas (día)
  "11n": CloudLightning, // Tormentas eléctricas (noche)
  "13d": CloudSnow, // Nieve (día)
  "13n": CloudSnow, // Nieve (noche)
  "50d": CloudFog, // Neblina
  "50n": CloudFog,
};


function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchWeatherData = async (city) => {
    try 
    {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`),
        axios.get(`${API_BASE_URL}/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`)
      ]);
      setWeatherData(weatherResponse.data);
      
    
      const getDailyForecast = (forecastData) => {
        const dailyForecast = [];
        const today = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato "YYYY-MM-DD"
      
        // Reducir los datos agrupados por día
        const groupedByDay = forecastData.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000);
          const dayKey = date.toISOString().split("T")[0]; // Clave única para cada día
      
          if (dayKey !== today) 
          { // Ignorar el día actual
            const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });
      
            if (!acc[dayKey]) {
              acc[dayKey] = {
                dayName: dayName,
                tempMin: item.main.temp_min,
                tempMax: item.main.temp_max,
                description: item.weather[0].description,
                icon: item.weather[0].icon.replace("n", "d") // Ahora solo pasamos el código del icono
              };
            } else {
              acc[dayKey].tempMin = Math.min(acc[dayKey].tempMin, item.main.temp_min);
              acc[dayKey].tempMax = Math.max(acc[dayKey].tempMax, item.main.temp_max);
            }
          }
      
          return acc;
        }, {});
      
        // Convertir el objeto agrupado en un array ordenado y redondear las temperaturas
        Object.values(groupedByDay).forEach((dayData) => {
          dailyForecast.push({
            ...dayData,
            tempMin: Math.round(dayData.tempMin), // Redondear temperatura mínima
            tempMax: Math.round(dayData.tempMax), // Redondear temperatura máxima
          })
        })
      
        return dailyForecast.slice(0, 5); // Limitar a los próximos 5 días
      };

      const dailyForecast = getDailyForecast(forecastResponse.data)
      setForecastData(dailyForecast)
      
    } 
    catch (error) 
    {
      console.error('Error fetching weather data:', error)
    }
  }

  // Cargar datos de Madrid al iniciar
  useEffect(() => {
    fetchWeatherData('Madrid');
  }, []);

  useEffect(() => {
    // Aplicar tema al documento
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-weather-background to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        

        {/* Caja para el buscador y el botón */}
        <div className="w-full max-w-2xl mx-auto mb-8 flex items-center space-x-4">
          {/* Componente de búsqueda */}
          <WeatherSearch onSearch={fetchWeatherData} />
       
          {/* Botón de modo oscuro */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-500/80 shadow-lg transition-colors duration-300"
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
      
        </div>

        {weatherData && (
          <>
            <CurrentWeather
              city={weatherData.name}
              temperature={Math.round(weatherData.main.temp)}
              description={weatherData.weather[0].description}
              date={new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              icon={weatherIconMap[weatherData.weather[0].icon]} // Pasa el icono al componente
            />
            
            <WeatherMetrics
              sunrise={new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              sunset={new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              wind={`${Math.round(weatherData.wind.speed)} km/h`}
              humidity={`${weatherData.main.humidity}%`}
              pressure={`${weatherData.main.pressure} hPa`}
              feelsLike={`${Math.round(weatherData.main.feels_like)}°`}
            />
            
            {forecastData && <WeatherForecast forecast={forecastData} />}
          </>
        )}
      </div>
    </div>
  )
}

export default App
