import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const NewPage = () => {
  clearPage();
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const submit = document.createElement('input');
  submit.value = 'Go back to HomePage';
  submit.className = 'btn btn-secondary mt-3';
  submit.addEventListener('click', () => {
    Navigate('/');
  });

  main.appendChild(submit);
}

export default NewPage;
