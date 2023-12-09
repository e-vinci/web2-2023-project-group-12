import { clearAuthenticatedUser, clearAuthenticatedUser2, isAuthenticated2 } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  if (isAuthenticated2()) clearAuthenticatedUser2();
  clearAuthenticatedUser();
  Navbar();
  Navigate('/');
};

export default Logout;