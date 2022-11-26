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
}


    function renderUsersFromString(users) {
        const usersTableAsString = getUsersTableAsString(users);
    
        const main = document.querySelector('main');
    
        main.innerHTML += usersTableAsString;
    }


    function getUsersTableAsString(user) {
        const userTableLines = getAllTableLinesAsString(user);
        const users = addLinesToTableHeadersAndGet(userTableLines);
        return users;
      }

    function addLinesToTableHeadersAndGet(tableLines) {
        const userTable = `
        <div class="p-5 text-center bg-light">
        <h1 class="mb-3">Leaderboard</h1>
   
        ${tableLines}`;
        return userTable;
    }

    function getAllTableLinesAsString(listUsers) {
        let counter = 0;
        let usersLines = `<table>
        <tbody>`;
      
     
        listUsers?.forEach((user) => {
            counter++;
            usersLines += `<tr>
                <td class="fw-bold text-info" >${counter}</td>
                <td class="fw-bold text-info" >${user.username}</td>
                <td class="fw-bold text-info" >${user.highscore}</td>
            </tr>`;
        });
        
     usersLines +=`</tbody>
    </table>`

    return usersLines;
    }

  export default Leaderboard;