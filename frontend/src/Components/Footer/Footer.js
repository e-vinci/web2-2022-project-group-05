const Footer = async () => {
    renderRandomFacts();
};

async function getRandomAnimalInfo(){
    let animal;
    try {
        const options = {
            method: 'GET',
            headers: {
                'X-Api-Key': 'sDkpQuiIx0EY/GZKXSCbtA==O6Tm10FAA9ee9GZu',
            },
        };

        const animalRes = await fetch('/api/animals');
        if (!animalRes.ok) throw new Error(`fetch error : ${animalRes.status} : ${animalRes.statusText}`);
        const animalName = await animalRes.json();

        const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${animalName.animal}`, options);

        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        const infos = await response.json();

        animal = infos[Math.floor(Math.random() * infos.length)];

        // if no biggest threat found get another one
        let i = 0;
        while (i < 50 && !animal.characteristics.biggest_threat) {
            animal = infos[Math.floor(Math.random() * infos.length)];
            i++;
        }

        return animal;

    } catch (err) {
        console.error('Leaderboard error ', err);
    }

    return animal;
    
}

async function renderRandomFacts(){
    const animal = await getRandomAnimalInfo();

    const footer = document.querySelector('footer');
    footer.classList = 'text-center text-white';
    footer.style = 'background-color: #0a4275;'
    footer.innerHTML = `<div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
    <b>Did you know ?</b> The biggest threat of the ${animal.name} is ${(animal.characteristics.biggest_threat).toLowerCase()}.
    
  </div>`;
}

export default Footer;