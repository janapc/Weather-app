import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import Content from './Content';
import Modal from '../Modal';
import services from '../../services/weather';
import background from '../../services/background';
import { Menu, Container } from './styles';

Icon.loadFont();
export default function Home({ navigation }) {
  const [city, setCity] = useState();
  const [color, setColor] = useState(['#EE5A57', '#F89069']);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (navigation.getParam('item')) {
      const newCity = navigation.getParam('item');
      setCity(newCity);
      setColor([newCity.colorOne, newCity.colorTwo]);
    }
    navigation.closeDrawer();
  }, [navigation]);

  useEffect(() => {
    if (!color.length) setColor(['#f7f8f9', '#eee']);
  }, [color]);

  async function handleLocationSelected(details, { geometry }) {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    try {
      const response = await services.handle(latitude, longitude);
      const icon = background.find(i => i.name === response.location.icon);

      setCity({
        ...response,
        name: details.description.split(',')[0],
        present: response.location.temp,
        lat: latitude,
        lon: longitude,
        icons: icon,
      });

      setColor([icon.colorTwo, icon.colorOne]);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleModal(value) {
    setModalVisible(value);
  }

  return (
    <>
      <StatusBar backgroundColor="#f7f8f9" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#f7f8f9' }} />
      <LinearGradient colors={color} style={{ flex: 1 }}>
        <Container>
          <Menu>
            <Icon
              onPress={() => navigation.openDrawer('Drawer')}
              name="menu"
              color="#2b283d"
              size={42}
            />
            <Icon
              name="search"
              onPress={() => handleModal(true)}
              color="#2b283d"
              size={42}
            />
          </Menu>
          {!modalVisible ? (
            <Content city={city} />
          ) : (
            <Modal
              handleModal={handleModal}
              modalVisible={modalVisible}
              handleLocationSelected={handleLocationSelected}
            />
          )}
        </Container>
      </LinearGradient>
    </>
  );
}

Home.propTypes = {
  navigation: PropTypes.func.isRequired,
};
