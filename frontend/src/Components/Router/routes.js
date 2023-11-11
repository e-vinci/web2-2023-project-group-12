import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import ScorePage from '../Pages/ScorePage';
import RankPage from '../Pages/RankPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/score': ScorePage,
  '/rank': RankPage,
};

export default routes;
