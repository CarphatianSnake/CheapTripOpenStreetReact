import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMapEvent,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import data from "./data.json";
import airportsData from "./airports.json";
import * as Actions from "./redux/AppStateReducer/ActionCreators";
import airportIcon from "./assets/airport";
import L from "leaflet";
import SearchResult from "./components/SearchResult/SearchResult";
import AutoComplete from "./components/AutoComplete/AutoComplete";

function App({ loading, setLoading }) {
  const [map, setMap] = useState(null);
  const [citiesActive, setCitiesActive] = useState(false);
  const [airportsActive, setAirportsActive] = useState(false);
  const [searchMarker, setSearchMarker] = useState(null);
  const [myjson, setMyJson] = useState(null);
  const [choosenCity, setChoosenCity] = useState("");

  const airports = airportsData.filter((airport) => {
    if (data.cities.find((city) => airport.city === city.city)) {
      return true;
    } else {
      return false;
    }
  });

  const findMyCities = (city) => {
    let lat1 = city.geometry.coordinates[1];
    let lon1 = city.geometry.coordinates[0];
    let distance = 20000;
    let rescity = {};
    let lat2, lon2, a, d;
    let p = 0.017453292519943295;
    let c = Math.cos;
    data.cities.forEach(e => {
      lat2 = e.lat;
      lon2 = e.lon;   
      a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
      d = 12742 * Math.asin(Math.sqrt(a));
      if (d <= distance) {
        distance = d;
        rescity = {
          geometry: {coordinates: [lon2,lat2]},
          properties: {display_name: e.city}
        };
      }
    });
    let midata=[rescity];
    setMyJson(midata);
  };

  const resultClick = (city) => {
    //console.log("clockde");
    findMyCities(city);
    setSearchMarker({
      coordinates: {
        lat: city.geometry.coordinates[1],
        lng: city.geometry.coordinates[0],
      },
      name: city.properties.display_name,
    });
    if (map) {
      map.flyTo({
        lat: city.geometry.coordinates[1],
        lng: city.geometry.coordinates[0],
      });
    }
  };

  useEffect(() => {
    if (choosenCity) {
      resultClick(choosenCity);
    }
  }, [choosenCity])
  
  return (
    <div className="App">
      <div className="searchBox">
        <AutoComplete setChoosenCity={setChoosenCity} />
      </div>

      <div className="main">
        {/* <div className="results">
          {json &&
            json.map((city) => (
              <SearchResult
                key={city.properties.display_name}
                city={city}
                resultClick={resultClick}
              />
            ))}
        </div> */}
        <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={10}
          scrollWheelZoom={true}
          whenCreated={(map) => setMap(map)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {citiesActive &&
            data.cities.map((city) => (
              <Marker position={{ lat: city.lat, lng: city.lon }}>
                <Popup>{city.city}</Popup>
              </Marker>
            ))}
          {airportsActive &&
            airports.map((airport) => (
              <Marker
                icon={airportIcon}
                position={{
                  lat: airport._geoloc.lat,
                  lng: airport._geoloc.lng,
                }}
              ></Marker>
            ))}
          {searchMarker && (
            <Marker position={searchMarker.coordinates}>
              <Popup>{searchMarker.name}</Popup>
            </Marker>
          )}
        </MapContainer>
        <div className="temp">
          <div className="checkBoxes">
            show cities:
            <input
              type="checkbox"
              checked={citiesActive}
              onChange={() => setCitiesActive(!citiesActive)}
            />
            show airports:
            <input
              type="checkbox"
              checked={airportsActive}
              onChange={() => setAirportsActive(!airportsActive)}
            />
          </div>
          <div className="myresults">
              {myjson &&
            myjson.map((city) => (
              <SearchResult
                key={city.properties.display_name}
                city={city}
                resultClick={resultClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.appState.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (state) => dispatch(Actions.setLoading(state)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
