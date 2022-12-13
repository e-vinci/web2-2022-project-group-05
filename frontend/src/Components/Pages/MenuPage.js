import { setAuthenticatedUser,isAuthenticated,clearAuthenticatedUser } from '../../utils/auths';
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
    const rankingButton = document.querySelector('#ranking-button');

    if(isAuthenticated()){
        const logoutButton = document.querySelector('#logout-button');
        logoutButton.addEventListener('click', logout);
    }else{
        const loginButton = document.querySelector('#login-button');
        loginButton.addEventListener('click', redirectToLogin);
    }

    startButton.addEventListener('click', startGame);
    rankingButton.addEventListener('click', redirectToRanking);

    Footer();
};


function renderMenu(){
    let loginButton = '';
    if(isAuthenticated()){
        loginButton = `
        <button id="logout-button" class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono">
        Logout
        </button> 
    `
    } else{
        loginButton = `
        <button id="login-button" class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono">
        Login
        </button> 
    `
    }
    const menu = `
    <div class="relative flex flex-row rounded-3xl pb-10 inline-block min-w-1/2 lg:px-60">
        <div class="flex flex-col">
            <button id="start-button" class="bg-wood-board-02 bg-cover bg-center block text-white text-center text-xl font-mono">
                Start
            </button>
           ${loginButton}
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

function logout(){
    Navigate('/logout');
    MenuPage();
}

export default MenuPage;