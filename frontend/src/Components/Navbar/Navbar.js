// eslint-disable-next-line no-unused-vars
import logo from '../../img/logo.svg';
import rankIcon from '../../img/rank-icon.svg';
import scoreIcon from '../../img/score-icon.svg';

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
        <div class="container-fluid p-0">
          <a href="#" ><img data-uri="/" class="logo col-10" src="${logo}" alt="SPACE LOVER"></a>
          <div>
            <ul class="navbar-nav justify-content-end">
              
              <li class="nav-item col-2">
                <a class="nav-link" href="#" ><img data-uri="/score" src="${scoreIcon}" alt="Scores"></a>
              </li>

              <li class="nav-item col-2">
                <a class="nav-link" href="#" ><img data-uri="/rank" class="col-12" src="${rankIcon}" alt="Ranking"></a>
              </li>
              
              <li class="nav-item btn btn-warning mx-2 h-75 mt-3 fs-5" data-uri="/login">
                <a class="nav-link text-black" href="#" data-uri="/login">Log in</a>
              </li>
              
              <li class="nav-item btn btn-warning mx-2 h-75 mt-3 fs-5" data-uri="/register">
                <a class="nav-link text-black" href="#" data-uri="/register">Sign in</a> 
              </li>
            </ul>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
