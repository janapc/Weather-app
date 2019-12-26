import React, { useState } from 'react';
import { SECRET_MAPS } from 'react-native-dotenv';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

const key = SECRET_MAPS;
Icon.loadFont();

export default function Search({ onLocationSelected }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      plaaceholder="Search"
      query={{
        key,
        language: 'pt',
      }}
      onPress={onLocationSelected}
      textInputProps={{
        autoCapitalize: 'none',
        autoCorrect: false,
        onFocus: () => {
          setSearchFocused(true);
        },
        onBlur: () => {
          setSearchFocused(false);
        },
      }}
      listViewDisplayed={false}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          top: 80,
          width: '95%',
          alignSelf: 'center',
        },
        textInputContainer: {
          backgroundColor: 'transparent',
          height: 58,
          marginHorizontal: 5,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 40,
        },
        textInput: {
          backgroundColor: '#f2f2f2',
          height: 58,
          borderRadius: 40,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          fontSize: 18,
        },
        listView: {
          backgroundColor: 'rgba(242,242,242,1)',
          marginTop: 5,
          borderRadius: 20,
          marginHorizontal: 6,
        },
        description: {
          fontSize: 16,
          fontWeight: 'normal',
        },
        row: {
          paddingTop: 20,
          paddingLeft: 10,
          height: 58,
        },
      }}
    />
  );
}

Search.propTypes = {
  onLocationSelected: PropTypes.func.isRequired,
};
