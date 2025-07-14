import React, { useEffect, useState } from "react";
import DownArrow from "@/icons/DownArrow";
import LocationIcon from "@/icons/LocationIcon";

interface CitySelectProps {
  city: string;
  setCity: (value: string) => void;
  detectLocation: () => void;
  ukCities: string[];
}

const CitySelect: React.FC<CitySelectProps> = ({
  city,
  setCity,
  detectLocation,
  ukCities,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCities = ukCities.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const handleSelectCity = (name: string) => {
    setCity(name);
    setShowDropdown(false);
  };

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".city-select-wrapper")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="relative mb-4 flex gap-2 items-start city-select-wrapper w-full font-karla">
      <div className="relative flex-1 text-gray-500 font-semibold">
        <input
          type="text"
          placeholder="Location"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setShowDropdown(true);
          }}
          onClick={() => setShowDropdown(true)}
          className="w-full rounded-md border bg-white border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <DownArrow />
        </div>
        {showDropdown && filteredCities.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg max-h-40 overflow-auto">
            {filteredCities.map((c) => (
              <li
                key={c}
                onClick={() => handleSelectCity(c)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="button"
        onClick={detectLocation}
        className="mt-[2px] px-2 py-2 rounded hover:bg-gray-100 transition"
      >
        <LocationIcon />
      </button>
    </div>
  );
};

export default CitySelect;
