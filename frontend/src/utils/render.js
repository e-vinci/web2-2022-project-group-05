const clearPage = () => {
  const canva = document.getElementById('renderCanvas');
  if(canva) canva.remove();
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = `
    <div class="bg-wood-board-04 bg-cover bg-left mt-20 w-1/4 h-20 p-3">
      <div class="text-center text-white font-mono text-4xl">
        ${title}
      </div>
    </div>
  `
  main.innerHTML += pageTitle;
};

const renderMenuTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = `
    <div class="bg-custom-blue mt-20 w-1/2 rounded-3xl p-3 h-20">
      <div class="text-center text-white font-mono text-4xl">
        ${title}
      </div>
    </div>
  `
  main.innerHTML += pageTitle;
};

function renderHomeButton(){
  const button = `
  <button id="home-button" class="absolute bg-seal bg-cover bg-left right-0 top-0 h-20 w-20">
  </button>
  `
  return button;
}

export { clearPage, renderPageTitle, renderMenuTitle, renderHomeButton };
