import { clearPage, renderHomeButton, renderPageTitle } from '../../utils/render';
import Footer from '../Footer/Footer';
import helm from '../../assets/img/helm.png';
import Navigate from '../Router/Navigate';

const Leaderboard = async () => {
  try {
    clearPage();
    renderPageTitle('Scores');
    Footer();

    // get all users
    const response = await fetch(`${process.env.API_BASE_URL}/users/?order=score`);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const users = await response.json();

    // render board
    renderUsersFromString(users);

    // adding home button
    const main = document.querySelector('main');
    main.innerHTML += renderHomeButton();

    // adding listener on home button
    const homeButton = document.querySelector('#home-button');
    homeButton.addEventListener('click', redirectToHomePage);

    Footer();
  } catch (err) {
    console.error('Leaderboard error ', err);
  }
};

function renderUsersFromString(users) {
  const usersTableAsString = getAllTableLinesAsString(users);

  const main = document.querySelector('main');

  main.innerHTML += usersTableAsString;
}

function getAllTableLinesAsString(listUsers) {
  let counter = 0;

  let usersLines = `
  <div class="py-10 inline-block w-2/3 sm:px-6 lg:px-8 bg-custom-blue rounded-3xl">
    <div class="border-4 border-white rounded-3xl px-10">
        <table class="text-center text-white min-w-full">
          <thead class="border-b">
            <tr class="bg-emerald-300">
              <th  class="text-sm font-bold text-gray-900 px-6 py-4">
              Rank
              </th>
              <th  class="text-sm font-bold text-gray-900 px-6 py-4">
              Name
              </th>
              <th  class="text-sm font-bold text-gray-900 px-6 py-4">
              Score
              </th>
            </tr>
          </thead>
        <tbody>
    </div>
  `;

  listUsers?.forEach((user) => {
    counter++;
    usersLines += `
    <tr class="border-b bg-emerald-300">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${counter}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${user.username}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${user.highscore}</td>
    </tr>
    `;
  });

  usersLines += `
  </tbody>
  </table>
</div>
</div>
</div>
`;

  return usersLines;
}

function redirectToHomePage() {
  Navigate('/');
}

export default Leaderboard;
