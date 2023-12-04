import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderRegisterForm();

  const form = document.querySelector('#registerForm');
  form.addEventListener('submit', onRegister);
};

function renderRegisterForm() {
  const main = document.querySelector('main');

  main.innerHTML = `
    <div class="container bg-black px-5 py-4 rounded-5 bg-opacity-50 col-3">
      <form class="text-center text-light" id="registerForm">
        <div class="bg-warning p-2 rounded mt-2 mb-3 text-dark fs-2">Sign in</div>

        <div class="d-flex flex-column form-group">
          <label for="username" class="form-label">Username</label>
          <input class="bg-lavender form-control mb-3" type="text"  id="username" name="username" required>
          <label for="password" class="form-label">Password</label>
          <input class="bg-lavender form-control mb-3" type="password"  id="password" name="password" required>
          <label for="comfirm_password" class="form-label">Confirm password</label>
          <input class="bg-lavender form-control mb-2" type="password"  id="password" name="comfirm_password" required>
          <div>
            <input required="" type="checkbox" class="form-check-input">
            <a href="https://policies.google.com/privacy?hl=en-US" class="link-warning link-underline-opacity-0 link-underline-opacity-100-hover text-white">
                  Accept our policy
            </a>
          </div>
        </div>
        <button type="submit" class="btn btn-warning mt-3 col-8 rounded-5">Sign in</button>
      </form>
    </div>
    `;
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;

  const password = document.querySelector('#password').value;

  const confirmPassword = document.querySelector('#comfirm_password');

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

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navigate('/login');
}
export default RegisterPage;
