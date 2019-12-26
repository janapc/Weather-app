import axios from 'axios';
import { NativeModules, Platform } from 'react-native';
import { SECRET_WEATHER } from 'react-native-dotenv';

import background from './background';

const key = SECRET_WEATHER;

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const info = {
  lang: deviceLanguage.startsWith('pt') ? 'pt' : 'en',
  units: deviceLanguage.startsWith('pt') ? 'metric' : 'imperial',
  format: deviceLanguage.startsWith('pt') ? 'C' : 'F',
};

async function currentWeather(latitude, longitude) {
  const uri = `https://api.openweathermap.org/data/2.5/weather`;

  const { data } = await axios
    .get(uri, {
      params: {
        lat: latitude,
        lon: longitude,
        units: info.units,
        appid: key,
        lang: info.lang,
      },
    })
    .catch(error => console.error('Current:', error));

  const current =
    info.lang === 'pt'
      ? {
          Temperatura: `${parseInt(data.main.temp)}°${info.format}`,
          Pressão: `${data.main.pressure} hPa`,
          Humidade: `${data.main.humidity}%`,
          Max: `${parseInt(data.main.temp_max)}°${info.format}`,
          Min: `${parseInt(data.main.temp_min)}°${info.format}`,
        }
      : {
          Temp: `${parseInt(data.main.temp)}°${info.format}`,
          Pressure: `${data.main.pressure} hPa`,
          Humidity: `${data.main.humidity}%`,
          Max: `${parseInt(data.main.temp_max)}°${info.format}`,
          Min: `${parseInt(data.main.temp_min)}°${info.format}`,
        };

  return {
    icon: `${data.weather[0].icon}`,
    current,
    id: parseInt(data.id),
    temp: `${parseInt(data.main.temp)}°${info.format}`,
    description: data.weather[0].description,
  };
}

async function hours(id) {
  const newData = [];
  const uri = `https://api.openweathermap.org/data/2.5/forecast`;

  const response = await axios
    .get(uri, {
      params: {
        id,
        units: info.units,
        appid: key,
        lang: info.lang,
      },
    })
    .catch(error => console.error('HORAS::', error));

  for (let item = 0; item < 12; item++) {
    const time = response.data.list[item].dt_txt.split(' ')[1].split(':')[0];
    const temp = `${parseInt(response.data.list[item].main.temp)}°${
      info.format
    }`;
    const { i, colorIcon } = background.find(back => back.name === response.data.list[item].weather[0].icon);
    newData.push({ time, temp, icon: i, colorIcon });
  }

  return newData;
}

async function days(id) {
  const newData = [];
  const uri = `https://api.openweathermap.org/data/2.5/forecast/daily`;

  const { data } = await axios
    .get(uri, {
      params: {
        id,
        units: info.units,
        appid: key,
        lang: info.lang,
      },
    })
    .catch(error => console.error('Days:', error));

  for (let item = 0; item < 5; item++) {
    const date = new Date(parseInt(data.list[item].dt) * 1000).getDate();
    const temp = `${parseInt(data.list[item].temp.day)}°${info.format}`;
    const { i, colorIcon } = background.find(back => back.name === data.list[item].weather[0].icon);
    newData.push({ date, temp, icon: i, colorIcon });
  }

  return newData;
}

exports.handle = async (latitude, longitude) => {
  const location = await currentWeather(latitude, longitude);
  const hr = await hours(location.id);
  const day = await days(location.id);
  return { location, hr, day, present: location.temp };
};
