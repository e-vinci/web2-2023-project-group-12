import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import RegisterPage from '../Pages/RegisterPage';
import ScorePage from '../Pages/ScorePage';
import RankPage from '../Pages/RankPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/register' : RegisterPage,
  '/score': ScorePage,
  '/rank': RankPage,
};

export default routes;
