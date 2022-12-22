const generateDeck = () => {
    // creates a deck of 52 cards
    const deck = new Set();
    const faces = ['Jack', 'Queen', 'King', 'Ace'];
    const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

    // generate number cards
    for (let suit = 0; suit < suits.length; suit++) {
        for (let cardNumber = 2; cardNumber < 11; cardNumber++) {
            const card = {
                card: cardNumber,
                suit: suits[suit],
                value: cardNumber
            }
            deck.add(card);
        }
    }

    // generate face + ace cards
    for (let suit = 0; suit < suits.length; suit++) {
        for (let face = 0; face < faces.length; face++) {
            if (face === (faces.length - 1)) {
                const card = {
                    card: faces[face],
                    suit: suits[suit],
                    value: 1
                }
                deck.add(card);
                continue;
            }
            const card = {
                card: faces[face],
                suit: suits[suit],
                value: 10
            }
            deck.add(card);
        }
    }

    return deck
};

const getCard = (deck) => {
    // returns a random card from the current deck
    const randomNumber = Math.floor(Math.random() * deck.size);
    let i = 0;

    for (const card of deck) {
        if (i === randomNumber) {
            const randomCard = card;
            deck.delete(randomCard);
            return randomCard
        }
        i++;
    }
};

const getPointsAndDisplayCards = (currentCards) => {
    // returns the total points and a string of the current hand
    let displayCurrentCards = '';
    let currentPoints = 0;

    for (const card of currentCards) {
        currentPoints += card.value;
        displayCurrentCards += `card: ${card.card}, suit: ${card.suit}\n`;
    }

    return [currentPoints, displayCurrentCards]
};

const deck = generateDeck();
let turn = 0;
let player = new Set();
let playerPoints = 0;
let dealer = new Set();
let dealerPoints = 0;

// simulation
while (true) {
    // start of the game each person gets 2 cards
    if (turn === 0) {
        player.add(getCard(deck));
        player.add(getCard(deck));
        dealer.add(getCard(deck));
        dealer.add(getCard(deck));

        let playerPointsAndCards = getPointsAndDisplayCards(player);
        let dealerPointsAndCards = getPointsAndDisplayCards(dealer);
        playerPoints = playerPointsAndCards[0];
        dealerPoints = dealerPointsAndCards[0];
        console.log('Starting Player Hand:\n' + playerPointsAndCards[1] + `Starting Player Score: ${playerPoints}\n`);
        console.log('Starting Dealer Hand:\n' + dealerPointsAndCards[1] + `Starting Dealer Score: ${dealerPoints}\n`);

        // player goes first
        player.add(getCard(deck));
        playerPointsAndCards = getPointsAndDisplayCards(player);
        playerPoints = playerPointsAndCards[0];

        turn++;
    }

    // check if game is over and display results
    if (playerPoints > 21) {
        console.log(`You lose! Your final score was: ${playerPoints} while the dealer had ${dealerPoints}\n`);
        break;
    }  else if (dealerPoints === 21) {
        console.log(`You lose! Your final score was: ${playerPoints} while the dealer had ${dealerPoints}\n`);
        break;
    } else if (dealerPoints > 21) {
        console.log(`You win! Your final score was: ${playerPoints} while the dealer had ${dealerPoints}\n`);
        break;
    } else if (playerPoints === 21) {
        console.log(`You win! Your final score was: ${playerPoints} while the dealer had ${dealerPoints}\n`);
        break;
    }

    // adding a card to each person and updating their points
    if (turn % 2 != 0) {
        // dealer turn
        dealer.add(getCard(deck));
        let dealerPointsAndCards = getPointsAndDisplayCards(dealer);
        dealerPoints = dealerPointsAndCards[0];
    } else {
        // player turn
        player.add(getCard(deck));
        let playerPointsAndCards = getPointsAndDisplayCards(player);
        playerPoints = playerPointsAndCards[0];
    }

    turn++;
}

// display ending hands
const playerEndingHand = getPointsAndDisplayCards(player);
const dealerEndingHand = getPointsAndDisplayCards(dealer);
console.log(`Ending Player Hand:\n` + playerEndingHand[1]);
console.log(`Ending Dealer Hand:\n` + dealerEndingHand[1]);