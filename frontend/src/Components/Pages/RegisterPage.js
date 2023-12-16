import { isAuthenticated } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import buttonSFX from '../../sounds/button-sfx.mp3';

const RegisterPage = () => {
  if (!isAuthenticated()) {
    clearPage();
    renderRegisterForm();
    sfxbtn();

    const form = document.querySelector('#registerForm');
    form.addEventListener('submit', onRegister);
  }
  else Navigate('/');
};

function renderRegisterForm() {
  const main = document.querySelector('main');

  main.innerHTML = `
    <div class="container bg-black px-5 py-4 rounded-5 bg-opacity-50 col-3">
      <form class="text-center text-light" id="registerForm">
        <div class="bg-warning p-2 rounded mt-2 mb-3 text-dark fs-2">Register</div>

        <div class="d-flex flex-column form-group">
          <label for="username" class="form-label">Username</label>
          <input class="bg-lavender form-control mb-3" type="text"  id="username" name="username" required>
          <label for="password" class="form-label">Password</label>
          <input class="bg-lavender form-control mb-3" type="password"  id="password" name="password" required>
          <label for="confirmPassword" class="form-label">Confirm password</label>
          <input class="bg-lavender form-control mb-2" type="password"  id="confirmPassword" name="confirmPassword" required>
          <div>
            <input required="" type="checkbox" class="form-check-input">
            <a href="https://policies.google.com/privacy?hl=en-US" class="link-warning link-underline-opacity-0 link-underline-opacity-100-hover text-white">
                  Accept our policy
            </a>
          </div>
          <div class ="errorDiv input-container text-danger" id="errorRegister">
          </div>
        </div>
        <button type="submit" class="btn btn-warning mt-3 col-8 rounded-5">register</button>
      </form>
    </div>
    `;
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;

  const password = document.querySelector('#password').value;

  const confirmPassword = document.querySelector('#confirmPassword').value;

  const errorDiv = document.querySelector("#errorRegister");

  if (password.length<5)
    errorDiv.innerHTML='<p>your password should be at least 5 characters</p>'
  else if (password !== confirmPassword)
    errorDiv.innerHTML='<p>already forget your password ?</p>'
  else {
    const options = {
      method: 'POST',

      body: JSON.stringify({
        username,

        password,

        confirmPassword,
      }),
      mode:'cors',
      credentials :'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('/api/auths/register', options);

    if (!response.ok)
      errorDiv.innerHTML='<p>username already taken or empty username</p>'

    // if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    await response.json();

    errorDiv.style.display="none";

    Navigate('/login');
  }
}

function sfxbtn () {
  const sfx = document.querySelector('button');
  sfx?.addEventListener("click", () =>{
    const audio = new Audio(buttonSFX);
    audio.volume = 0.1;
    audio.play();
  });
}


export default RegisterPage;
