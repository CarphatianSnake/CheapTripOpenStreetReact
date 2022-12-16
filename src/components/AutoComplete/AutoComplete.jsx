import { useState } from "react";
import './AutoComplete.css';

const AutoComplete = ({
  value,
  setValue,
  placeholder,
  options,
  setOptions,
  findCities
}) => {

  const [active, setActive] = useState(0);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const findAutocomplete = async (cityName) => {
    const url = `https://photon.komoot.io/api/?q=${cityName}&osm_tag=place:city`;
    const response = await fetch(url);
    let data = (await response.json()).features;
    return data;
  };

  const onChangeHandler = async (e) => {
    const text = e.target.value;
    setValue(text);
    let matches = [];
    if (text.length > 0) {
      const data = await findAutocomplete(text);
      matches = data.map((feature) => feature.properties.name);
      matches = matches.filter((a, b) => matches.indexOf(a) === b);
    }
    setActive(0);
    setOptions(matches);
    setIsShowOptions(true);
  };

  const onClick = (e) => {
    const text = e.currentTarget.innerText;
    setActive(0);
    setOptions([]);
    setIsShowOptions(false);
    setValue(text);
    findCities(text);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) { // enter key
      if (options.length > 0) {
        setActive(0);
        setIsShowOptions(false);
        setValue(options[active]);
        findCities(options[active]);
        setOptions([]);
      }
    }
    else if (e.keyCode === 38) { // up arrow
      return (active === 0) ? setActive(options.length - 1) : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      return (active === options.length - 1) ? setActive(0) : setActive(active + 1);
    }
  };

  const renderAutocomplete = () => {
    if (isShowOptions && value) {
      if (options.length) {
        return (
          <ul className="autocomplete">
            {options.map((option, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={option} onClick={onClick}>
                  {option}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>City not found</em>
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <div className="autoComplete">
      <input
        className="input"
        type="text"
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        value={value}
        placeholder={placeholder}
      />
      {renderAutocomplete()}
    </div>
  );
}

export default AutoComplete;