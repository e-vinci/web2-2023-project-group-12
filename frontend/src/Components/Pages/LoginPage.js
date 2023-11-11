import { clearPage } from '../../utils/render';


const LoginPage = () => {
    clearPage();
    renderLoginForm();
  };

function renderLoginForm() {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div class="container bg-black p-5 rounded-5 bg-opacity-50 col-3">
      <form class="text-center text-light">
        <div class="bg-warning p-2 rounded mb-3 text-dark fs-3">Connectez-vous !</div>

        <div>
          <label for="username" class="form-label">Pseudo :</label>
          <input type="text"  id="username" name="username" required>
        </div>

        <div>
          <label for="password" class="form-label">Mot de passe :</label>
          <input type="password"  id="password" name="password" required>
        </div>

        <button type="submit" class="btn btn-warning mt-3">Se connecter</button>
      </form>
    </div>
    `;
}

export default LoginPage;