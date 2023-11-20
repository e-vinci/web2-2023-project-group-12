// eslint-disable-next-line no-unused-vars
import { Modal } from 'bootstrap';
import { clearPage } from '../../utils/render';
import robotsHomepage from '../../img/robots-homepage.png';
import rulesIcon from '../../img/rules-icon.png';
import player1Controls from '../../img/player1-controls.png';
import player2Controls from '../../img/player2-controls.png';

const HomePage = () => {
  clearPage();
  renderHomePage();
  popUpRules();
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
      <img id="rules-icon" class="col-7" role="button" data-bs-toggle="modal" data-bs-target="#rules" src="${rulesIcon}" alt="Règles du jeu">
      </div>
      <img class="col-12" src="${robotsHomepage}" alt="robots">
    </div>

    <div class="modal fade" id="rules" tabindex="-1" aria-labelledby="rulesLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fw-bold" id="rulesLabel">Règles du jeu</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5><b><u>Description du jeu</u> :</b></h5>
            <p class="fs-5"> Space Lover est un jeu de "combat" 1v1 en 2D qui plonge les joueurs dans un univers spatial et futuriste.
                Il se démarque des jeux de combat traditionnels.<br><br>
                Au début de la partie, la jauge d'affection des joueurs est totalement vide.<br>
                Les attaques consistent en câlins et bisous afin de remplir la jauge d'affection de l'adversaire.<br>
                Enfin, le joueur perd la partie lorsque sa propre jauge atteint son maximum. 
            </p>
            <h5><b><u>Commandes</u> :</b></h5>
            <div class="d-flex text-center pt-2">
              <div> 
                <p> <b> JOUEUR 1</b></p>
                <img class="col-12 pt-0 p-4" src="${player1Controls}" 
                  alt="Le joueur 1 jouera avec les flèches directionnelles gauche, droite et haut 
                    afin de respectivement se déplacer à gauche, droite et sauter. 
                    Il lancera ses attaques avec O (bisous) et P (câlin)">
              </div>
              
              <div> 
                <p> <b> JOUEUR 2</b></p>
                <img class="col-12 pt-0 p-4" src="${player2Controls}" 
                  alt="Le joueur 2 jouera avec les touches Q (gauche), D (droite) et Z (saut).
                    Il lancera ses attaques avec B (bisous) et V (câlin)">
              </div>
              
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-warning" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>

  </div>`;
  main.innerHTML = homepage;
};

function popUpRules () {
  const myModal = new Modal(document.querySelector('#rules'));
  const rulesBtn = document.querySelector('#rules-icon');
  rulesBtn.addEventListener('click', () => {
    myModal.show();
  });
};

export default HomePage;
