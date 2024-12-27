const CurrentWeather = ({ city, temperature, description, date, icon: IconComponent }) => {

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 p-8 rounded-2xl bg-white/80 shadow-lg">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-2">{city}</h1>
        <p className="text-gray-500 mb-6">{date}</p>
        <div className="flex items-center justify-center mb-6">
          <IconComponent  className="w-20 h-20 text-weather-primary mr-4" />
          <span className="text-6xl font-light">
            {temperature}°
          </span>
        </div>
        <p className="text-xl text-gray-600 capitalize">{description}</p>
      </div>
    </div>
  )
}

export default CurrentWeather