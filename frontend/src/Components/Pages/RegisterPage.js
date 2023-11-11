import { clearPage } from "../../utils/render";

const RegisterPage = () => {
    clearPage();
    renderRegisterForm();
};

function renderRegisterForm() {

    const main = document.querySelector('main');

    main.innerHTML = `
    <div id="formContainer" class="container">
      <form id="loginForm" class="p-5 text-center text-light">
        <div id="formTitle" class="bg-warning p-2 rounded mb-4 text-dark">S'inscrire</div>

        <div class="mb-2">
          <label for="username" class="form-label">Pseudo</label>
          <input type="text"  id="username" name="username" required>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input type="password"  id="password" name="password" required>
        </div>

        <div class="mb-4">
          <label for="comfirm_password" class="form-label">Confirmer le mot de passe</label>
          <input type="password"  id="password" name="comfirm_password" required>
        </div>

        <button type="submit" class="btn btn-warning mt-3">S'inscrire</button>
      </form>
    </div>
    `;
}
export default RegisterPage;