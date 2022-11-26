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
        <h1 class="mb-3">Leaderboard</h1>
        <table class "table-auto">
        <tbody>`;

  listUsers?.forEach((user) => {
    counter++;
    usersLines += `<tr>
                <td class="fw-bold text-info" >${counter}</td>
                <td class="fw-bold text-info" >${user.username}</td>
                <td class="fw-bold text-info" >${user.highscore}</td>
            </tr>`;
  });

  usersLines += `</tbody>
    </table>`;

  return usersLines;
}

export default Leaderboard;
