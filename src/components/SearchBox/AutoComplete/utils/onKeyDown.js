const onKeyDown = (e, setActive, active, setIsShowOptions, setValue, findCities, setOptions, options) => {
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

export default onKeyDown;