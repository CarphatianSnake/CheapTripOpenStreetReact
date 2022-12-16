import AutoComplete from "./AutoComplete/AutoComplete";
import SearchButton from "./SearchButton/SearchButton";

import './SearchBox.css';

const SearchBox = ({
  options,
  setOptions,
  cityName,
  setCityName,
  setJson
}) => {

  const findCities = async (cityName) => {
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
        placeholder="Type city name"
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