# WeatherApp
An project simple created using **nodejs** and **react-native** to discover current weather of your city and save.
This project use Api Google Places Autocomplete(https://developers.google.com/places/web-service/autocomplete) and Api Open Weather Map(https://openweathermap.org/)

# Install and Run
  - install package in each folder:
  ```
  yarn/npm i
  cd ios && pod install
  ```
  - Run application on mobile:
  ```
  react-native run-ios/run-android
  ```
  - Run application on server:
  ```
  yarn dev
  ```
# Care

There are some variables that will be used by the application, create a file called .env and put some keys in it.

- SECRET_MAPS = Google Places Autocomplete
- URL = Server Backend
- SECRET_WEATHER = Api Open Weather Map

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
