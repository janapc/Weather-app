import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const dHeight = Dimensions.get('window').height;
const dWidth = Dimensions.get('window').width;

export const ContainerModal = styled.View`
  flex: 1;
  width: ${dWidth};
  background-color: transparent;
  justify-content: center;
  height: ${dHeight};
  margin-top: 20px;
`;

export const BackgroundModal = styled.View`
  width: 85%;
  height: 70%;
  align-self: center;
  background-color: #f7f8f9;
  border-radius: 20px;
  elevation: 5;
  box-shadow: 8px 5px 5px #00000014;
`;

export const Menu = styled.View`
  background-color: #f7f8f9;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px;
  height: 80px;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
  elevation: 5;
  box-shadow: 8px 5px 5px #00000014;
`;

export const TitleMenu = styled.Text`
  align-self: center;
  font-size: 18px;
  color: #2b283d;
  font-weight: bold;
`;
