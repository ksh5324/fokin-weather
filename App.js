import React, { Component } from "react";
import { Alert } from "react-native";
import Loading from "./Loding";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "0b35dee1b671caa359f32c7b4538d25a";

class App extends Component {
  state = {
    isLoding: true,
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoding: false,
      condition: weather[0].main,
      temp,
    });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      console.log(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoding, temp, condition } = this.state;
    return isLoding ? (
      <Loading></Loading>
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}

export default App;
