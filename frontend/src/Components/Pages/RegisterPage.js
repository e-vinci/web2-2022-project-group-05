import { clearPage, renderPageTitle, renderHomeButton } from '../../utils/render';
import Footer from '../Footer/Footer';
// import navigation
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';
// import auths utils
import { setAuthenticatedUser, isAuthenticated } from '../../utils/auths';
// import images
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';
import helm from '../../assets/img/helm.png';

const RegisterPage = () => {
  clearPage();

  // get main
  const main = document.querySelector('main');

  // verify if the user is already connected
  if (isAuthenticated()) {
    main.innerHTML +=
      '<div class="max-h-screen max-w-screen"> You are already register and login </div>';
    return;
  }

  renderPageTitle('Register');
  // adding home button and register form to main
  main.innerHTML += renderHomeButton();
  main.innerHTML += renderRegisterForm();
  Footer();

  // get form and adding listener
  const form = document.querySelector('form');
  const homeButton = document.querySelector('#home-button');
  
  // get home button and adding listener
  form.addEventListener('submit', onRegister);
  homeButton.addEventListener('click', redirectToHomePage);
};

function renderRegisterForm() {
  const form = `
    <div class="inline-block min-w-full sm:px-6 lg:px-60">
      <form method="post" class="mb-28">
        <div class="bg-custom-blue px-10 pt-6 pb-8 mb-4 rounded-3xl" >
        <div class="flex flex-row justify-around border-4 border-white rounded-3xl py-10">
            <div class="flex flex-col justify-start">
              <div class="bg-wood-board-01 bg-cover bg-left block p-3 text-center">
                <label class="text-white text-xl font-mono" for="username">username :</label>
              </div>
              <input required id="username" class="bg-custom-lightyellow shadow appearance-none rounded" name="username" type="text">
              <div class="bg-wood-board-01 bg-cover bg-left block mt-10 p-3 text-center">
                <label class="text-white text-xl font-mono" for="password">password :</label>
              </div>
              <input required id="password" class="bg-custom-lightyellow shadow appearance-none rounded" name="password" type="password">
              <div id="error-password" class="bg-wood-board-01 bg-cover bg-left block mt-10 py-3 px-12 text-center">
                <label class="text-white text-xl font-mono" for="password-verification">verify password :</label>
              </div>
              <input required id="password2" class="bg-custom-lightyellow shadow appearance-none rounded" name="password-verification" type="password">
              <a href="https://policies.google.com/privacy?hl=en-US">
                <input required type="checkbox" name="policy">
                <label for="policy" class="hover:text-white" >Accept our policy</label><br>
              </a>
            </div>
          </div>
        </div>
        <div class="relative grid justify-items-center">
          <div class="absolute bottom-20 h-10 w-10 -z-10">
            <img src="${rope02}" class="object-scale-down">
          </div>
          <div class="bg-wood-board-02 bg-cover bg-left p-3 text-center w-full">
            <input class="text-white hover:text-custom-blue text-xl font-mono" type="submit" value="register">
          </div>
        </div>
      </form>
    </div>

    <div class="absolute -z-10 left-0 top-0">
      <div class="h-20 w-20">
        <img src="${rope03}" class="object-scale-down">
      </div>
    </div>
    `;
  return form;
}

// register the user
async function onRegister(e) {
  e.preventDefault();

  // get user info
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const password2 = document.querySelector('#password2').value;

  // check the verification between the two passwords
  if(password !== password2){
    RegisterPage();
    const errorArea = document.querySelector('#error-password');
    const error = '<div class="font-mono text-red"> Your passwords are not the same</div>';
    errorArea.innerHTML += error;
    return;
  }

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    mode:'cors',
    credentials :'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  redirectToHomePage();
}


function redirectToHomePage() {
  Navigate('/');
}

export default RegisterPage;
