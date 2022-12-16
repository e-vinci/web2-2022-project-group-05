const Footer = async () => {
  renderRandomFacts();
};

async function getRandomAnimalInfo() {
  let animal;
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': 'sDkpQuiIx0EY/GZKXSCbtA==O6Tm10FAA9ee9GZu',
      },
    };

    const animalRes = await fetch(`${process.env.API_BASE_URL}/animals`);
    if (!animalRes.ok)
      throw new Error(`fetch error : ${animalRes.status} : ${animalRes.statusText}`);

    const animalName = await animalRes.json();
    const response = await fetch(
      `https://api.api-ninjas.com/v1/animals?name=${animalName.animal}`,
      options,
    );
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const infos = await response.json();
    animal = infos[Math.floor(Math.random() * infos.length)];
  } catch (err) {
    console.error('Leaderboard error ', err);
  }

  return animal;
}

async function renderRandomFacts() {
  const footer = document.createElement('footer');
  const animal = await getRandomAnimalInfo();
  const main = document.querySelector('main');
  footer.classList = 'bg-custom-brown text-center text-white';
  footer.innerHTML = `<div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
    <b>Did you know ?</b> The biggest threat of the ${
      animal.name
    } is ${animal.characteristics.biggest_threat.toLowerCase()}.
  </div>`;
  main.appendChild(footer);
}

export default Footer;
