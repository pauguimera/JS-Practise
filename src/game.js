import { getPokemonImage } from './pokeapi.js';

const gameForm = document.getElementById('game-form');
const cardsInput = document.getElementById('cards-number');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const playBtn = document.getElementById('play-btn');
const timer = document.getElementById('timer');
const gameBoard = document.getElementById('game-board');

const MAX_POKEMON = 151;

let seconds = 0;
let timerInterval = null;
let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 0;

function showError(message) {
  modalMessage.textContent = message;
  modal.showModal();
}

function updateTimer() {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  timer.textContent = `${minutes}m ${rest}s`;
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  updateTimer();
  timerInterval = setInterval(function () {
    seconds++;
    updateTimer();
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

function getRandomIds(amount) {
  const ids = [];
  while (ids.length < amount) {
    const id = Math.floor(Math.random() * MAX_POKEMON) + 1;
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }
  return ids;
}

function shuffle(array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}

function flipCard(card) {
  card.classList.add('flipped');
  card.style.backgroundImage = `url(${card.dataset.image})`;
}

function unflipCard(card) {
  card.classList.remove('flipped');
  card.style.backgroundImage = '';
}

function handleCardClick(event) {
  const card = event.target;

  if (lockBoard || card.classList.contains('flipped')) {
    return;
  }

  flipCard(card);

  if (firstCard === null) {
    firstCard = card;
    return;
  }

  const secondCard = card;

  if (firstCard.dataset.id === secondCard.dataset.id) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard = null;
    matchedPairs++;

    if (matchedPairs === totalPairs) {
      stopTimer();
    }
  } else {
    lockBoard = true;
    const previousCard = firstCard;
    firstCard = null;
    setTimeout(function () {
      unflipCard(previousCard);
      unflipCard(secondCard);
      lockBoard = false;
    }, 1000);
  }
}

async function createBoard(cardsNumber) {
  gameBoard.textContent = '';
  firstCard = null;
  lockBoard = false;
  matchedPairs = 0;
  totalPairs = cardsNumber / 2;

  const ids = getRandomIds(totalPairs);

  const images = {};
  for (const id of ids) {
    images[id] = await getPokemonImage(id);
  }

  const cards = shuffle(ids.concat(ids));

  for (const id of cards) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = id;
    card.dataset.image = images[id];
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  }
}

export function initGame() {
  gameForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const cardsNumber = Number(cardsInput.value);

    if (
      !Number.isInteger(cardsNumber) ||
      cardsNumber <= 0 ||
      cardsNumber % 2 !== 0 ||
      cardsNumber > MAX_POKEMON * 2
    ) {
      showError(`El número de cartas debe ser un número entero, positivo, par y como máximo ${MAX_POKEMON * 2}.`);
      return;
    }

    stopTimer();
    playBtn.disabled = true;
    playBtn.textContent = 'Volver a jugar';
    await createBoard(cardsNumber);
    playBtn.disabled = false;
    startTimer();
  });
}