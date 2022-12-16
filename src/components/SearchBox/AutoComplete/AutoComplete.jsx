import { useState } from "react";

import onChangeHandler from "./utils/onChangeHandler";
import onKeyDown from "./utils/onKeyDown";
import renderAutocomplete from "./utils/renderAutocomplete";

import './AutoComplete.css';

const AutoComplete = ({
  cityName,
  setCityName,
  options,
  setOptions,
  findCities
}) => {

  const [active, setActive] = useState(0);
  const [isShowOptions, setIsShowOptions] = useState(false);

  return (
    <div className="autoComplete">
      <input
        className="input"
        type="text"
        onChange={(e) => onChangeHandler(e, setCityName, setActive, setOptions, setIsShowOptions)}
        onKeyDown={(e) => onKeyDown(e, setActive, active, setIsShowOptions, setCityName, findCities, setOptions, options)}
        value={cityName}
        placeholder="Type city name"
      />
      {renderAutocomplete(setActive, active, setOptions, options, isShowOptions, setIsShowOptions, cityName, setCityName, findCities)}
    </div>
  );
}

export default AutoComplete;