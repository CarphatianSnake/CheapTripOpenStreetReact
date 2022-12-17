import onClick from "./onClick";

import './OptionsList.css';

const OptionsList = ({
  setActive,
  active,
  setOptions,
  options,
  setIsShowOptions,
  show,
  setInputValue,
  findCities
}) => {
  if (show) {
    if (options.length) {
      return (
        <ul className="options-list">
          {options.map((option, index) => {
            const className = index === active ? "active" : "";
            return (
              <li
                className={`options-list-item ${className}`}
                key={option}
                onMouseEnter={() => setActive(index)}
                onClick={(e) => onClick(e, setActive, setOptions, setIsShowOptions, setInputValue, findCities)}>
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