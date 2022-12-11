import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';

const LoginPage = () => {
  clearPage();
  renderPageTitle("Login");

  const main = document.querySelector('main');
  main.innerHTML += renderLoginForm();

  const form = document.querySelector('form');
  form.addEventListener('submit', onLogin);

  const registerButton = document.querySelector('#register-redirection');
  registerButton.addEventListener('click', redirectToRegisterPage);

  Footer();
  };

  function renderLoginForm(){
    const form = `
    <div class="pb-10 inline-block min-w-full sm:px-6 lg:px-60">
      <form class="relative bg-custom-blue px-10 pt-6 pb-8 mb-4 rounded-3xl">
      <div class="absolute left-0 px-0 py-0 flex flex-row">
        <div class="h-20 w-28">
          <img src="${rope01}" class="object-scale-down">
        </div>
        <div class="w-20 h-32">
          <img src="${rope02}" class="object-scale-down">
        </div>
        </div>
        <div class="flex flex-col justify-center">
            <label class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono mt-10 w-1/5 h-15" for="username">username :</label>
            <input  id="username" class="bg-custom-lightyellow shadow appearance-none rounded w-1/2 py-2 px-3" name="username" type="text">
            <label class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono mt-10 w-1/5 h-15" for="password">password :</label>
            <input  id="password" class="bg-custom-lightyellow shadow appearance-none rounded w-1/2 py-2 px-3" name="password" type="password">
        </div>
        <div class="flex flex-row justify-between static overflow-visible mt-100">
          <button id="register-redirection" class="bg-wood-board-02 hover:text-custom-blue bg-cover bg-left mt-10 text-white text-xl font-mono py-5 px-10">register</button>
          <input class="bg-wood-board-02 hover:text-custom-blue bg-cover bg-left mt-10 text-white text-xl font-mono py-5 px-10" type="submit" value="login">
        </div>
      </form>
    </div>
    `

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