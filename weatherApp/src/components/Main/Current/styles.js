import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 8px;
  background-color: #2c2a3b;
  padding: 12px;
  align-self: center;
  width: 80%;
  elevation: 5;
  box-shadow: 8px 5px 5px #00000029;
  border-width: 1;
`;

export const Header = styled.View`
  align-items: center;
  margin-top: 0px;
`;

export const Temp = styled.Text`
  font-weight: bold;
  font-size: 38px;
  color: #f4f2ff;
`;

export const City = styled.Text`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 20px;
  color: #f4f2ff;
`;

export const Description = styled.Text`
  font-weight: normal;
  font-size: 16px;
  color: #f4f2ff;
  margin-bottom: 5px;
`;

export const ContainerCurrent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0px;
`;

export const TitleCurrent = styled.Text`
  color: #fafafa;
  font-weight: ${props => props.font};
  font-size: ${props => props.size};
`;

export const Like = styled.TouchableOpacity`
  align-self: flex-end;
  justify-content: center;
  elevation: 5;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.1);
`;
