
import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const handleLogIn=async ()=>{
      try{
        await axios.post("http://localhost:3000/",{
          email,password
        })
        .then(res=>{
          if(res.data==="exist"){
            navigation.navigate('Home')
          }else if(res.data==="notexist"){
           alert('user does not exits')
          }
        }).catch(e=>{
          alert("wrong details")
          console.log(e)
        })
      }
      catch(e){
        console.log(e)
      }
    }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter your Email</Text>
        <TextInput style={styles.input} placeholder="Enter your Email" onChangeText={setEmail} value={email} />
        <Text style={styles.label}>Enter your password</Text>
        <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} onChangeText={setPassword} value={password}/>
        <View>
            <Button title='LogIn' onPress={handleLogIn}/>
        </View>
      </View>
      <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Login;