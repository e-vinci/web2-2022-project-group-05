import { clearAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  Navbar();
  Navigate('/login');
};

export default Logout;