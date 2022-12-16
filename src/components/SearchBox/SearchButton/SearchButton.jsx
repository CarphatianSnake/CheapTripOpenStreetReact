import './SearchButton.css';

const SearchButton = ({
  findCities,
  cityName
}) => {
  return (
    <button
      className="searchBtn"
      onClick={() => {
        findCities(cityName);
      }}
    >
      search
    </button>
  );
}

export default SearchButton;