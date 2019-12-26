import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '../Loading';
import api from '../../services/api';
import service from '../../services/weather';
import background from '../../services/background';
import {
  Container,
  Title,
  ContainerMenu,
  Content,
  City,
  Temp,
  LoadingTitle,
} from './styles';

export default function Menu({ navigation }) {
  const [citySave, setCitySave] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getCity() {
    setRefreshing(true);
    const token = await AsyncStorage.getItem('@token');
    const response = await api('/user/like', {
      method: 'GET',
      headers: {
        token,
      },
    });
    const citys = [];
    if (response && response.data) {
      for (let like of response.data) {
        const res = await service.handle(like.lat, like.long);
        const icon = background.find(i => i.name === res.location.icon);
        citys.push({
          ...res,
          name: like.name,
          colorOne: icon.colorOne,
          colorTwo: icon.colorTwo,
          lat: like.lat,
          lon: like.long,
          icons: icon,
        });
      }
    }
    setRefreshing(false);
    setCitySave(citys);
  }

  useEffect(() => {
    getCity();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Title>City Save</Title>
        {citySave.length ? (
          <Container>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={citySave}
              onRefresh={getCity}
              refreshing={refreshing}
              renderItem={({ item }) => (
                <Content onPress={() => navigation.navigate('Home', { item })}>
                  <ContainerMenu>
                    <City>{item.name}</City>
                    <Icon
                      name={item.icons.i}
                      size={34}
                      color={item.icons.colorIcon}
                    />
                    <Temp>{item.present}</Temp>
                  </ContainerMenu>
                </Content>
              )}
              keyExtractor={(item, index) => String(index)}
            />
          </Container>
        ) : (
          <>
            <LoadingTitle>Waiting new citys saved</LoadingTitle>
            <Loading />
          </>
        )}
      </SafeAreaView>
    </>
  );
}

Menu.propTypes = {
  navigation: PropTypes.func.isRequired,
};
