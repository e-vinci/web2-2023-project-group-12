import { setAuthenticatedUser2, getAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import buttonSFX from '../../sounds/button-sfx.mp3';


const SecondPlayerPage = () => {
    clearPage();
    renderSecondPlayerPage();
    const form = document.querySelector('#secondPlayerForm');
    form.addEventListener('submit', onLogin); 
    startGame();
    sfxbtn();
  };

function renderSecondPlayerPage() {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div class="container bg-black px-5 py-4 rounded-5 bg-opacity-50 col-3">
      <button class="btn btn-warning mt-2 col-12 py-2 rounded-5 start-game-btn">
        Play with an anonymous player
      </button>

      <div class="d-flex my-3 col-12 align-items-center">
        <span class="bg-warning col h-4px"></span>
        <b class="text-center text-light col-2 fs-5"> OR</b>
        <span class="bg-warning col h-4px"></span>
      </div>
      
      <form class="text-center text-light" id="secondPlayerForm">
          <div class="d-flex flex-column form-group">
            <label for="username" class="form-label">Username</label>
            <input class="bg-lavender form-control mb-3" type="text"  id="username" name="username" required>
            <label for="password" class="form-label">Password</label>
            <input class="bg-lavender form-control mb-2" type="password"  id="password" name="password" required>
          </div>
          <div class="errorDiv input-container text-danger" id="errorLogin2"></div>

          <button type="submit" class="btn btn-warning mt-3 col-10 rounded-5">Play with this second player</button>
      </form>
    </div>
    `;

}

async function onLogin(e) {

  e.preventDefault();


  const username = document.querySelector('#username').value;

  const password = document.querySelector('#password').value;

  const player1 = getAuthenticatedUser()?.user;

  const errorDiv = document.querySelector('#errorLogin2');

  if (username === player1.username) {
    errorDiv.innerHTML = `<p>You can't play with yourself</p>`
  }
  else{
    const options = {

      method: 'POST',
  
      body: JSON.stringify({
  
        username,
  
        password,
  
      }),
  
      headers: {
  
        'Content-Type': 'application/json',
  
      },
  
    };
  
  
    const response = await fetch('/api/auths/loginSecondPlayer', options);
    errorDiv.style.display="";

    if (!response.ok) {
      errorDiv.innerHTML="<p>Wrong username or password or this player doesn't exist</p>"
      refreshLoginForm()
    }
  
    const authenticatedUser2 = await response.json();
  
    setAuthenticatedUser2(authenticatedUser2);
  
    Navbar()
    
    Navigate('/game');
  }
}

function startGame() {
  const btn = document.querySelector('.start-game-btn');
  btn.addEventListener('click', () =>{
    Navigate('/game');
  });
  
}

function sfxbtn () {
  const sfx = document.querySelectorAll('button');
  const audio = new Audio(buttonSFX);
  audio.volume = 0.1;
  // eslint-disable-next-line no-plusplus
  for(let i = 0; i<sfx.length; i++){
    sfx[i]?.addEventListener("click", () =>{
      audio.play();
    })
  }
}


function refreshLoginForm() {
  // reset form
 document.querySelector('#username').value = '';
 document.querySelector('#password').value = '';
}


export default SecondPlayerPage;