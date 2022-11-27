import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import InfoPage from '../Pages/InfoPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UserPage from '../Pages/UserPage'
import ErrorPage from '../Pages/ErrorPage';
import Leaderboard from '../Pages/Leaderboard';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/info': InfoPage,
  '/ranking': Leaderboard,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/user': UserPage,
  '/error': ErrorPage,
  '/logout': Logout,
};

export default routes;
