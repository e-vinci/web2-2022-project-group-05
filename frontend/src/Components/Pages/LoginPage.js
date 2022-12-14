import { setAuthenticatedUser,isAuthenticated } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';
import helm from '../../assets/img/helm.png';

const LoginPage = () => {
  clearPage();
  const main = document.querySelector('main');

  if(isAuthenticated()){
    console.log('access denied');
    main.innerHTML+='<div class="max-h-screen max-w-screen"> You are already login </div>'
    return;
  }

  renderPageTitle("Login");

  main.innerHTML += renderLoginForm();

  const form = document.querySelector('form');
  form.addEventListener('submit', onLogin);

  const registerButton = document.querySelector('#register-redirection');
  registerButton.addEventListener('click', redirectToRegisterPage);

  Footer();
};

function renderLoginForm() {
  const form = `
    <div class="pb-10 inline-block min-w-full sm:px-6 lg:px-60">
      <form>
        <div class="px-10 pt-6 pb-8 mb-4 flex flex-row relative bg-custom-blue rounded-3xl">
          <div class="absolute left-0 top-0 px-0 py-0 flex flex-row">
            <div class="h-20 w-28">
              <img src="${rope01}" class="object-scale-down">
            </div>
            <div class="w-10 h-10">
              <img src="${rope02}" class="object-scale-down">
            </div>
          </div>
          <div class="border-4 border-white rounded-3xl w-full flex flex-col justify-center items-center py-10">
            <div class="bg-wood-board-01 bg-cover bg-center block mt-0">
              <label class="text-white text-center text-xl font-mono p-10" for="username">username :</label>
            </div>
            <input  id="username" class="bg-custom-lightyellow shadow appearance-none rounded" name="username" type="text">
            <div class="bg-wood-board-01 bg-cover bg-center block mt-10">
              <label class="text-white text-center text-xl font-mono p-10" for="password">password :</label>
            </div>
            <input  id="password" class="bg-custom-lightyellow shadow appearance-none rounded" name="password" type="password">
          </div>
        </div>

        <div class="flex flex-row justify-around overflow-visible mt-100">
          <div class="relative flex flex-col justify-between">
            <div class="absolute h-1 w-10 left-10 -z-10 -top-8">
              <img src="${rope02}" class="object-scale-down">
            </div>
            <div class="bg-wood-board-02 bg-cover bg-center block w-full">
              <input class="hover:text-custom-blue bg-cover bg-left text-white text-xl font-mono p-10" type="submit" value="login">
            </div>
          </div>
          <div class="relative flex flex-col justify-between">
              <div class="absolute h-1 w-10 left-10 -z-10 -top-8">
                <img src="${rope02}" class="object-scale-down">
              </div>
            <div class="bg-wood-board-02 bg-cover bg-center block w-full h-full">
              <button id="register-redirection" class="hover:text-custom-blue bg-cover bg-left text-white text-xl font-mono p-10">
              register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="absolute -z-10 left-1/3 top-11">
        <div class="h-48 w-48">
          <img src="${helm}" class="object-scale-down">
        </div>
    </div>

    <div class="absolute -z-10 right-0 top-10 rotate-180">
      <div class="h-20 w-20">
        <img src="${rope03}" class="object-scale-down">
      </div>
    </div>

    <div class="absolute -z-10 left-0 top-0">
      <div class="h-20 w-20">
        <img src="${rope02}" class="object-scale-down">
      </div>
    </div>

    `;

  return form;
}

async function onLogin(e) {

  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/auths/login', options);
  console.log(response);

  if(response.status === 400 ){
    console.log('error 400');
    const form = document.querySelector('form');
    const errorMessage400 = `
      <div class="text-white font-mono"> 
        Your informations are missing 
      </div>
      `;
    form.innerHTML += errorMessage400;
    LoginPage();
  }

  if(response.status === 401 ){
    console.log('error 401');
    const form = document.querySelector('form');
    const errorMessage401 = document.createElement('div');
    errorMessage401.innerText = 'Your account does not exist';
    form.appendChild(errorMessage401);
    LoginPage();
  }

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

function redirectToRegisterPage(){
  Navigate('/register');
}

export default LoginPage;