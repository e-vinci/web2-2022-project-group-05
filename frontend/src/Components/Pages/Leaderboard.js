import { clearPage } from '../../utils/render';
import Footer from '../Footer/Footer';

const Leaderboard = async () => {
  try {
    clearPage();
    Footer();
    const response = await fetch('/api/users/?order=score');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const users = await response.json();
    renderUsersFromString(users);
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
  <div class="py-10 inline-block min-w-full sm:px-6 lg:px-8">
  <h1 class="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Leaderboard</h1>
        <table class="text-center min-w-full">
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

export default Leaderboard;
