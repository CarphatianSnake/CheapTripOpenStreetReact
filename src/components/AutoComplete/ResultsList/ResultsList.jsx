import './ResultsList.css';

const ResultsList = ({json, show, setIsShowResults, setChoosenCity}) => {

  if (show) {
    return (
      <ul className="results-list">
        {json.map((city, index) => {
          return (
            <li
              className="results-list-item"
              key={city.properties.display_name}
              onClick={() => {
                setChoosenCity(city);
                setIsShowResults(false);
              }}>
                {city.properties.display_name}
            </li>
          )
        })}
      </ul>
    );
  }
  return <></>;
}

export default ResultsList;