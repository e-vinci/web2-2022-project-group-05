import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';

const MenuPage = () => {
    clearPage();
    renderPageTitle("Home");
  
    const main = document.querySelector('main');
    main.innerHTML += renderMenu();

    const startButton = document.querySelector('#start-button');
    const loginButton = document.querySelector('#login-button');
    const rankingButton = document.querySelector('#ranking-button');

    startButton.addEventListener('click', startGame);
    loginButton.addEventListener('click', redirectToLogin);
    rankingButton.addEventListener('click', redirectToRanking);

    Footer();
};


function renderMenu(){
    const menu = `
    <div class="relative flex flex-row rounded-3xl pb-10 inline-block min-w-1/2 lg:px-60">
        <div class="flex flex-col">
            <button id="start-button" class="bg-wood-board-02 bg-cover bg-center block text-white text-center text-xl font-mono">
                Start
            </button>
            <button id="login-button" class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono">
                Login
            </button>
            <button id="ranking-button" class="bg-wood-board-03 bg-cover bg-center block text-white text-center text-xl font-mono">
                Ranking
            </button>
        </div>
    </div>
    `

    return menu;
}

function startGame(){
    Navigate('/game');
}

function redirectToLogin(){
    Navigate('/login');
}

function redirectToRanking(){
    Navigate('/ranking');
}

export default MenuPage;