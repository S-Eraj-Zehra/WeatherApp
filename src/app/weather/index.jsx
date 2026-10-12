import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Location from "expo-location";

import weatherservice from "../services/weatherservice";

export default function Weather() {
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location Permission Denied");
      setLoading(false);

      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    console.log(location);
    try {
      const data = await weatherservice.getWeather(
        location.coords.latitude,
        location.coords.longitude,
      );

      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />

        <Text>Loading Weather...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>

      <Image
        style={styles.icon}
        source={{
          uri: `https://play-lh.googleusercontent.com/ooGrukpBdHiCt231zCvHQ2uOtnKvhsGqxsz-qiYpY36uDP0ib2Y1EAzdRRYJoHkceBiWdx4PVIF0kJZ6SZaPMQ`,
        }}
      />

      <Text style={styles.temp}>{weather.main.temp} °C</Text>

      <Text style={styles.desc}>{weather.weather[0].description}</Text>

      <Text style={styles.info}>Feels Like : {weather.main.feels_like} °C</Text>

      <Text style={styles.info}>Humidity : {weather.main.humidity} %</Text>

      <Text style={styles.info}>Wind Speed : {weather.wind.speed} m/s</Text>

      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#87CEEB",
  },

  loader: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  city: {
    fontSize: 32,

    fontWeight: "bold",

    marginBottom: 10,
  },

  icon: {
    width: 120,

    height: 120,
  },

  temp: {
    fontSize: 45,

    fontWeight: "bold",
  },

  desc: {
    fontSize: 22,

    textTransform: "capitalize",

    marginBottom: 20,
  },

  info: {
    fontSize: 18,

    marginVertical: 4,
  },

  button: {
    marginTop: 25,

    backgroundColor: "#0099ff",

    padding: 12,

    borderRadius: 10,
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 18,
  },
});
