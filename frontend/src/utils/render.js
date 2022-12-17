import helm from '../assets/img/helm.png';
import backButton from '../assets/img/backButton.png';

const clearPage = () => {
  const canva = document.getElementById('renderCanvas');
  if (canva) canva.remove();
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = `
  <div class="relative bg-wood-board-04 bg-cover bg-left w-1/4 p-3 mt-10">
    <div class="absolute -z-10 -left-10 -top-10">
        <div class="h-48 w-48">
          <img src="${helm}" class="object-scale-down">
        </div>
    </div>
    <div class="">
      <div class="text-center text-white font-mono text-4xl">
        ${title}
      </div>
    </div>
  </div>
  `;
  main.innerHTML += pageTitle;
};

const renderMenuTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = `
  <div class="relative bg-custom-blue w-1/2 rounded-3xl h-20 mt-10">
    <div class="absolute -z-10 left-0 top-0">
        <div class="h-48 w-48">
          <img src="${helm}" class="object-scale-down">
        </div>
    </div>
    <div class="">
      <div class="text-center text-white font-mono text-4xl">
        ${title}
      </div>
    </div>
  </div>
  `;
  main.innerHTML += pageTitle;
};

function renderHomeButton() {
  const button = `
  <div class="block">
    <div class="absolute top-0 right-0 p-2 bg-custom-yellow inline-flex rounded-full mt-3 ml-3">
  <button id="home-button" class="h-20 w-20">
    <img src="${backButton}" class="object-scale-down h-20 w-20">
  </button>
  </div>
  </div>
  `;
  return button;
}

export { clearPage, renderPageTitle, renderMenuTitle, renderHomeButton };
