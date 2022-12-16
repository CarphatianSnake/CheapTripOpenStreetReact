const findAutocomplete = async (cityName) => {
  const url = `https://photon.komoot.io/api/?q=${cityName}&osm_tag=place:city`;
  const response = await fetch(url);
  let data = (await response.json()).features;
  return data;
};

const onChangeHandler = async (e, setValue, setActive, setOptions, setIsShowOptions) => {
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

export default onChangeHandler;