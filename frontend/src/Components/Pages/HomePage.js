import { setAuthenticatedUser,isAuthenticated,clearAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle, renderMenuTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';
import helm from '../../assets/img/helm.png';
import ice01 from '../../assets/img/iceberg_01.png';
import ice02 from '../../assets/img/iceberg_02.png';
import seal from '../../assets/img/seal_cartoon.png';

const HomePage = () => {
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
  <div class="flex flex-col min-w-full lg:px-60  mb-48">
      <div class="flex flex-col items-center mt-10">
          <div class="w-10 h-10">
              <img src="${rope02}" class="object-scale-down">
          </div>
          <div class="bg-wood-board-02 bg-cover bg-center w-1/2 grid content-center p-3 mt-10">
              <button id="start-button" class="text-white hover:text-custom-blue text-center text-xl font-mono">
                  Start
              </button>
          </div>
      </div>
      <div class="flex flex-row justify-around">
          <div class="flex flex-col items-center w-full">
              <div class="w-10 h-10">
                  <img src="${rope02}" class="object-scale-down">
              </div>
              <div class="bg-wood-board-01 bg-cover bg-center grid content-center p-3 mt-10 w-full">
                  ${loginButton}
              </div>
          </div>
          <div class="flex flex-col items-center w-full">
              <div class="w-10 h-10">
                  <img src="${rope02}" class="object-scale-down">
              </div>
          <div class="bg-wood-board-03 bg-cover bg-center grid content-center p-3 mt-10 w-full">
                  <button id="ranking-button" class=" text-white hover:text-custom-blue text-center text-xl font-mono">
                      Ranking
                  </button>
              </div>
          </div>
      </div>
  </div>
  
  <div class="absolute -z-10 left-48 top-11">
    <div class="h-48 w-48">
      <img src="${helm}" class="object-scale-down">
    </div>
  </div>
  
  <div class="absolute -z-10 right-0 bottom-10 w-1/2">
    <div>
      <img src="${ice01}" class="object-scale-down">
    </div>
  </div>
  
  <div class="absolute -z-10 left-0 bottom-10 w-1/2">
    <div>
      <img src="${ice02}" class="object-scale-down">
    </div>
  </div>
  
  <div class="absolute z-10 right-0 bottom-0">
    <div class="w-48 h-48">
      <img src="${seal}" class="object-scale-down">
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

export default HomePage;