import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
// import {Formik} from 'formik';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
var myBoolean = false;

const Register = props => {
  const [email, setEmail] = useState ('');
  const [name, setName] = useState ('');
  const [phone, setPhone] = useState ('');
  const [password, setPassword] = useState ('');
  const [error, setError] = useState ('');

  const register = () => {
    if (email === '' || name === '' || phone === '' || password === '') {
      setError ('Please fill all the fields');
    }
    if (password.length < 8) {
      setError ('password should be 8 characters long');
    }
    if (phone.length < 10) {
      setError ('enter a valid phone number');
    }
    if (name.length < 3) {
      setError ('name must be greater than length 2');
    }
    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    axios
      .post (`${baseURL}users/register`, user)
      .then (res => {
        if (res.status == 200) {
          Toast.show ({
            topOffset: 60,
            type: 'success',
            text1: 'Registration Succeeded',
            text2: 'Please Login into your account',
          });
          setTimeout (() => {
            props.navigation.navigate ('Login');
          }, 500);
        }
      })
      .catch (error => {
        Toast.show ({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <View style={styles.size}>
        <Image source={require ('../../assets/man.png')} />

      </View>
      <FormContainer>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 30,
            marginRight: 30,
            paddingRight: 169,
            paddingBottom: 20,
          }}
        >
          Register
        </Text>
        <Input
          borderBottomColor="blue"
          placeholder={'Email'}
          name={'email'}
          id={'email'}
          onChangeText={text => setEmail (text.toLowerCase ())}
        />
        <Input
          placeholder={'Name'}
          name={'name'}
          id={'name'}
          onChangeText={text => setName (text)}
        />
        <Input
          placeholder={'Phone Number'}
          name={'phone'}
          id={'phone'}
          type={'number'}
          keyboardType={'numeric'}
          onChangeText={text => setPhone (text)}
        />
        <Input
          placeholder={'Password'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          onChangeText={text => setPassword (text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary rounded onPress={() => register ()}>
            <Text
              style={{
                color: 'white',
                marginRight: 10,
                borderRadius: 22,
                fontSize: 17,
              }}
            >
              Register
            </Text>
          </EasyButton>
        </View>
        <View>

          <EasyButton
            large
            secondary
            rounded
            onPress={() => props.navigation.navigate ('Login')}
          >
            <Text style={{color: 'white', fontSize: 17}}>Back to Login</Text>
          </EasyButton>
        </View>
        <View style={styles.size1}>
          <Image source={require ('../../assets/direction.png')} />

        </View>

      </FormContainer>

    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create ({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
    color: 'white',
  },
  size: {
    width: 500,
    height: 550,
    alignItems: 'center',
    justifyContent: 'center',
  },
  size1: {
    width: 700,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
