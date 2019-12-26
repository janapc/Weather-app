import axios from 'axios';
import { URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: URL,
});

export default api;
