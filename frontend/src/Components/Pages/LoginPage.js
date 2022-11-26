// import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
// import Navbar from '../Navbar/Navbar';
// import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle("Login page");
  const main = document.querySelector('main');
  main.innerHTML = 'You login here bitchhhhhhhhh';
  // form.addEventListener('submit', onLogin);
  };

/* async function onLogin(e) {
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
} */
  
  export default LoginPage;