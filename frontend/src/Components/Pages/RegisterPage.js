import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';
import { setAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';
import helm from '../../assets/img/helm.png';

const RegisterPage = () => {
  clearPage();
  const main = document.querySelector('main');

  if(isAuthenticated()){
    console.log('access denied') ;
    main.innerHTML += '<div class="max-h-screen max-w-screen"> You are already register and login </div>';
    return;
 }

  renderPageTitle('Register');
  main.innerHTML += renderRegisterForm();

  const form = document.querySelector('form');
  form.addEventListener('submit', onRegister);

  Footer();
  };

  function renderRegisterForm(){
    const form = `
    <div class="pb-10 inline-block min-w-full sm:px-6 lg:px-60">

      <form>
        <div class="bg-custom-blue px-10 pt-6 pb-8 mb-4 rounded-3xl" >
        <div class="flex flex-row justify-around border-4 border-white rounded-3xl py-10">
            <div class="flex flex-col justify-start">
              <div class="bg-wood-board-01 bg-cover bg-left block">
                <label class="text-white text-center text-xl font-mono" for="username">username :</label>
              </div>
              <input  id="username" class="bg-custom-lightyellow shadow appearance-none rounded" name="username" type="text">
              <div class="bg-wood-board-01 bg-cover bg-left block mt-10">
                <label class="text-white text-center text-xl font-mono" for="password">password :</label>
              </div>
              <input  id="password" class="bg-custom-lightyellow shadow appearance-none rounded" name="password" type="password">
              <div class="bg-wood-board-01 bg-cover bg-left block mt-10">
                <label class="text-white text-center text-xl font-mono" for="password-verification">verify password :</label>
              </div>
              <input  class="bg-custom-lightyellow shadow appearance-none rounded" name="password-verification" type="password">
              <a href="https://policies.google.com/privacy?hl=en-US">
                <input type="checkbox" name="policy">
                <label for="policy" class="hover:text-white" >Accept our policy</label><br>
              </a>
              </div>
          </div>
        </div>
        <input class="bg-wood-board-02 hover:text-custom-blue bg-cover bg-left mt-10 text-white text-xl font-mono py-5 px-10 right-10" type="submit" value="register">
      </form>
    </div>

    <div class="absolute -z-10 left-1/3 top-11">
      <div class="h-48 w-48">
        <img src="${helm}" class="object-scale-down">
      </div>
    </div>

    <div class="absolute -z-10 left-0 top-0">
      <div class="h-20 w-20">
        <img src="${rope03}" class="object-scale-down">
      </div>
    </div>
    `

    return form;
  }

  async function onRegister(e) {
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

  const response = await fetch('/api/auths/register', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/login');

}

export default RegisterPage; 