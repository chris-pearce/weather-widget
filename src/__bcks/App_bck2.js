import React, { Component, Fragment } from 'react';
import './App.css';

// https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words/25867068#25867068
// https://gist.github.com/basarat/4670200
const degToCardinal = num => {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  return arr[val % 16];
};

class App extends Component {
  state = {
    data: {},
    dataError: null,
    geoErrorCode: null,
    isDataLoading: false,
    isGeoSupported: false,
    hasUserSharedLocation: false,
    showWind: 'on',
    title: '',
    unit: 'metric',
  };

  componentDidMount() {
    document.title = 'Weather Widget&trade;';

    // Check that the Geolocation API is supported, if it's not then render the
    // relevant notification so the user is informed
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, {
        // Reduce the need to start geolocation hardware
        maximumAge: 10 * 60 * 1000,
        // Don't keep the user waiting…
        timeout: 10 * 1000,
      });
    } else {
      this.setState({ isGeoSupported: false });
    }
  }

  fetchData = async (coords, unit) => {
    this.setState({ isDataLoading: true });

    const API_KEY = 'b592bc303b8bbb8a36d05c0a04b7d7ab';
    const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    const coordsQuery = `lat=${coords.latitude}&lon=${coords.longitude}`;
    const unitQuery = `&units=${unit ? unit : 'metric'}`;

    try {
      const response = await fetch(
        `${API_BASE_URL}${coordsQuery}${unitQuery}&APPID=${API_KEY}`
      );

      if (!response.ok) {
        throw Error(response);
      }

      const data = await response.json();
      this.setState({ data, isDataLoading: false });
    } catch (error) {
      this.setState({ dataError: error, isDataLoading: false });
    }
  };

  geoSuccess = position => {
    const { latitude, longitude } = position.coords;

    this.setState({ hasUserSharedLocation: true });
    this.fetchData({ latitude, longitude });
  };

  geoError = error => this.setState({ geoErrorCode: error.code });

  handleSubmit = event => {
    event.preventDefault();
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  render() {
    const {
      data,
      error,
      title,
      unit,
      showWind,
      hasUserSharedLocation,
      isDataLoading,
    } = this.state;
    const { main, name, weather, wind } = data;
    const weatherItem = weather[0];

    if (error) {
      return (
        <mark>
          Sorry, something went wrong whilst trying to retrieve data from the
          Openweather API. Please try refreshing your browser. <br />
          <small>{error.message}</small>
        </mark>
      );
    }

    // if (hasUserSharedLocation) {
    //   return (
    //     <mark>
    //       Please allow Weather Widget&trade; to access your location 🙏🏻.
    //     </mark>
    //   );
    // }

    return (
      <main className="c-shell">
        <h1>Weather Widget&trade;</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="location">Location</label>
          <input autoFocus id="location" placeholder="Sydney" />
          <br />
          <button type="button">Use my location</button>
        </form>
        <div hidden>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              autoFocus
              id="title"
              onChange={this.handleInputChange}
              placeholder="Title of widget"
              name="title"
              type="text"
              value={title}
            />
            <fieldset disabled={isDataLoading}>
              <legend>Temperature</legend>
              <label htmlFor="metric">&deg;C</label>
              <input
                checked={unit === 'metric'}
                id="metric"
                name="unit"
                onChange={this.handleInputChange}
                type="radio"
                value="metric"
              />
              <label htmlFor="imperial">&deg;F</label>
              <input
                checked={unit === 'imperial'}
                id="imperial"
                name="unit"
                onChange={this.handleInputChange}
                type="radio"
                value="imperial"
              />
            </fieldset>
            <fieldset disabled={isDataLoading}>
              <legend>Wind</legend>
              <label htmlFor="on">On</label>
              <input
                checked={showWind === 'on'}
                id="on"
                name="showWind"
                onChange={this.handleInputChange}
                type="radio"
                value="on"
              />
              <label htmlFor="off">Off</label>
              <input
                checked={showWind === 'off'}
                id="off"
                name="showWind"
                onChange={this.handleInputChange}
                type="radio"
                value="off"
              />
            </fieldset>
          </form>
          <article>
            <h1>{title ? title : 'Title of Widget'}</h1>
            {isDataLoading ? (
              <mark>Fetching weather data…</mark>
            ) : (
              main &&
              name &&
              weather &&
              wind && (
                <Fragment>
                  <p>{name}</p>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      weatherItem.icon
                    }.png`}
                    alt={weatherItem.description}
                  />
                  <p>{Math.round(main.temp)}&deg;</p>
                  {showWind === 'on' && (
                    <p>
                      Wind {degToCardinal(wind.deg)}{' '}
                      {unit === 'metric' ? (
                        <Fragment>{Math.round(wind.speed * 3.6)} km/h</Fragment>
                      ) : (
                        <Fragment>
                          {Math.round(wind.speed * 2.237)} mph
                        </Fragment>
                      )}
                    </p>
                  )}
                </Fragment>
              )
            )}
          </article>
        </div>
      </main>
    );
  }
}

export default App;
