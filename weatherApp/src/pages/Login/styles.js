import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 20px;
  align-items: center;
  background-color: #ee5a57;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #f7f8f9;
  margin: 20px;
  align-self: center;
  font-weight: bold;
`;

export const Form = styled.KeyboardAvoidingView`
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: #2b283d;
  align-self: center;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  height: 54px;
  width: 90%;
  background-color: #ffffff;
  border-radius: 6px;
  text-align: center;
  margin-top: 20px;
  elevation: 5;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.TouchableOpacity`
  width: 170px;
  height: 54px;
  background-color: ${props => props.color};
  align-self: center;
  margin-top: 40px;
  border-radius: 50px;
  elevation: 5;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
`;

export const TitleButton = styled.Text`
  color: ${props => props.color};
  font-size: 20;
  font-weight: bold;
`;
