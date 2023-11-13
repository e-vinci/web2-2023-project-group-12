import { clearPage } from '../../utils/render';
import robotsHomepage from '../../img/robots-homepage.png';
import rulesIcon from '../../img/rules-icon.png';

const HomePage = () => {
  clearPage();
  renderHomePage();
};

function renderHomePage() {
  const main = document.querySelector('main');
  const homepage = `
  <div class="d-flex flex-column align-items-center justify-content-center h-100">
    <h3 class="text-lavender position-absolute bottom-50 start-50">Aimez-vous 💜</h3>
    <button type="button" class="btn btn-warning position-absolute start-45 py-4 w-25 fs-3">
      LANCER LA PARTIE
    </button>
  
    <div class="d-flex align-items-end h-100 position-relative">
      <div class="col-1 position-absolute end-1 mb-5 d-flex justify-content-end">
        <img class="col-7" id="rules-icon" src="${rulesIcon}" alt="Règles du jeu">
      </div>
      <img class="col-12" src="${robotsHomepage}" alt="robots">
    </div>
  </div>`;
  main.innerHTML = homepage;
}

export default HomePage;
