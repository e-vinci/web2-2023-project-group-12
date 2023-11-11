import { clearPage } from '../../utils/render';


const LoginPage = () => {
    clearPage();
    renderLoginForm();
  };

function renderLoginForm() {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div id="formContainer" class="container">
      <form id="loginForm" class="p-5 text-center text-light">
        <div id="formTitle" class="bg-warning p-2 rounded mb-4 text-dark">Connectez-vous !</div>

        <div class="mb-2">
          <label for="username" class="form-label">Pseudo :</label>
          <input type="text"  id="username" name="username" required>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe :</label>
          <input type="password"  id="password" name="password" required>
        </div>

        <button type="submit" class="btn btn-warning mt-3">Se connecter</button>
      </form>
    </div>
    `;
}

export default LoginPage;