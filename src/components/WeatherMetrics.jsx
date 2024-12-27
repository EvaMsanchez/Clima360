import { Sunrise, Sunset, Wind, Droplets, Gauge, Thermometer } from "lucide-react";


const WeatherMetrics = ({sunrise, sunset, wind, humidity, pressure, feelsLike}) => {
  const metrics = [
    { icon: Sunrise, label: "Amanecer", value: sunrise },
    { icon: Sunset, label: "Atardecer", value: sunset },
    { icon: Wind, label: "Viento", value: wind },
    { icon: Droplets, label: "Humedad", value: humidity },
    { icon: Gauge, label: "Presión", value: pressure },
    { icon: Thermometer, label: "Sensación", value: feelsLike },
  ];

  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-white/80 shadow-md"
        >
          <div className="flex flex-col items-center">
            <metric.icon className="w-6 h-6 text-weather-primary mb-2" />
            <span className="text-sm text-gray-500 mb-1">{metric.label}</span>
            <span className="text-lg font-medium">{metric.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeatherMetrics