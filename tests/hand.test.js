const Hand = require('../src/hand');
const Card = require('../src/card');

describe('Hand', () => {
  describe('constructor', () => {
    test('should create a hand with 5 cards', () => {
      // Création d'une main de 5 cartes
      const cards = [
        new Card('9', 'D'),
        new Card('5', 'C'),
        new Card('3', 'S'),
        new Card('K', 'H'),
        new Card('2', 'D')
      ];
      
      const hand = new Hand(cards);
      
      // vérifie que la main contient bien 5 cartes
      expect(hand.cards).toEqual(cards);
      expect(hand.cards.length).toBe(5);
    });

    test('should create a hand from card strings', () => {
      // création d'une main à partir de chaines (ex: "7H", "4S")
      const cardStrings = ['7H', '4S', '6D', '8C', 'JH'];
      const hand = Hand.fromStrings(cardStrings);
      
      expect(hand.cards.length).toBe(5);
      // Première carte = 7 de Coeur (7H)
      expect(hand.cards[0].rank).toBe('7');
      expect(hand.cards[0].suit).toBe('H');
      // Dernière carte = Valet de Coeur (JH)
      expect(hand.cards[4].rank).toBe('J');
      expect(hand.cards[4].suit).toBe('H');
    });
  });

  describe('toString', () => {
    test('should return string representation of hand', () => {
      const hand = Hand.fromStrings(['3H', '8S', '6D', '2C', 'QH']);
      
      // resultat attendu : cartes séparées par des espaces
      expect(hand.toString()).toBe('3H 8S 6D 2C QH');
    });
  });
});
