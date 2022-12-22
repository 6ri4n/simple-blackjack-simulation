const generate_deck = () => {
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

const deck = generate_deck();

console.log(deck);

