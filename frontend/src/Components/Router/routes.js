import GamePage from '../Pages/GamePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UserPage from '../Pages/UserPage';
import ErrorPage from '../Pages/ErrorPage';
import Leaderboard from '../Pages/Leaderboard';
import Logout from '../Logout/Logout';
import HomePage from '../Pages/HomePage';
import StorePage from '../Pages/StorePage';


const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/ranking': Leaderboard,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/user': UserPage,
  '/error': ErrorPage,
  '/logout': Logout,
  '/game': GamePage,
  '/store': StorePage,
};

export default routes;
