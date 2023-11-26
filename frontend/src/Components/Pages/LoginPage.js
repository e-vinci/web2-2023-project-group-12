import { clearPage } from '../../utils/render';


const LoginPage = () => {
    clearPage();
    renderLoginForm();
  };

function renderLoginForm() {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div class="container bg-black px-5 py-4 rounded-5 bg-opacity-50 col-3">
      <form class="text-center text-light">
        <div class="bg-warning p-2 rounded mt-2 mb-3 text-dark fs-3">Log in</div>

        <div class="d-flex flex-column form-group">
          <label for="username" class="form-label">Nickname :</label>
          <input class="bg-lavender form-control mb-3" type="text"  id="username" name="username" required>
          <label for="password" class="form-label">Password :</label>
          <input class="bg-lavender form-control mb-2" type="password"  id="password" name="password" required>
        </div>

        <button type="submit" class="btn btn-warning mt-3 col-8 rounded-5">Log in</button>
      </form>
    </div>
    `;
}

export default LoginPage;