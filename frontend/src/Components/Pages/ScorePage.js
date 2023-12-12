import { clearPage } from '../../utils/render';

import { isAuthenticated, getAuthenticatedUser, clearAuthenticatedUser2, isAuthenticated2 } from '../../utils/auths';
import Navigate from '../Router/Navigate';


const ScorePage = () => {
    if (!isAuthenticated()) Navigate('/');
    else {
        if (isAuthenticated2()) clearAuthenticatedUser2();
        clearPage();
        renderScoreForm();
    }
};

async function renderScoreForm() {
    const main = document.querySelector('main');

    const user = getAuthenticatedUser()?.user;
    const authenticatedUser = await getUser(user?.username);


    main.innerHTML = `
    <div class="container col-3 bg-black px-5 py-4 rounded-5 bg-opacity-50 text-center justify-content-center">
        <div class="bg-warning p-2 rounded mt-2 mb-4 fs-2 ">Scores</div>
        <div>
            <div class="mt-5">
                <div class="d-flex justify-content-between fs-5">
                    <p class="col-sm-6 py-1 rounded-3 text-white">Username</p>
                    <p class="bg-lavender col-5 rounded-3">${authenticatedUser?.username}</p>
                </div>
                <div class="d-flex justify-content-between fs-5">
                <p class="col-sm-6 py-1 rounded-3 text-white">Games played</p>
                <p class="bg-lavender col-5 rounded-3">${authenticatedUser?.gamesPlayed}</p>
                </div>
                <div class="d-flex justify-content-between fs-5">
                <p class="col-sm-6 py-1 rounded-3 text-white">Games won</p>
                <p class="bg-lavender col-5 rounded-3">${authenticatedUser?.gamesWon}</p>
                </div>
                <div class="d-flex justify-content-between fs-5">
                <p class="col-sm-6 py-1 rounded-3 text-white">Games lost</p>
                <p class="bg-lavender col-5 rounded-3">${authenticatedUser?.gamesLost}</p>
            </div>
            </div>
        </div>
    </div>`;
}

async function getUser(username){

    const options = {
  
      method: 'GET',
      mode:'cors',
      credentials :'include',
    };
  
    const response = await fetch(`/api/users/${username}`, options);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const update = await response.json();
  
    return update;
  }

export default ScorePage;
