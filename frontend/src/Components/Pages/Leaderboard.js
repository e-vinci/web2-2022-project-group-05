import { clearPage } from '../../utils/render';

const Leaderboard = async () => {
  try {
    clearPage();

    const response = await fetch('/api/users');

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
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Leaderboard</h1>
        <table class="table-auto">
        <thead>
        <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
        </tr>
        </thead>
        <tbody>`;

  listUsers?.forEach((user) => {
    counter++;
    usersLines += `<tr>
                <td>${counter}</td>
                <td>${user.username}</td>
                <td>${user.highscore}</td>
            </tr>`;
  });

  usersLines += `</tbody>
    </table>`;

  return usersLines;
}

export default Leaderboard;
