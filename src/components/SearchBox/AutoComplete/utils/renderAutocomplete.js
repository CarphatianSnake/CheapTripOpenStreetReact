const renderAutocomplete = (setActive, active, setOptions, options, isShowOptions, setIsShowOptions, cityName, setCityName, findCities) => {

  const onClick = (e) => {
    const text = e.currentTarget.innerText;
    setActive(0);
    setOptions([]);
    setIsShowOptions(false);
    setCityName(text);
    findCities(text);
  };

  if (isShowOptions && cityName) {
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

export default renderAutocomplete;