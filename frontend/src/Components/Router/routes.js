import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login' : LoginPage,
};

export default routes;
