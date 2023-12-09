import { clearAuthenticatedUser, clearAuthenticatedUser2 } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  clearAuthenticatedUser2();
  Navbar();
  Navigate('/');
};

export default Logout;