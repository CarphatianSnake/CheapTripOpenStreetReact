import { useState } from "react";

import OptionsList from "./OptionsList/OptionsList";
import onChangeHandler from "./onChangeHandler";
import onKeyDown from "./onKeyDown";

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
  const [isShowResults, setIsShowResults] = useState(false);

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
      <OptionsList
        setActive={setActive}
        active={active}
        setOptions={setOptions}
        options={options}
        isShowOptions={isShowOptions}
        setIsShowOptions={setIsShowOptions}
        cityName={cityName}
        setCityName={setCityName}
        findCities={findCities}
      />
    </div>
  );
}

export default AutoComplete;