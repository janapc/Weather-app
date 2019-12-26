import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 30px;
  color: #f7f8f9;
`;

export const Container = styled.View`
  justify-content: center;
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

export const Img = styled.Image`
  width: 200px;
  height: 100px;
  align-self: center;
`;
