function upDateTime() {
  let date = document.querySelector(".date");
  let day = document.querySelector(".day");
  let time = document.querySelector(".current-time");
  const stringDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  date.innerHTML = new Date().toLocaleDateString();
  let dayToConvert = new Date();
  day.innerHTML = stringDays[dayToConvert.getDay()];
}

let search = document.querySelector(".submit-btn");
let windSpeed = document.querySelector(".windSpeed-box");
let cityName = document.getElementsByTagName("h3")[0];
let countryName = document.getElementsByTagName("h4")[0];

search.addEventListener("click", validate);

document.addEventListener("DOMContentLoaded", inintialState);
document.addEventListener("DOMContentLoaded", upDateTime);

function inintialState() {
  if (localStorage.getItem("data") === null) {
    getCityData("london");
  } else {
    let {
      location: { name },
    } = JSON.parse(localStorage.getItem("data"));
    getCityData(name);
  }
}

function getCityData(city) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c291ca0907msh77baabc0e0ada84p1dab8cjsn737e4d0caadd",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      localStorage.clear();
      localStorage.setItem("data", JSON.stringify(response));
      updateUi();
    })
    .catch((err) => console.error(err));
}

function updateUi() {
  document.querySelector(".search-input").value = "";
  let {
    current: {
      temp_c,
      condition: { text, icon },
      wind_kph,
      humidity,
      pressure_mb,
    },
    location: { name, country, localtime },
  } = JSON.parse(localStorage.getItem("data"));
  let data = JSON.parse(localStorage.getItem("data"));
  let localTime = localtime.substr(11, 5);
  document.querySelector(".current-time").innerHTML = localTime;
  let sunSetValue = data.forecast.forecastday[0].astro.sunset;
  document.querySelector(".sunSet-box").innerHTML = sunSetValue;
  cityName.innerHTML = name;
  countryName.innerHTML = country;
  windSpeed.innerHTML = `${wind_kph} kph`;
  document.querySelector(".pressure-box").innerHTML = `${pressure_mb} mb`;
  document.querySelector(".temperature").innerHTML = `${temp_c}°C`;
  document.querySelector(".condition").innerHTML = text;
  document.querySelector(
    ".icon"
  ).innerHTML = `<img src="${icon}" class="weather-icon" alt="weather-icon">`;
  document.querySelector(
    ".rainProbability-box"
  ).innerHTML = `${humidity} g.m-3`;
  let lightRain = [
    "Patchy freezing drizzle possible",
    "Light rain shower",
    "Patchy light drizzle",
    "Light drizzle",
    "Freezing drizzle",
    "Heavy freezing drizzle",
    "Patchy light rain",
    "Light rain",
    "Moderate rain at times",
    "Moderate rain",
    "Patchy light rain with thunder",
  ];
  let snow = [
    "Patchy snow possible",
    "Patchy sleet possible",
    "Light sleet",
    "Moderate or heavy sleet",
    "Patchy light snow",
    "Light snow",
    "Patchy moderate snow",
    "Moderate snow",
    "Patchy heavy snow",
    "Heavy snow",
    "Ice pellets",
    "Light sleet showers",
    "Moderate or heavy sleet showers",
    "Light snow showers",
    "Moderate or heavy snow showers",
    "Light showers of ice pellets",
    "Moderate or heavy showers of ice pellets",
    "Patchy light snow with thunder",
    "Moderate or heavy snow with thunder",
  ];
  let heavyRain = [
    "Moderate or heavy rain with thunder",
    "Torrential rain shower",
    "Moderate or heavy rain shower",
    "Heavy rain",
    "Heavy rain at times",
  ];
  let fog = ["Mist", "Fog", "Freezing fog"];
  let cloudy = ["Cloudy", "Partly cloudy"];
  let overcast = ["Overcast", "Clear"];
  if (cloudy.includes(text)) {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./partly cloudy.jpg')";
    document.querySelector("#cover-photo").style.color = "black";
  } else if (text === "Sunny") {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./sunny.jpg')";
    document.querySelector("#cover-photo").style.color = "#44217D";
  } else if (fog.includes(text)) {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./foggy.jpg')";
    document.querySelector("#cover-photo").style.color = "#333333";
  } else if (lightRain.includes(text)) {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./light rain.jpg')";
    document.querySelector("#cover-photo").style.color = "#9158EF";
  } else if (overcast.includes(text)) {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./overcast.jpg')";
    document.querySelector("#cover-photo").style.color = "#B895F2";
  } else if (heavyRain.includes(text)) {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./heavy rain.jpg')";
    document.querySelector("#cover-photo").style.color = "white";
  } else if (snow.includes(text)) {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./snow.jpg')";
    document.querySelector("#cover-photo").style.color = "#B895F2";
  } else {
    document.querySelector("#cover-photo").style.backgroundImage =
      "url('./overcast.jpg')";
    document.querySelector("#cover-photo").style.color = "#B895F2";
  }
  forecast();
}

function validate() {
  let city = document.querySelector(".search-input").value;
  let cityRegex = /^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
  var cityResult = cityRegex.test(city);
  if (cityResult == false) {
    alert("Please enter a valid city name");
    document.querySelector(".search-input").value = "";
    return false;
  }
  getCityData(city.toLowerCase());
}

function forecast() {
  (function displayMorning() {
    let data = JSON.parse(localStorage.getItem("data"));
    let forecast = data.forecast.forecastday[0].hour;
    let six = forecast[6];
    let ten = forecast[10];

    let {
      temp_c,
      condition: { icon },
    } = six;
    let toTemp = ten.temp_c;
    document.querySelector(".morning").innerHTML = `
		<h6>morning</h6>
		<img src="${icon}" class="weather-icon" alt="weather-icon">
		<div class="morning-temperature">${temp_c}°C</div>
		<div class="morning-description"></div>
		`;
    if (temp_c < toTemp) {
      document.querySelector(
        ".morning-description"
      ).innerHTML = `Expected to raise to ${toTemp}°C in the midmorning `;
    } else if (temp_c > toTemp) {
      document.querySelector(
        ".morning-description"
      ).innerHTML = `Expected to lower to ${toTemp}°C in the midmorning `;
    }
  })();
  (function displayAfternoon() {
    let data = JSON.parse(localStorage.getItem("data"));
    let forecast = data.forecast.forecastday[0].hour;
    let eleven = forecast[11];
    let fifteen = forecast[15];

    let {
      temp_c,
      condition: { icon },
    } = eleven;
    let toTemp = fifteen.temp_c;
    document.querySelector(".afterNoon").innerHTML = `
		<h6>afternoon</h6>
		<img src="${icon}" class="weather-icon" alt="weather-icon">
		<div class="morning-temperature">${temp_c}°C</div>
		<div class="afternoon-description"></div>
		`;
    if (temp_c < toTemp) {
      document.querySelector(
        ".afternoon-description"
      ).innerHTML = `Expected to raise to ${toTemp}°C in the late-afternoon`;
    } else if (temp_c > toTemp) {
      document.querySelector(
        ".afternoon-description"
      ).innerHTML = `Expected to lower to ${toTemp}°C in the late-afternoon`;
    }
  })();
  (function displayEvening() {
    let data = JSON.parse(localStorage.getItem("data"));
    let forecast = data.forecast.forecastday[0].hour;
    let sixteen = forecast[16];
    let eighteen = forecast[18];
    let {
      temp_c,
      condition: { icon },
    } = sixteen;
    let toTemp = eighteen.temp_c;
    document.querySelector(".evening").innerHTML = `
		<h6>evening</h6>
		<img src="${icon}" class="weather-icon" alt="weather-icon">
		<div class="morning-temperature">${temp_c}°C</div>
		<div class="evening-description"></div>
		`;
    if (temp_c < toTemp) {
      document.querySelector(
        ".evening-description"
      ).innerHTML = `Expected to raise to ${toTemp}°C late in the evening`;
    } else if (temp_c > toTemp) {
      document.querySelector(
        ".evening-description"
      ).innerHTML = `Expected to lower to ${toTemp}°C late in the evening`;
    }
  })();
  (function displayNight() {
    let data = JSON.parse(localStorage.getItem("data"));
    let forecast = data.forecast.forecastday[0].hour;
    let twenty = forecast[21];
    let {
      temp_c,
      condition: { icon },
    } = twenty;
    document.querySelector(".night").innerHTML = `
		<h6>Night</h6>
		<img src="${icon}" class="weather-icon" alt="weather-icon">
		<div class="morning-temperature">${temp_c}°C</div>
		<div class="night-description"></div>
		`;
    if (temp_c < 20) {
      document.querySelector(
        ".night-description"
      ).innerHTML = `Cool night expected`;
    } else if (temp_c > 20) {
      document.querySelector(
        ".night-description"
      ).innerHTML = `warm night expected`;
    }
  })();
}
