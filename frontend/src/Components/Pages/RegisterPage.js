import { clearPage } from "../../utils/render";

const RegisterPage = () => {
    clearPage();
    renderRegisterForm();
};

function renderRegisterForm() {

    const main = document.querySelector('main');

    main.innerHTML = `
    <div class="container bg-black p-5 rounded-5 bg-opacity-50 col-3 mt-5">
      <form class="text-center text-light">
        <div class="bg-warning p-2 rounded mb-3 text-dark fs-3">S'inscrire</div>

        <div>
          <label for="username" class="form-label">Pseudo</label>
          <input type="text"  id="username" name="username" required>
        </div>

        <div>
          <label for="password" class="form-label">Mot de passe</label>
          <input type="password"  id="password" name="password" required>
        </div>

        <div>
          <label for="comfirm_password" class="form-label">Confirmer le mot de passe</label>
          <input type="password"  id="password" name="comfirm_password" required>
        </div>

        <button type="submit" class="btn btn-warning mt-3">S'inscrire</button>
      </form>
    </div>
    `;
}
export default RegisterPage;