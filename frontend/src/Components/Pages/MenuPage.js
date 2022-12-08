import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import rope01 from '../../assets/img/rope_01.png';

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
    <div class="grid grid-col-3 bg-custom-blue pb-10 inline-block min-w-1/2 sm:px-6 lg:px-60">
        <img src="${rope01}" class="w-1/5 h-50">

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