import { getGames, getUsers } from './firebase.js';

const rankingBody = document.getElementById('ranking-body');

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function addCell(row, text) {
  const cell = document.createElement('td');
  cell.textContent = text;
  row.appendChild(cell);
}

function addRow(game, position, highlightId) {
  const row = document.createElement('tr');
  if (game.id === highlightId) {
    row.classList.add('highlight');
  }
  addCell(row, position);
  addCell(row, game.username);
  addCell(row, game.email);
  addCell(row, formatTime(game.time));
  addCell(row, game.cards);
  rankingBody.appendChild(row);
}

function addDots() {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.colSpan = 5;
  cell.textContent = '...';
  row.appendChild(cell);
  rankingBody.appendChild(row);
}

export async function showRanking(highlightId) {
  const games = await getGames();
  const users = await getUsers();
  rankingBody.textContent = '';

  if (!games || !users) {
    return;
  }

  const list = [];
  for (const id in games) {
    const user = users[games[id].userId];
    list.push({
      id: id,
      username: user.username,
      email: user.email,
      time: games[id].time,
      cards: games[id].cards
    });
  }

  list.sort(function (a, b) {
    if (a.cards !== b.cards) {
      return b.cards - a.cards;
    }
    return a.time - b.time;
  });

  if (list.length <= 5) {
    for (let i = 0; i < list.length; i++) {
      addRow(list[i], i + 1, highlightId);
    }
    return;
  }

  for (let i = 0; i < 4; i++) {
    addRow(list[i], i + 1, highlightId);
  }

  let newIndex = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === highlightId) {
      newIndex = i;
    }
  }

  addDots();
  if (newIndex >= 4) {
    addRow(list[newIndex], newIndex + 1, highlightId);
    addDots();
  }
}