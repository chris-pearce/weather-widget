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
    error: null,
    inputTitle: '',
    inputUnit: 'metric',
    inputWind: 'on',
    isLoading: false,
    isUserLocationAvailable: false,
  };

  componentDidMount() {
    // Set the document's `<title>` element
    document.title = 'Weather Widget';

    // Let's show a default location (Sydney, AU) in the widget whilst waiting
    // for the user to provide their consent to share their location via the
    // Geolocation API (see next block)
    this.fetchData();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.geolocationSuccess
        //this.geolocationError
      );
    }
  }

  fetchData = async query => {
    this.setState({ isLoading: true });

    const API_KEY = 'b592bc303b8bbb8a36d05c0a04b7d7ab';
    const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

    try {
      const response = await fetch(
        `${API_BASE_URL}${
          query ? query : 'id=2147714'
        }&units=metric&APPID=${API_KEY}`
      );

      if (!response.ok) {
        throw Error(`${response.status} / ${response.statusText}`);
      }

      const data = await response.json();
      this.setState({ data, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  geolocationSuccess = position => {
    const { latitude, longitude } = position.coords;

    this.setState({ isUserLocationAvailable: true });
    this.fetchData(`lat=${latitude}&lon=${longitude}`);
  };

  //geolocationError = error => this.setState({ isUserLocationAvailable: false });

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
      inputTitle,
      inputUnit,
      inputWind,
      isUserLocationAvailable,
      isLoading,
    } = this.state;
    const { main, name, weather, wind } = data;

    if (error) {
      return (
        <mark>
          Sorry, something went wrong whilst trying to retrieve data from the
          Openweather API. Please try refreshing your browser. <br />
          <small>{error.message}</small>
        </mark>
      );
    }

    // if (isLoading) {
    //   return (
    //     <mark aria-live="polite" role="status">
    //       Loading…
    //     </mark>
    //   );
    // }

    return (
      <main className="c-shell">
        <h1>Weather Widget&trade;</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            autoFocus
            id="title"
            onChange={this.handleInputChange}
            placeholder="Title of widget"
            name="inputTitle"
            type="text"
            value={inputTitle}
          />
          <fieldset disabled={isLoading}>
            <legend>Temperature</legend>
            <label htmlFor="metric">&deg;C</label>
            <input
              checked={inputUnit === 'metric'}
              id="metric"
              name="inputUnit"
              onChange={this.handleInputChange}
              type="radio"
              value="metric"
            />
            <label htmlFor="imperial">&deg;F</label>
            <input
              checked={inputUnit === 'imperial'}
              id="imperial"
              name="inputUnit"
              onChange={this.handleInputChange}
              type="radio"
              value="imperial"
            />
          </fieldset>
          <fieldset disabled={isLoading}>
            <legend>Wind</legend>
            <label htmlFor="on">On</label>
            <input
              checked={inputWind === 'on'}
              id="on"
              name="inputWind"
              onChange={this.handleInputChange}
              type="radio"
              value="on"
            />
            <label htmlFor="off">Off</label>
            <input
              checked={inputWind === 'off'}
              id="off"
              name="inputWind"
              onChange={this.handleInputChange}
              type="radio"
              value="off"
            />
          </fieldset>
        </form>
        <article>
          <h1>{inputTitle ? inputTitle : 'Title of Widget'}</h1>
          {isLoading ? (
            <mark>Fetching weather data…</mark>
          ) : (
            main &&
            name &&
            weather &&
            wind && (
              <Fragment>
                <p>{name}</p>
                <img
                  src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
                  alt={weather[0].description}
                />
                <p>{Math.round(main.temp)}&deg;</p>
                {inputWind === 'on' && (
                  <p>
                    Wind {degToCardinal(wind.deg)}{' '}
                    {inputUnit === 'metric' ? (
                      <Fragment>{Math.round(wind.speed * 3.6)} km/h</Fragment>
                    ) : (
                      <Fragment>{Math.round(wind.speed * 2.237)} mph</Fragment>
                    )}
                  </p>
                )}
              </Fragment>
            )
          )}
        </article>
      </main>
    );
  }
}

export default App;
