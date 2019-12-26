import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './pages/Login';
import Home from './pages/Home';
import Main from './components/Main';
import Content from './pages/Home/Content';
import Menu from './components/Menu';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home,
    Content,
  },
  {
    contentComponent: Menu,
    drawerBackgroundColor: '#f7f8f9',
    drawerLockMode: 'locked-closed',
  }
);

const App = createSwitchNavigator({
  Login,
  Main,
  Drawer: AppDrawerNavigator,
});

export default createAppContainer(App);
