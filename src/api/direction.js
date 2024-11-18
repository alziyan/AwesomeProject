const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';
const accessToken =
  'pk.eyJ1IjoiYWx6aXlhbiIsImEiOiJjbTNoY3A2ZWYwYnluMnhzNnJsNHNtdWI3In0.Y1ol483-L7hCFVfxBlJ56A';

const getDirection = async (from, to) => {
  //   console.log(
  //     'very long url',
  //     `${BASE_URL}/driving-traffic/${from[0]}%2C${from[1]}%3B${to[0]}%2C${to[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`,
  //   );
  const response = await fetch(
    `${BASE_URL}/driving-traffic/${from[0]}%2C${from[1]}%3B${to[0]}%2C${to[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`,
  );
  const data = await response.json();
  //   console.log(data);
  return data;
};

export default getDirection;
