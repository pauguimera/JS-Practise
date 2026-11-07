import './style.css';
import { getUsers, createUser, updateUser } from './firebase.js';

const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();

  const users = await getUsers();
  let userId = null;
  
  if (users !== null) {
    for (const id in users) {
      if (users[id].email === email) {
        userId = id;
      }
    }
  }
  if (userId !== null) {
    await updateUser(userId, username);
  } else {
    userId = await createUser(username, email);
  }
  sessionStorage.setItem('user', userId);
  console.log('Usuari registrat amb id:', userId);
});