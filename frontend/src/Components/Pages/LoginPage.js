import { clearPage } from '../../utils/render';


const LoginPage = () => {
    clearPage();
    renderLoginForm();
  };

function renderLoginForm() {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div class="container bg-black pt-5 px-5 pb-4 rounded-5 bg-opacity-50 col-3">
      <form class="text-center text-light">
        <div class="bg-warning p-2 rounded mb-3 text-dark fs-3">Connectez-vous</div>

        <div class="d-flex flex-column form-group">
          <label for="username" class="form-label">Pseudo :</label>
          <input class="bg-lavender form-control mb-3" type="text"  id="username" name="username" required>
          <label for="password" class="form-label">Mot de passe :</label>
          <input class="bg-lavender form-control mb-2" type="password"  id="password" name="password" required>
        </div>

        <button type="submit" class="btn btn-warning mt-3 col-8 rounded-5">Se connecter</button>
      </form>
    </div>
    `;
}

export default LoginPage;