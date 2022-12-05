import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';
import { setAuthenticatedUser } from '../../utils/auths';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  const main = document.querySelector('main');
  main.innerHTML += renderRegisterForm();

  const form = document.querySelector('form');
  form.addEventListener('submit', onRegister);

  Footer();
  };

  function renderRegisterForm(){
    const form = `
    <div class="pb-10 inline-block min-w-full sm:px-6 lg:px-60">
      <form class="flex flex-row justify-around bg-custom-blue px-10 pt-6 pb-8 mb-4 rounded-3xl">
          <div>
          <label class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono mt-10" for="last-name">last name :</label>
          <input  id="lname" class="bg-custom-lightyellow shadow appearance-none rounded" name="last-name" type="text">
          <label class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono mt-10" for="first-name">first name :</label>
          <input id="fname" class="bg-custom-lightyellow shadow appearance-none rounded" name="first-name" type="text">
        </div>
        <div class="flex flex-col justify-start">
          <label class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono mt-10" for="username">username :</label>
          <input  id="username" class="bg-custom-lightyellow shadow appearance-none rounded" name="username" type="text">
          <label class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono mt-10" for="password">password :</label>
          <input  id="password" class="bg-custom-lightyellow shadow appearance-none rounded" name="password" type="password">
          <label class="bg-wood-board-01 bg-cover bg-center block text-white text-center text-xl font-mono mt-10" for="password-verification">verify password :</label>
          <input  class="bg-custom-lightyellow shadow appearance-none rounded" name="password-verification" type="password">
          <input class="bg-wood-board-02 hover:text-custom-blue bg-cover bg-left mt-10 text-white text-xl font-mono py-5 px-10" type="submit" value="register">
        </div>
      </form>
    </div>
    `

    return form;
  }

  async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const lname = document.querySelector('#lname').value;
  const fname = document.querySelector('#fname').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      lname,
      fname,
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