// eslint-disable-next-line no-unused-vars

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
   const navbarWrapper = document.querySelector('#navbarWrapper');
    const navbar = `
  
   `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
