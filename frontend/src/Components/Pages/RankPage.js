import { clearPage } from '../../utils/render';
import { clearAuthenticatedUser2, isAuthenticated2 } from '../../utils/auths';

const RankPage = async () => {
  if (isAuthenticated2()) clearAuthenticatedUser2();
  clearPage();
  const rankingData = await rank();
  renderRankPage(rankingData.slice(0,4));
};

function renderRankPage(rankingData) {
  const main = document.querySelector('main');

  const ranking = rankingData.map((user) => `
    <div class="d-flex justify-content-between">
    <p class="bg-lavender col-sm-7 py-1 rounded-3"> ${user.username}</p>
    <p class="bg-lavender col-4 py-1"> ${user.gamesWon}</p>
  </div>
  `,
  );

  main.innerHTML = `
    <div class="container col-3 bg-black px-5 pt-4 pb-5 rounded-5 bg-opacity-50 text-center justify-content-center">
        <div class="bg-warning p-2 rounded mt-2 mb-4 fs-2 ">Ranking</div>
        <div>
            <div class="d-flex text-white justify-content-between">
                <p class="col-7 ">Username</p>
                <p class="col-4">Games won</p>
            </div>
            ${ranking}
        </div>
    </div>`;
}

async function rank() {
  const response = await fetch('/api/ranks');
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const ranking = await response.json();

  return ranking;
}

export default RankPage;
