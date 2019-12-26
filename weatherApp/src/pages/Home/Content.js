import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Main from '../../components/Main';
import { Title, Img } from './styles';
import background from '../../images/background.png';

export default function Content({ city }) {
  return (
    <>
      {city ? (
        <Main city={city} />
      ) : (
        <View style={{ top: '50%' }}>
          <Title>Search the temp current of your city and to be happy =)</Title>
          <Img source={background} resizeMode="contain" />
        </View>
      )}
    </>
  );
}

Content.propTypes = {
  city: PropTypes.objectOf(PropTypes.any).isRequired,
};
