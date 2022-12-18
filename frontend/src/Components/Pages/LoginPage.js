import { setAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import { clearPage, renderPageTitle, renderHomeButton } from '../../utils/render';
import Footer from '../Footer/Footer';
import Navigate from '../Router/Navigate';
import rope01 from '../../assets/img/rope_01.png';
import rope02 from '../../assets/img/rope_02.png';
import rope03 from '../../assets/img/rope_03.png';
import helm from '../../assets/img/helm.png';

const LoginPage = () => {
  clearPage();

  // get main
  const main = document.querySelector('main');

  // verify if the user is already connected
  if (isAuthenticated()) {
    console.log('access denied');
    main.innerHTML += '<div class="max-h-screen max-w-screen"> You are already login </div>';
    return;
  }

  // adding home button and register form to main
  renderPageTitle('Login');
  main.innerHTML += renderHomeButton();
  main.innerHTML += renderLoginForm();
  Footer();

  // get buttons and add listeners
  const form = document.querySelector('form');
  const registerButton = document.querySelector('#register-redirection');
  const homeButton = document.querySelector('#home-button');

  form.addEventListener('submit', onLogin);
  registerButton.addEventListener('click', redirectToRegisterPage);
  homeButton.addEventListener('click', redirectToHomePage);
};

function renderLoginForm() {
  const form = `
    <div class="pb-10 inline-block min-w-full sm:px-6 lg:px-60">
      <form action="${process.env.API_BASE_URL}/auths/login" method="post">
        <div class="px-10 pt-6 pb-8 mb-4 flex flex-row relative bg-custom-blue rounded-3xl">
          <div class="absolute left-0 top-0 px-0 py-0 flex flex-row">
            <div class="h-20 w-28">
              <img src="${rope01}" class="object-scale-down">
            </div>
            <div class="w-10 h-10">
              <img src="${rope02}" class="object-scale-down">
            </div>
          </div>
          <div id="error-area" class="border-4 border-white rounded-3xl w-full flex flex-col justify-center items-center py-10">
            <div class="bg-wood-board-01 bg-cover bg-center block mt-0">
              <label class="text-white text-center text-xl font-mono p-10" for="username">username :</label>
            </div>
            <input id="username" required class="bg-custom-lightyellow shadow appearance-none rounded" name="username" type="text">
            <div class="bg-wood-board-01 bg-cover bg-center block mt-10">
              <label class="text-white text-center text-xl font-mono p-10" for="password">password :</label>
            </div>
            <input id="password" class="bg-custom-lightyellow shadow appearance-none rounded" name="password" type="password">
          </div>
        </div>
      

        <div class="flex flex-row justify-around overflow-visible mt-100">
          <div class="relative flex flex-col justify-between">
            <div class="absolute h-1 w-10 left-10 -z-10 -top-8">
              <img src="${rope02}" class="object-scale-down">
            </div>
            <div class="bg-wood-board-02 bg-cover bg-center block w-full p-10">
            <input class="hover:text-custom-blue text-white text-xl font-mono" type="submit" value="login">
            </div>
          </div>
        </form>
          <div class="relative flex flex-col justify-between">
              <div class="absolute h-1 w-10 left-10 -z-10 -top-8">
                <img src="${rope02}" class="object-scale-down">
              </div>
            <div class="bg-wood-board-02 bg-cover bg-center block w-full h-full p-10">
              <div id="register-redirection" class="hover:text-custom-blue text-white text-xl font-mono">register</div>
            </div>
          </div>
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

// login the user
async function onLogin(e) {
  e.preventDefault();

  // get user info
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: 'include',
    mode:'cors',
    headers: {
      'Content-Type': 'application/json'},
  };

  const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);

  // send error message if the information to login are incorect
  if (response.status === 401) {
    LoginPage();
    console.log('error 401');
    const errorArea = document.querySelector('#error-area');
    const errorMessage401 = document.createElement('div');
    errorMessage401.innerText = 'Your password or username is incorrect';
    errorMessage401.className = 'font-mono text-red';
    errorArea.appendChild(errorMessage401);
  }

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  redirectToHomePage();
}

function redirectToRegisterPage() {
  Navigate('/register');
}

function redirectToHomePage() {
  Navigate('/');
}

export default LoginPage;
