// eslint-disable-next-line import/no-extraneous-dependencies
import lottie from 'lottie-web';
import { isAuthenticated } from '../../utils/auths';
import { clearPage, renderMenuTitle,renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
// import navigation
import Navigate from '../Router/Navigate';
// import images
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';
import helm from '../../assets/img/helm.png';
import ice01 from '../../assets/img/iceberg_01.png';
import ice02 from '../../assets/img/iceberg_02.png';
import seal from '../../assets/img/seal_cartoon.png';
import shop from '../../assets/store.json';

const HomePage = () => {
  clearPage();
  renderMenuTitle('SealRescue');

  // get main
  const main = document.querySelector('main');
  // add menu to main
  main.innerHTML += renderMenu();
  // if connected add store button
  if (isAuthenticated()) main.innerHTML += renderStoreButton();
  Footer();
  // get buttons
  const storeButton = document.querySelector('#store-button');
  const logoutButton = document.querySelector('#logout-button');
  const startButton = document.querySelector('#start-button');
  const rankingButton = document.querySelector('#ranking-button');
  const loginButton = document.querySelector('#login-button');
  let loadingAnimation;
  if (storeButton) {
    loadingAnimation = lottie.loadAnimation({
      container: document.getElementById('loadingAnimationDiv'),
      animationData: shop,
    });
  }  
  // add listener to the buttons
  loginButton?.addEventListener('click', redirectToLogin);
  logoutButton?.addEventListener('click', logout);
  startButton?.addEventListener('click', startGame);
  rankingButton?.addEventListener('click', redirectToRanking);
  storeButton?.addEventListener('click', redirectToStore);
  loadingAnimation?.addEventListener('DOMLoaded', () => {
    loadingAnimation.play();
  });
};

function renderMenu() {
  const buttonToDisplay = displayLoginOrLogout();
  const menu = `
    <div id="navbarWrapper" class="flex flex-col min-w-full lg:px-60  mb-48">
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
                    ${buttonToDisplay}
                </div>
            </div>
            <div class="flex flex-col items-center w-full">
                <div class="w-10 h-10">
                    <img src="${rope02}" class="object-scale-down">
                </div>
            <div class="bg-wood-board-03 bg-cover bg-center grid content-center p-3 mt-10 w-full">
                    <button id="ranking-button" data-uri="/ranking" class=" text-white hover:text-custom-blue text-center text-xl font-mono">
                        Ranking
                    </button>
                </div>
            </div>
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
    `;

  return menu;
}

// if the user is connected, the button to display is going to be the logout button
// else, the login button
function displayLoginOrLogout() {
  let buttonToDisplay = '';
  if (isAuthenticated()) {
    buttonToDisplay = `
        <button id="logout-button" class="text-white hover:text-custom-blue text-center text-xl font-mono">
        Logout
        </button> 
    `;
  } else {
    buttonToDisplay = `
        <button id="login-button" class="text-white hover:text-custom-blue text-center text-xl font-mono">
        Login
        </button> 
    `;
  }

  return buttonToDisplay;
}

function renderStoreButton() {
  const button = `
  <button id="store-button" class="absolute right-0 top-0 h-20 w-20">
    <div id="loadingAnimationDiv"></div>
  </button>
  `;

  return button;
}

function startGame() {
  Navigate('/game');
}

function redirectToLogin() {
  Navigate('/login');
}

function redirectToRanking() {
  Navigate('/ranking');
}

function redirectToStore() {
  Navigate('/store');
}

function logout() {
  Navigate('/logout');
  Navigate('/');
}

export default HomePage;
