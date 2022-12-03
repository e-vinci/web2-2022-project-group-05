import { clearPage, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
// import Navigate from '../Router/Navigate';
// import Navbar from '../Navbar/Navbar';
// import { setAuthenticatedUser } from '../../utils/auths';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  const main = document.querySelector('main');
  main.innerHTML = 'Register here or you\'ll die';
  Footer();
  // form.addEventListener('submit', onRegister);
  };

/* async function onRegister(e) {
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

  Navigate('/');

} */

export default RegisterPage; 