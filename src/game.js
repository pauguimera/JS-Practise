const gameForm = document.getElementById('game-form');
const cardsInput = document.getElementById('cards-number');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');

function showError(message) {
  modalMessage.textContent = message;
  modal.showModal();
}

export function initGame() {
  gameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardsNumber = Number(cardsInput.value);

    if (!Number.isInteger(cardsNumber) || cardsNumber <= 0 || cardsNumber % 2 !== 0) {
      showError('El número de cartas debe ser un número entero, positivo y par.');
      return;
    }

    console.log('Partida con', cardsNumber, 'cartas');
  });
}