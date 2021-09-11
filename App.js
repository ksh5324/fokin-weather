import React, { Component } from "react";
import { Alert } from "react-native";
import Loading from "./Loding";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "0b35dee1b671caa359f32c7b4538d25a";

class App extends Component {
  state = {
    isLoding: true,
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    console.log(data);
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({ isLoding: false });
      console.log(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoding } = this.state;
    return isLoding ? <Loading></Loading> : null;
  }
}

export default App;
