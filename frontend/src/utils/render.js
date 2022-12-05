const clearPage = () => {
  const canva = document.getElementById('renderCanvas');
  if(canva) canva.remove();
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = document.createElement('h4');
  pageTitle.innerText = title;
  pageTitle.className = "bg-wood-board-04 bg-cover bg-left text-center text-white font-mono text-4xl w-1/5 h-50 mt-20 mb-0 px-3 py-3";
  main.appendChild(pageTitle);
};

export { clearPage, renderPageTitle };
