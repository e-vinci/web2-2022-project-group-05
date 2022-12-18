import { clearPage } from '../../utils/render';

const InfoPage = async () => {
  try {
    clearPage();

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
    console.log(infos);
  } catch (err) {
    console.error('Leaderboard error ', err);
  }
};

export default InfoPage;
