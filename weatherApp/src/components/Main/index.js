import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import PropTypes from 'prop-types';

import { Container } from './styles';

import Current from './Current';
import Days from './Days';
import Hours from './Hours';
import services from '../../services/weather';
import background from '../../services/background';

export default function Main({ city }) {
  const [refreshing, setRefreshing] = useState(false);
  const [newCity, setNewCity] = useState();

  async function onRefresh(longitude, latitude, name) {
    setRefreshing(true);
    try {
      const response = await services.handle(latitude, longitude);
      const icon = background.find(i => i.name === response.location.icon);

      setNewCity({
        ...response,
        name,
        present: response.location.temp,
        lat: latitude,
        lon: longitude,
        icons: icon,
      });
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      refreshControl={
        city && (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(city.lon, city.lat, city.name)}
          />
        )
      }
    >
      <Container>
        <Current city={newCity ? newCity : city} />
        <Days city={newCity ? newCity : city} />
        <Hours city={newCity ? newCity : city} />
      </Container>
    </ScrollView>
  );
}

Main.propTypes = {
  city: PropTypes.objectOf(PropTypes.any).isRequired,
};
