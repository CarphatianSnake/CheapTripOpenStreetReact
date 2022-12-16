const onClick = (e, setActive, setOptions, setIsShowOptions, setCityName, findCities) => {
  const text = e.currentTarget.innerText;
  setActive(0);
  setOptions([]);
  setIsShowOptions(false);
  setCityName(text);
  findCities(text);
};

export default onClick;