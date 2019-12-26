import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Title, Day, TitleDays, DescriptionDays } from './styles';

export default function Days({ city }) {
  return (
    <>
      <Title>Days</Title>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={city.day}
        renderItem={({ item }) => (
          <Day>
            <Icon name={item.icon} color={item.colorIcon} size={24} />
            <DescriptionDays>{item.temp}</DescriptionDays>
            <TitleDays>Day</TitleDays>
            <DescriptionDays>{item.date}</DescriptionDays>
          </Day>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </>
  );
}

Days.propTypes = {
  city: PropTypes.objectOf(PropTypes.any).isRequired,
};
