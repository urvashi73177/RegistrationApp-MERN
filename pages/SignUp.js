import React, { useState } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";
import axios from "axios";
const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const name = formData.name;
  const email = formData.email;
  const password = formData.password;

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSignUp(prevData) {
    // console.log("PRESSED")
    // const resp = await axios.get('http://localhost:3000/');
    // console.log(resp.data);
    // prevData.preventDefault();
    try {
      const resp = await axios
        .post("http://localhost:3000/user-data", {
          email,
          password,
          name,
        })

        .then((res) => {
          if (res.data === "exist") {
            alert("user alreaady exists");
          } else if (res.data === "notexist") {
            console.log(resp);
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" }; //This object will store any validation error messages.

    //validate form
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return console.log(valid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          onChangeText={(text) =>
            setFormData((prevData) => ({ ...prevData, name: text }))
          }
          value={formData.name}
        />
        <Text style={styles.label}>Enter your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          onChangeText={(text) =>
            setFormData((prevData) => ({ ...prevData, email: text }))
          }
          value={formData.email}
        />
        <Text style={styles.label}>Enter your password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) =>
            setFormData((prevData) => ({ ...prevData, password: text }))
          }
          value={formData.password}
        />
        <View>
          <Button
            title="SignUp"
            onPress={()=>{
              if(validateForm()){
                handleSignUp()
              }
            }}
          />
          <Text style={styles.error}>{errors.name}</Text>
          <Text style={styles.error}>{errors.email}</Text>
          <Text style={styles.error}>{errors.password}</Text>
        </View>
      </View>
      <Button title="LogIn" onPress={() => navigation.navigate("LogIn")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    padding: 10,
    margin: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});

export default SignUp;
