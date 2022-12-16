import onClick from "./onClick";

import './OptionsList.css';

const OptionsList = ({
  setActive,
  active,
  setOptions,
  options,
  isShowOptions,
  setIsShowOptions,
  cityName,
  setCityName,
  findCities
}) => {
  if (isShowOptions && cityName) {
    if (options.length) {
      return (
        <ul className="options-list">
          {options.map((option, index) => {
            const className = index === active ? "active" : "";
            return (
              <li
                className={`options-list-item ${className}`}
                key={option}
                onClick={(e) => onClick(e, setActive, setOptions, setIsShowOptions, setCityName, findCities)}>
                  {option}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <div className="no-options">
          <em>City not found</em>
        </div>
      );
    }
  }
  return <></>;
};

export default OptionsList;