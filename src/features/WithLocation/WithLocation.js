import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function WithLocation(props) {
  const [isLoading, setLoading] = useState(true);
  const { coords, fallbackCoords } = props;

  useEffect(() => {
    fetchData();
  });

  async function fetchData(coords, unit) {
    const API_KEY = 'b592bc303b8bbb8a36d05c0a04b7d7ab';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    const coordsQuery = `lat=${coords.latitude}&lon=${coords.longitude}`;
    const unitQuery = `&units=${unit ? unit : 'metric'}`;

    try {
      const response = await fetch(
        `${BASE_URL}${coordsQuery}${unitQuery}&APPID=${API_KEY}`
      );

      if (!response.ok) {
        throw Error(response);
      }

      const data = await response.json();
      this.setState({ data, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }

  return <pre>{JSON.stringify(coords, null, 2)}</pre>;
}

WithLocation.propTypes = {
  coords: PropTypes.object,
  fallbackCoords: PropTypes.bool,
};

WithLocation.defaultProps = {
  fallbackCoords: false,
};
