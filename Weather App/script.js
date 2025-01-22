API_KEY = "84fa8b5ea7ea48cc854133733251601";
BASE_URL = "http://api.weatherapi.com/v1";

let city = "Jakarta";

const getApi = async () => {
  const API_URL = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // handling jika data tidak ada di API_KEY
  if (data.error) {
    alert("Data tidak ada");
    searchInput.value = "";
    return;
  }

  return data;
};

const getData = async () => {
  const data = await getApi();

  const cityName = data.location.name;
  const country = data.location.country;
  const temp = data.current.temp_c;
  const condition = data.current.condition.text;
  const wind = data.current.wind_kph;

  return { cityName, country, temp, condition, wind };
};

const onSearch = () => {
  const searchValue = searchInput.value;

  if (searchValue) {
    city = searchValue;
    displayWeather();
  }
};

const displayWeather = async () => {
  const data = await getData();

  searchInput.value = "";
  cityNameElement.textContent = data.cityName;
  countryElement.textContent = data.country;
  tempElement.textContent = data.temp + "°C";
  conditionElement.textContent = data.condition;
  windElement.textContent = data.wind;
};

buttonSearch.addEventListener("click", onSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    onSearch();
  }
});

displayWeather();
