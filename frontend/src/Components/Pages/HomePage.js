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
    <h3 class="text-lavender position-absolute bottom-50 start-50">Let's love each other ! 💜</h3>
    <button type="button" class="btn btn-warning position-absolute start-45 py-4 w-25 fs-3">
      START
    </button>
  
    <div class="d-flex align-items-end h-100 position-relative">
      <div class="col-1 position-absolute end-1 mb-5 d-flex justify-content-end">
      <img id="rules-icon" class="col-7" role="button" data-bs-toggle="modal" data-bs-target="#rules" src="${rulesIcon}" alt="Game rules">
      </div>
      <img class="col-12" src="${robotsHomepage}" alt="robots">
    </div>

    <div class="modal fade" id="rules" tabindex="-1" aria-labelledby="rulesLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fw-bold" id="rulesLabel">Game rules</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5><b><u>Game description</u> :</b></h5>
            <p class="fs-5"> Space Lover is a 2D "combat" game that immerses players in a futuristic space setting. It stands out from traditional combat games.<br><br>
            At the beginning of the game, players' affection meters are completely empty.<br>
            Attacks involve hugs and kisses to fill the opponent's affection meter.<br>
            Finally, the player loses the game when their own meter reaches its maximum.
            </p>
            <h5><b><u>Game controls</u> :</b></h5>
            <div class="d-flex text-center pt-2">
              <div> 
                <p> <b> PLAYER 1</b></p>
                <img class="col-12 pt-0 p-4" src="${player1Controls}" 
                  alt="The player 1 will use the left, right, and up arrow keys to respectively move to the left, right, and jump.
                   They will launch their attacks with O (kisses) and P (hug)">
              </div>
              
              <div> 
                <p> <b> PLAYER 2</b></p>
                <img class="col-12 pt-0 p-4" src="${player2Controls}" 
                  alt="Player 2 will use the keys Q (left), D (right), and Z (jump). 
                  They will launch their attacks with B (kisses) and V (hug)">
              </div>
              
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-warning" data-bs-dismiss="modal">Close</button>
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
