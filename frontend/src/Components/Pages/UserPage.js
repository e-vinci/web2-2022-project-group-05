import{ clearPage } from "../../utils/render";
import Footer from '../Footer/Footer';

const AccountPage = () => {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = 'Here is you';
    Footer();
  };
  
  export default AccountPage;