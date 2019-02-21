export default async function fetchData(coords, unit) {
  //this.setState({ isLoading: true });

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
    console.log(data);
    //this.setState({ data, isLoading: false });
  } catch (error) {
    console.log(error);
    //this.setState({ error, isLoading: false });
  }
}
