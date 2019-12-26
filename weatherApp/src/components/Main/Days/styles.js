import styled from 'styled-components/native';

export const Day = styled.View`
  margin: 8px;
  background-color: #fafafa;
  width: 74px;
  height: 113px;
  elevation: 5;
  box-shadow: 8px 5px 5px #00000015;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 8px 0;
`;

export const Title = styled.Text`
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: #2b283d;
`;

export const TitleDays = styled.Text`
  font-weight: normal;
  font-size: 12px;
  color: #2b283d;
`;

export const DescriptionDays = styled.Text`
  font-size: 18px;
  color: #2b283d;
  font-weight: bold;
`;
