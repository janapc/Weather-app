import React, { useEffect, useState } from 'react';
import { Easing, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../../services/api';

import images from './images';
import {
  Container,
  Header,
  Temp,
  City,
  Description,
  ContainerCurrent,
  TitleCurrent,
  Like,
} from './styles';

Icon.loadFont();

export default function Current({ city }) {
  const [iconAnimated, setIconAnimated] = useState(new Animated.Value(0));
  const [like, setLike] = useState();

  useEffect(() => {
    async function getUser() {
      const token = await AsyncStorage.getItem('@token');
      const response = await api('/user/like', {
        method: 'GET',
        headers: {
          token,
        },
      });
      if (response && response.data) {
        const likes = response.data;
        const isLike = likes.find(thumb => thumb.cityId === city.location.id);
        if (isLike) setLike({ cityId: isLike.cityId });
      } else setLike();
    }
    getUser();
  }, [city]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(iconAnimated, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
      })
    ).start();
  }, []);

  function tempCurrent() {
    let menuItems = [];
    for (let [key, value] of Object.entries(city.location.current)) {
      menuItems.push(
        <ContainerCurrent key={key}>
          <TitleCurrent font="bold" size="20px">
            {key}
          </TitleCurrent>
          <TitleCurrent font="normal" size="16px">
            {value}
          </TitleCurrent>
        </ContainerCurrent>
      );
    }
    return <>{menuItems}</>;
  }

  function iconImage() {
    const ic = images.find(i => i.name === city.location.icon);
    return (
      <Animated.Image
        source={ic.file}
        style={{
          alignSelf: 'center',
          flex: 1,
          width: 80,
          height: 80,
          resizeMode: 'contain',
          marginLeft: iconAnimated.interpolate({
            inputRange: [0, 0.3, 0.8, 1],
            outputRange: [0, 80, -80, 0],
          }),
        }}
      />
    );
  }

  async function saveLocation() {
    const token = await AsyncStorage.getItem('@token');
    if (like && like.cityId === city.location.id) {
      await api(`/user/${city.location.id}/dislike`, {
        method: 'DELETE',
        headers: {
          token,
        },
      });
      setLike();
    } else {
      await api('/user/like', {
        method: 'POST',
        data: {
          long: city.lon,
          lat: city.lat,
          cityId: city.location.id,
          name: city.name,
        },
        headers: {
          token,
        },
      });
      setLike({ cityId: city.location.id });
    }
  }

  return (
    <>
      <Container>
        <Like onPress={saveLocation}>
          {like && like.cityId === city.location.id ? (
            <Icon name="favorite" size={40} color="#EE5A57" />
          ) : (
            <Icon name="favorite-border" size={40} color="#EE5A57" />
          )}
        </Like>
        {iconImage()}
        <Header>
          <Temp>{city.present}</Temp>
          <City>{city.name}</City>
          <Description>{city.location.description}</Description>
        </Header>
        {tempCurrent()}
      </Container>
    </>
  );
}

Current.propTypes = {
  city: PropTypes.objectOf(PropTypes.any).isRequired,
};
