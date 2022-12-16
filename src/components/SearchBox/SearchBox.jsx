import { useState } from "react";

import AutoComplete from "./AutoComplete/AutoComplete";
import SearchButton from "./SearchButton/SearchButton";

import './SearchBox.css';

const SearchBox = ({setJson}) => {

  const [options, setOptions] = useState([]);
  const [cityName, setCityName] = useState('');

  const findCities = async (cityName) => {
    setJson(null);
    const url = `https://nominatim.openstreetmap.org/search?city=${cityName}&format=geojson`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setJson(data.features);
        // console.log(data.features[0].properties);
      });
  };

  return (
    <div className="searchBox">
      <AutoComplete
        value={cityName}
        setValue={setCityName}
        options={options}
        setOptions={setOptions}
        findCities={findCities}
      />
      <SearchButton
        findCities={findCities}
        cityName={cityName}
      />
    </div>
  );
}

export default SearchBox;