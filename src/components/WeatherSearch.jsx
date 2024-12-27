import { useState } from "react";
import { Search } from "lucide-react";


const WeatherSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex-grow">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ciudad..."
          className="w-full px-4 py-3 pl-12 rounded-xl bg-white/80 border border-gray-200 placeholder-gray-500"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  )
}

export default WeatherSearch