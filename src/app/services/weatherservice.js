const API_KEY = "39d030e56f45d58cda3a44350ff13e66";

const getWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
};

export default { getWeather };
