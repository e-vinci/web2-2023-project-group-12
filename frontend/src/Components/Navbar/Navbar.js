/* eslint-disable no-plusplus */
import logo from '../../img/logo.svg';
import rankIcon from '../../img/rank-icon.svg';
import scoreIcon from '../../img/score-icon.svg';
import muteOnIcon from '../../img/sound-off.png';
import muteOffIcon from '../../img/sound-on.png';
import buttonSFX from '../../sounds/button-sfx.mp3';
import backgroundMusic from '../../sounds/background3-sfx.mp3';

import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  renderNavbar();
  logoutBtn();
  sfxbtn();
  startOrStopMusic();
};

const audio = new Audio(backgroundMusic);
audio.pause();

function renderNavbar() {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const authenticatedUser = getAuthenticatedUser()?.user;

  const anonymousNavbar = `
  <nav class="navbar navbar-expand navbar-light">
      <div class="container-fluid p-0" >
        <a href="#" ><img data-uri="/" id="btn" class="logo col-10" src="${logo}" alt="SPACE LOVER"></a>
        <div>
          <ul class="navbar-nav justify-content-end align-items-center">

            <li class="nav-item col-1">
            <a class="nav-link col-12" href="#"><img id="btn" class="img-fluid sound-icon" src="${muteOnIcon}" alt="Sound Icon"></a>
            </li>

            <li class="nav-item col-2">
              <a class="nav-link" href="#" id="rank"><img data-uri="/rank"  id="btn" class="img-fluid" src="${rankIcon}" alt="Ranking"></a>
            </li>
            
            <li class="nav-item btn btn-warning mx-2 fs-5 col-2" data-uri="/login">
              <a class="nav-link text-black" href="#" data-uri="/login" id="btn">Login</a>
            </li>
            
            <li class="nav-item btn btn-warning mx-2 fs-5 col-3" data-uri="/register">
              <a class="nav-link text-black" href="#" data-uri="/register" id="btn">Register</a> 
            </li>

          </ul>
        </div>
      </div>
    </nav>
`;

  const authenticatedNavbar = `
  <nav class="navbar navbar-expand navbar-light">
      <div class="container-fluid p-0" >
        <a href="#" ><img data-uri="/" id="btn" class="logo col-10" src="${logo}" alt="SPACE LOVER"></a>
        <div>
          <ul class="navbar-nav justify-content-end align-items-center"> 

            <li class="nav-item col-5">
            <p class="text-lavender m-0 fs-3 col-12 text-center" href="#">WELCOME ${authenticatedUser?.username} ! </p>
            </li>

            <li class="nav-item col-1">
            <a class="nav-link col-12" href="#"><img id="btn" class="img-fluid sound-icon" src="${audio.paused ? muteOnIcon : muteOffIcon}" alt="Sound Icon"></a>
            </li>

            <li class="nav-item col-2">
              <a class="nav-link" href="#"><img data-uri="/score"  id="btn" class="img-fluid" src="${scoreIcon}" alt="Scores"></a>
            </li>

            <li class="nav-item col-2">
              <a class="nav-link" href="#" id="rank"><img data-uri="/rank"  id="btn" class="img-fluid" src="${rankIcon}" alt="Ranking"></a>
            </li>
            
            <li class="nav-item btn btn-warning mx-2 fs-5 col-2" id="logout">
              <a class="nav-link text-black"  id="btn" href="#">Logout</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
`;

  navbarWrapper.innerHTML = isAuthenticated() ? authenticatedNavbar : anonymousNavbar;

}
function startOrStopMusic() {
  const muteBtn = document.querySelector('.sound-icon');

  muteBtn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.loop = true;
      audio.volume = 0.3;
      audio.play();
      muteBtn.src = muteOffIcon;
    } else {
      audio.pause();
      muteBtn.src = muteOnIcon;
    }
  });
}

function logoutBtn() {
  const btn = document.querySelector('#logout');
  btn?.addEventListener('click', () => {
    Navigate('/logout');
  });
}

function sfxbtn() {
  const sfx = document.querySelectorAll('#btn');
  for (let i = 0; i < sfx.length; i++) {
    sfx[i]?.addEventListener('click', () => {
      const sound = new Audio(buttonSFX);
      sound.volume = 0.1;
      sound.play();
    });
  }
}

export default Navbar;
