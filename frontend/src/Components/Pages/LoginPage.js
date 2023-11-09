import { clearPage } from '../../utils/render';


const LoginPage = () => {
    clearPage();
    renderLoginForm();
  };

function renderLoginForm() {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div id="formContainer">
      <form id="loginForm">
        <div id="formTitle">Connectez-vous !</div>

        <label for="username">Pseudo :</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Se connecter</button>
      </form>
    </div>
    `;
}

export default LoginPage;