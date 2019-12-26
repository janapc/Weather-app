import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Header,
  Title,
  Container,
  ContainerHours,
  Description,
} from './styles';

export default function Hours({ city }) {
  return (
    <>
      <Header>Hours</Header>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={city.hr}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <Container>
            <ContainerHours>
              <Title>Hours</Title>
              <Description>{item.time}:00</Description>
            </ContainerHours>
            <Icon name={item.icon} color={item.colorIcon} size={28} />
            <ContainerHours>
              <Title>Temp</Title>
              <Description>{item.temp}</Description>
            </ContainerHours>
          </Container>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </>
  );
}

Hours.propTypes = {
  city: PropTypes.objectOf(PropTypes.any).isRequired,
};
