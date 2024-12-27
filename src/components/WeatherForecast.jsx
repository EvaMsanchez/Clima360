import { Cloud, Cloudy, CloudRain, CloudSun, Sun, CloudSnow, CloudLightning, CloudDrizzle, CloudFog, MoonStar, CloudMoon } from "lucide-react";


// Mapa de iconos
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

// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


const WeatherForecast = ({ forecast }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="p-6 rounded-xl bg-white/80 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Pronóstico 5 días</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => {
            const WeatherIcon = weatherIconMap[day.icon] // Usar icono por defecto si no está en el mapa
            return (
          
            <div 
              key={index} 
              className="p-4 rounded-xl bg-gradient-to-b from-white/90 to-purple-50/90 shadow-md dark:from-gray-200/90 dark:to-gray-250/90 transition-colors duration-300"
            >
              <div className="flex flex-col items-center">
                {/* Mostrar el nombre del día con la primera letra en mayúscula */}
                <span className="text-sm font-medium mb-2">
                  {capitalizeFirstLetter(day.dayName)}
                </span>
                <WeatherIcon className="w-8 h-8 text-weather-primary" />
                <div className="flex gap-2 text-sm mt-2">
                  <span className="font-medium">{day.tempMax}°</span>
                  <span className="text-gray-400 dark:text-gray-600 transition-colors duration-300">{day.tempMin}°</span>
                </div>
                <span className="text-xs text-gray-500 text-center mt-1 dark:text-gray-600 transition-colors duration-300">
                  {day.description}
                </span>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WeatherForecast