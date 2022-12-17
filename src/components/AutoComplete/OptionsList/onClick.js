const onClick = (e, setActive, setOptions, setIsShowOptions, setInputValue, findCities) => {
  const text = e.currentTarget.innerText;
  setActive(0);
  setOptions([]);
  setIsShowOptions(false);
  setInputValue(text);
  findCities(text);
};

export default onClick;