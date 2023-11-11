import { clearPage } from '../../utils/render';

const ScorePage = () => {
    clearPage();
    renderScoreForm();
  };

function renderScoreForm() {
const main = document.querySelector('main');

main.innerHTML = `
<div class="container col-3 bg-black pt-5 px-5 pb-4 rounded-5 bg-opacity-50 text-center justify-content-center">
    <div class="bg-warning p-2 rounded mb-4 fs-3 ">Scores</div>
    <div>
        <div>
            <div class="d-flex justify-content-between">
                <p class="col-sm-6 py-1 rounded-3 text-white">Pseudo</p>
                <p class="bg-lavender col-5 rounded-3">Ishou</p>
            </div>
            <div class="d-flex justify-content-between">
            <p class="col-sm-6 py-1 rounded-3 text-white">Parties jouées</p>
            <p class="bg-lavender col-5 rounded-3">100</p>
            </div>
            <div class="d-flex justify-content-between">
            <p class="col-sm-6 py-1 rounded-3 text-white">Parties gagnées</p>
            <p class="bg-lavender col-5 rounded-3">0</p>
            </div>
            <div class="d-flex justify-content-between">
            <p class="col-sm-6 py-1 rounded-3 text-white">Parties perdues</p>
            <p class="bg-lavender col-5 rounded-3">100</p>
        </div>
        </div>
    </div>
</div>`;
}

export default ScorePage;
