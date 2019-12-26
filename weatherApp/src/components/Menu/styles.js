import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 24px;
  color: #ee5a57;
  font-weight: 200;
  text-align: center;
  align-self: center;
  margin-top: 20px;
`;

export const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  justify-content: space-between;
`;

export const ContainerMenu = styled.View`
  padding: 0px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  width: 100%;
  border-radius: 8px;
  background-color: #2d2d2d;
`;

export const Content = styled.TouchableOpacity`
  margin: 10px;
  elevation: 5;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
`;

export const City = styled.Text`
  font-weight: bold;
  color: #f7f8f9;
  font-size: 16px;
`;

export const Temp = styled.Text`
  font-weight: normal;
  color: #f7f8f9;
  font-size: 16px;
  justify-content: flex-end;
`;

export const LoadingTitle = styled.Text`
  text-align: center;
  align-self: center;
  top: 40%;
`;
