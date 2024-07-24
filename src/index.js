import "./style.css";
import {format} from "date-fns";

const API_KEY = '3VB2AUGQ44EPHD46R5NLDL86J';

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

const nowDate = document.querySelector(".now-date");
const nowTemp = document.querySelector(".now-temp");
const nowFeel = document.querySelector(".now-feel");
const nowDesc = document.querySelector(".now-desc");

const loadScreen = document.querySelector(".load-screen");

async function getWeatherData() {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchBar.value}?unitGroup=metric&key=${API_KEY}&contentType=json`, {mode: "cors"});
    const data = await response.json();

    return data;
  } catch {
    console.log("whoops, something went wrong");
  }
};

async function updateWeather() {
  nowDate.innerHTML = '';
  nowTemp.innerHTML = '';
  nowFeel.innerHTML = '';
  nowDesc.innerHTML = '';
  loadScreen.classList.add('active');

  const weather = await getWeatherData();

  loadScreen.classList.remove('active');

  const date = new Date();
  const isPos = weather.currentConditions.temp > 0;

  nowDate.innerHTML = format(date, 'E, do MMMM, HH:mm');
  if (isPos) {
    nowTemp.innerHTML = `+${parseInt(weather.currentConditions.temp)}`;
    nowFeel.innerHTML = `Feels like +${parseInt(weather.currentConditions.feelslike)}`;
  } else {
    nowTemp.innerHTML = `-${parseInt(weather.currentConditions.temp)}`;
    nowFeel.innerHTML = `Feels like -${parseInt(weather.currentConditions.feelslike)}`;
  }
  nowDesc.innerHTML = weather.currentConditions.conditions;
};

searchBtn.onclick = updateWeather;

updateWeather();