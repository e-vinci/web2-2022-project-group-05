import{ clearPage } from "../../utils/render";

const AccountPage = () => {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = 'Here is you';
  };
  
  export default AccountPage;