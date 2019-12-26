import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 12px;
  background-color: #f9f9f9;
  height: 64px;
  elevation: 5;
  box-shadow: 8px 5px 5px #00000015;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.Text`
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: #2b283d;
`;

export const ContainerHours = styled.View`
  margin: 0px 8px;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #2b283d;
  margin-bottom: 4px;
`;

export const Description = styled.Text`
  font-weight: normal;
  font-size: 14px;
  color: #2b283d;
`;
