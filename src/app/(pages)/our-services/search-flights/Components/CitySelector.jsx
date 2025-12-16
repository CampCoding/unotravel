import { useState } from "react";
import SelectCityMap from "./SelectCityMap";

export default function CitySelector() {
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [mode, setMode] = useState("from"); // from | to

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={() => setMode("from")}
          className={`px-3 py-1 rounded ${
            mode === "from" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Select From
        </button>
        <button
          onClick={() => setMode("to")}
          className={`px-3 py-1 rounded ${
            mode === "to" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Select To
        </button>
      </div>

      <SelectCityMap
        value={mode === "from" ? fromCity : toCity}
        onChange={(city) =>
          mode === "from" ? setFromCity(city) : setToCity(city)
        }
      />

      <div className="bg-slate-50 p-3 rounded text-sm">
        <div>
          <strong>From:</strong>{" "}
          {fromCity ? `${fromCity.city}, ${fromCity.country}` : "-"}
        </div>
        <div>
          <strong>To:</strong>{" "}
          {toCity ? `${toCity.city}, ${toCity.country}` : "-"}
        </div>
      </div>
    </div>
  );
}
