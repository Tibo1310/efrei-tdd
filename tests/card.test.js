const Card = require('../src/card');

describe('Card', () => {
  describe('constructor', () => {
    test('should create a card with rank and suit', () => {
      const card = new Card('K', 'H');
      
      expect(card.rank).toBe('K');
      expect(card.suit).toBe('H');
    });

    test('should create a card with numeric rank', () => {
      const card = new Card('6', 'D');
      
      expect(card.rank).toBe('6');
      expect(card.suit).toBe('D');
    });

    test('should create a Ten card', () => {
      const card = new Card('T', 'C');
      
      expect(card.rank).toBe('T');
      expect(card.suit).toBe('C');
    });
  });

  describe('toString', () => {
    test('should return card notation', () => {
      const card = new Card('K', 'C');
      
      expect(card.toString()).toBe('KC');
    });

    test('should return card notation for Ten', () => {
      const card = new Card('T', 'H');
      
      expect(card.toString()).toBe('TH');
    });
  });
});
