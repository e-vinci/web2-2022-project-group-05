import { stopGame } from "./HomePage";

const AccountPage = () => {
    stopGame();
    const main = document.querySelector('main');
    main.innerHTML = 'Here is you';
  };
  
  export default AccountPage;