const onKeyDownHandler = (e, setActive, active, setIsShowOptions, setOptions, options, setInputValue, findCities) => {
  if (e.keyCode === 13) { // enter key
    if (options.length > 0) {
      setActive(0);
      setIsShowOptions(false);
      setInputValue(options[active]);
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

export default onKeyDownHandler;