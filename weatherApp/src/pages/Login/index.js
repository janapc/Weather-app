import React, { useState, useEffect } from 'react';
import { Image, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import {
  Container,
  Input,
  Error,
  Title,
  Button,
  Form,
  TitleButton,
} from './styles';

import Loading from '../../components/Loading';
import api from '../../services/api';
import Cloud from '../../images/cloudlogin.png';
import CloudError from '../../images/clouderror.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function session() {
      const token = await AsyncStorage.getItem('@token');
      if (token) navigation.navigate('Drawer', { token });
      setLoading(false);
    }
    session();
  }, []);

  async function handleSignup() {
    setErr();
    try {
      const response = await api.post('/user', { email, password });
      const result = await api('/session', {
        method: 'post',
        headers: { userid: response.data.id },
      });
      const { token } = result.data;
      await AsyncStorage.setItem('@token', token);
      navigation.navigate('Home', { token });
    } catch (error) {
      setErr(error.response.data);
    }
  }

  async function handleSignin() {
    setErr();
    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      await AsyncStorage.setItem('@token', token);
      navigation.navigate('Home', { token });
    } catch (error) {
      setErr(error.response.data);
    }
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      {loading ? (
        <Loading />
      ) : (
        <>
          {err ? (
            <Image
              resizeMode="contain"
              source={CloudError}
              style={{ width: 100, height: 80 }}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={Cloud}
              style={{ width: 100, height: 80 }}
            />
          )}
          <Form behavior="padding" enabled={Platform.OS === 'ios'}>
            <Title>LOGIN</Title>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter with your e-mail"
              placeholderTextColor="#BABABA"
              value={email}
              textContentType="emailAddress"
              onChangeText={text => setEmail(text)}
            />
            {err && <Error>{err.email}</Error>}
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter with your password"
              placeholderTextColor="#BABABA"
              value={password}
              textContentType="password"
              secureTextEntry
              onChangeText={text => setPassword(text)}
            />
            {err && <Error>{err.message || err.password}</Error>}
            <Button color="#2b283d" activeOpacity={0.8} onPress={handleSignin}>
              <TitleButton color="#f7f8f9">SIGN IN</TitleButton>
            </Button>

            <Button color="#f7f8f9" activeOpacity={0.8} onPress={handleSignup}>
              <TitleButton color="#2b283d">SIGN UP</TitleButton>
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
}

Login.propTypes = {
  navigation: PropTypes.func.isRequired,
};
