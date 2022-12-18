import GamePage from '../Pages/GamePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Leaderboard from '../Pages/Leaderboard';
import Logout from '../Logout/Logout';
import HomePage from '../Pages/HomePage';
import StorePage from '../Pages/StorePage';

const routes = {
  '/': HomePage,
  '/ranking': Leaderboard,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/game': GamePage,
  '/store': StorePage,
};

export default routes;
