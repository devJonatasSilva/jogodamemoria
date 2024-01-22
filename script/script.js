const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = cardValue;
    card.addEventListener('click', flipCard);
    return card;
}

function initializeGame() {
    const shuffledCards = shuffle(cards);
    const memoryGame = document.getElementById('memoryGame');

    shuffledCards.forEach(cardValue => {
        const card = createCard(cardValue);
        memoryGame.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.innerHTML === card2.innerHTML;

    isMatch ? handleMatch() : resetCards();
}

function handleMatch() {
    flippedCards.forEach(card => {
        card.removeEventListener('click', flipCard);
        card.classList.add('matched');
        matchedCards.push(card);
    });

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        alert('Parabéns! Você venceu!');
    }
}

function resetCards() {
    flippedCards.forEach(card => card.classList.remove('flipped'));
    flippedCards = [];
}

window.onload = initializeGame;
