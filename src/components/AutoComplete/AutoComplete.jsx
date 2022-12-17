import { useState } from "react";

import OptionsList from "./OptionsList/OptionsList";
import ResultsList from "./ResultsList/ResultsList";
import onChangeHandler from "./onChangeHandler";
import onKeyDownHandler from "./onKeyDownHandler";

import './AutoComplete.css';

const AutoComplete = ({setChoosenCity}) => {

  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(0);
  const [json, setJson] = useState(null);
  const [options, setOptions] = useState([]);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isShowResults, setIsShowResults] = useState(false);

  const findCities = async (cityName) => {
    setJson(null);
    const url = `https://nominatim.openstreetmap.org/search?city=${cityName}&format=geojson`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length === 1) {
          setChoosenCity(data.features[0]);
        } else {
          setJson(data.features);
          setIsShowResults(true);
          // console.log(data.features);
        }
      });
  };

  const onChange = (e) => onChangeHandler(e, setInputValue, setActive, setOptions, setIsShowOptions, setIsShowResults);
  const onKeyDown = (e) => onKeyDownHandler(e, setActive, active, setIsShowOptions, setOptions, options, setInputValue, findCities);

  return (
    <div className="autoComplete">
      <input
        className="input"
        type="text"
        onChange={onChange}
        onFocus={onChange}
        onKeyDown={onKeyDown}
        value={inputValue}
        placeholder="Type city name"
      />
      <OptionsList
        setActive={setActive}
        active={active}
        setOptions={setOptions}
        options={options}
        setIsShowOptions={setIsShowOptions}
        setInputValue={setInputValue}
        findCities={findCities}
        show={isShowOptions && inputValue}
      />
      <ResultsList
        json={json}
        setChoosenCity={setChoosenCity}
        setIsShowResults={setIsShowResults}
        show={json && isShowResults}
      />
    </div>
  );
}

export default AutoComplete;