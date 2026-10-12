import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import postService from "./services/postService";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
  });

  // Phone Input Handler
  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");

    if (cleaned.length <= 11) {
      setPhone(cleaned);
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Name Validation
    if (name.trim() === "") {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name = "Only letters and spaces are allowed.";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    // Email Validation
    if (email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Phone Validation
    if (phone === "") {
      newErrors.phone = "Phone number is required.";
    } else if (!/^03\d{9}$/.test(phone)) {
      newErrors.phone = "Phone must be in format 03XXXXXXXXX.";
    }

    // Occupation Validation
    if (occupation.trim() === "") {
      newErrors.occupation = "Occupation is required.";
    } else if (!/^[A-Za-z ]+$/.test(occupation)) {
      newErrors.occupation = "Only letters and spaces are allowed.";
    }

    // Show all errors
    setErrors(newErrors);

    // Stop if any error exists
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Form Data
    const formData = {
      name,
      email,
      phone,
      occupation,
    };

    try {
      const response = await postService.createPost(formData);
      Alert.alert(
        "Success",
        "Form Submitted Successfully!\n\nPost ID: " + response.id,
      );
      console.log(response);
    } catch (error) {
      Alert.alert("Error", "Could not submit the form.");
      console.error(error);
    }

    // Clear inputs
    setName("");
    setEmail("");
    setPhone("");
    setOccupation("");

    // Clear errors
    setErrors({
      name: "",
      email: "",
      phone: "",
      occupation: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Information Form</Text>

      {/* Name */}
      <TextInput
        style={[styles.input, errors.name ? styles.errorInput : null]}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      {/* Email */}
      <TextInput
        style={[styles.input, errors.email ? styles.errorInput : null]}
        placeholder="Enter Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      {/* Phone */}
      <TextInput
        style={[styles.input, errors.phone ? styles.errorInput : null]}
        placeholder="03XXXXXXXXX"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={handlePhoneChange}
      />
      {errors.phone ? (
        <Text style={styles.errorText}>{errors.phone}</Text>
      ) : null}

      {/* Occupation */}
      <TextInput
        style={[styles.input, errors.occupation ? styles.errorInput : null]}
        placeholder="Enter Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      {errors.occupation ? (
        <Text style={styles.errorText}>{errors.occupation}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAFBFF",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    marginBottom: 5,
  },

  errorInput: {
    borderColor: "red",
    borderWidth: 2,
  },

  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 5,
  },

  button: {
    backgroundColor: "cyan",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
