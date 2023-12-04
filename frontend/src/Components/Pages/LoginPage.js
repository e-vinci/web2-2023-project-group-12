import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';


const LoginPage = () => {
    clearPage();
    renderLoginForm();

    const form = document.querySelector('#loginForm');
    form.addEventListener('submit', onLogin);
  };

function renderLoginForm() {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div class="container bg-black px-5 py-4 rounded-5 bg-opacity-50 col-3">
      <form class="text-center text-light" id="loginForm">
        <div class="bg-warning p-2 rounded mt-2 mb-3 text-dark fs-2">Log in</div>

        <div class="d-flex flex-column form-group">
          <label for="username" class="form-label">Username</label>
          <input class="bg-lavender form-control mb-3" type="text"  id="username" name="username" required>
          <label for="password" class="form-label">Password</label>
          <input class="bg-lavender form-control mb-2" type="password"  id="password" name="password" required>
        </div>
        <div class ="errorDiv input-container text-danger" id="errorLogin">
        </div>
        <button type="submit" class="btn btn-warning mt-3 col-8 rounded-5">Log in</button>
      </form>
    </div>
    `;

}

async function onLogin(e) {

  e.preventDefault();


  const username = document.querySelector('#username').value;

  const password = document.querySelector('#password').value;

  const errorDiv = document.querySelector("#errorLogin");

  const options = {

    method: 'POST',

    body: JSON.stringify({

      username,

      password,

    }),
    mode:'cors',
    credentials :'include',
    headers: {

      'Content-Type': 'application/json',

    },

  };


  const response = await fetch('/api/auths/login', options);
  errorDiv.style.display="";

  if (!response.ok) {
    errorDiv.innerHTML="<p>password or username wrong</p>"
    refreshLoginForm()
  }

  // if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);


  const authenticatedUser = await response.json();

  errorDiv.style.display="none";

  console.log('Authenticated user : ', authenticatedUser);


  setAuthenticatedUser(authenticatedUser);
  
    Navbar()
  
    Navigate('/');
}


 function refreshLoginForm() {
   // Réinitialiser les champs du formulaire
  document.querySelector('#username').value = '';
  document.querySelector('#password').value = '';
 }

export default LoginPage;