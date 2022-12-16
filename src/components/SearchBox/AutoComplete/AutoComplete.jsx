import { useState } from "react";

import onChangeHandler from "./utils/onChangeHandler";
import onKeyDown from "./utils/onKeyDown";
import renderAutocomplete from "./utils/renderAutocomplete";

import './AutoComplete.css';

const AutoComplete = ({
  value,
  setValue,
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
        onChange={(e) => onChangeHandler(e, setValue, setActive, setOptions, setIsShowOptions)}
        onKeyDown={(e) => onKeyDown(e, setActive, active, setIsShowOptions, setValue, findCities, setOptions, options)}
        value={value}
        placeholder="Type city name"
      />
      {renderAutocomplete(setActive, active, setOptions, options, isShowOptions, setIsShowOptions, value, setValue, findCities)}
    </div>
  );
}

export default AutoComplete;