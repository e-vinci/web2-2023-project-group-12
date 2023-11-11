import { clearPage } from '../../utils/render';

const RankPage = () => {
  clearPage();
  renderRankPage();
};

function renderRankPage() {
  const main = document.querySelector('main');

  main.innerHTML = `
    <div class="container col-3 bg-black p-5 rounded-5 bg-opacity-50 text-center justify-content-center">
        <div class="bg-warning p-2 rounded mb-4 fs-3 ">Classement</div>
        <div>
            <div class="d-flex text-white justify-content-around">
                <p class="col-7">Pseudo</p>
                <p class="col">Parties gagnées</p>
            </div>
            <div>
                <div class="d-flex justify-content-between">
                    <p class="bg-lavender col-sm-7 py-1 rounded-3">ChatGPT</p>
                    <p class="bg-lavender col-4">101</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="bg-lavender col-7 py-1 rounded-3">Youssef</p>
                    <p class="bg-lavender col-4">100</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="bg-lavender col-7 py-1 rounded-3">Le daron à nour</p>
                    <p class="bg-lavender col-4">76</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="bg-lavender col-7 py-1 rounded-3">Nour</p>
                    <p class="bg-lavender col-4">2</p>
            </div>
            </div>
        </div>
    </div>`;
}

export default RankPage;
