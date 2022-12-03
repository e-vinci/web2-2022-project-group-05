// import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
// import Navbar from '../Navbar/Navbar';
// import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle("Login page");
  const main = document.querySelector('main');
  main.innerHTML = 'You login here bitchhhhhhhhh';
  // form.addEventListener('submit', onLogin);
  };
  Footer();

  function createForm(){
    const form = `
      <form>
        <label>pseudo :</label>
        <input type="text" id="login_pseudo" name="login_pseudo">
        <label>password :</label>
        <input type="password" id="login_password" name="login_password">
        <input type="submit">
      </form>
     `
     return form;
  }

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