// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logo from '../../img/logo.svg';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
    <nav class="navbar navbar-expand navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" ><img data-uri="/" class="logo col-10" src="${logo}" alt="SPACE LOVER"></a>
          <div id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mt-4 mb-lg-0 w-100 ">
              
              <li class="nav-item btn btn-warning mx-2">
                <a class="nav-link text-black" href="#" data-uri="/score">Scores</a> 
              </li>                      

              <li class="nav-item btn btn-warning mx-2">
                <a class="nav-link text-black" href="#" data-uri="/rank">Classement</a>
              </li>
              
              <li class="nav-item btn btn-warning mx-2">
                <a class="nav-link text-black" href="#" data-uri="/login">Se connecter</a>
              </li>
              
              <li class="nav-item btn btn-warning mx-2">
                <a class="nav-link text-black" href="#" data-uri="/register">S'inscrire</a> 
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
