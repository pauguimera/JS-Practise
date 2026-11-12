const BASE_URL = 'https://pokememory-2769c-default-rtdb.europe-west1.firebasedatabase.app';

export async function getUsers() {
  try {
    const result = await fetch(`${BASE_URL}/users.json`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(username, email) {
  try {
    const result = await fetch(`${BASE_URL}/users.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, email: email })
    });
    const data = await result.json();
    return data.name;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(id, username) {
  try {
    await fetch(`${BASE_URL}/users/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username })
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getGames() {
  try {
    const result = await fetch(`${BASE_URL}/games.json`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createGame(userId, time, cards) {
  try {
    const result = await fetch(`${BASE_URL}/games.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId, time: time, cards: cards })
    });
    const data = await result.json();
    return data.name;
  } catch (error) {
    console.log(error);
  }
}