import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤 Weather App</Text>
      <Text style={styles.title2}>By OpenWeather API</Text>

      <Link href="/weather" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Show Current Weather</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/form" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Open Form</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAFBFF",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 5,
  },

  title2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },

  button: {
    backgroundColor: "cyan",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
