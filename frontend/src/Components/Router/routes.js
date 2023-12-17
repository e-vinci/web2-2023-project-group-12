import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import ScorePage from '../Pages/ScorePage';
import RankPage from '../Pages/RankPage';
import Logout from '../Logout/Logout';
import SecondPlayerPage from '../Pages/SecondPlayerPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/login' : LoginPage,
  '/register' : RegisterPage,
  '/score': ScorePage,
  '/rank': RankPage,
  '/logout' : Logout,
  '/secondPlayer' : SecondPlayerPage,
};

export default routes;
