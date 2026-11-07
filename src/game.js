const gameForm = document.getElementById('game-form');
const cardsInput = document.getElementById('cards-number');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const playBtn = document.getElementById('play-btn');
const timer = document.getElementById('timer');

let seconds = 0;
let timerInterval = null;

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

export function initGame() {
  gameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardsNumber = Number(cardsInput.value);

    if (!Number.isInteger(cardsNumber) || cardsNumber <= 0 || cardsNumber % 2 !== 0) {
      showError('El número de cartas debe ser un número entero, positivo y par.');
      return;
    }

    playBtn.textContent = 'Volver a jugar';
    startTimer();
  });
}