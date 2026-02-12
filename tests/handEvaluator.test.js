const HandEvaluator = require('../src/handEvaluator');
const Hand = require('../src/hand');

describe('HandEvaluator', () => {
  describe('evaluate - High Card', () => {
    test('should detect high card', () => {
      // main sans combinaison : K, J, 8, 4, 2 de couleurs différentes
      const hand = Hand.fromStrings(['KD', 'JC', '8S', '4H', '2D']);
      const result = HandEvaluator.evaluate(hand);
      
      expect(result.category).toBe('HIGH_CARD');
      expect(result.rank).toBe(1); // rang 1 = catégorie la plus faible (pire main)
    });
  });
  describe('evaluate - One Pair', () => {
    test('should detect one pair', () => {
      // paire de 9
      const hand = Hand.fromStrings(['9H', '9D', 'KS', '6C', '2D']);
      const result = HandEvaluator.evaluate(hand);
      
      expect(result.category).toBe('PAIR');
      expect(result.rank).toBe(2);
    });
  });

  describe('evaluate - Two Pair', () => {
    test('should detect two pair', () => {
      // paire de Jack et paire de 4
      const hand = Hand.fromStrings(['JH', 'JD', '4S', '4C', 'AD']);
      const result = HandEvaluator.evaluate(hand);
      
      expect(result.category).toBe('TWO_PAIR');
      expect(result.rank).toBe(3);
    });
  });

  describe('evaluate - Three of a Kind', () => {
    test('should detect three of a kind', () => {
      // brelan de 8
      const hand = Hand.fromStrings(['8H', '8D', '8S', 'KC', '3D']);
      const result = HandEvaluator.evaluate(hand);
      
      expect(result.category).toBe('THREE_OF_A_KIND');
      expect(result.rank).toBe(4);
    });
  });

  describe('evaluate - Straight', () => {
    test('should detect straight', () => {
      // suite : 9-8-7-6-5
      const hand = Hand.fromStrings(['9H', '8D', '7S', '6C', '5D']);
      const result = HandEvaluator.evaluate(hand);
      
      expect(result.category).toBe('STRAIGHT');
      expect(result.rank).toBe(5);
    });

    test('should detect wheel (A-2-3-4-5)', () => {
      // roue : As-5-4-3-2 (suite spéciale où As vaut 1)
      const hand = Hand.fromStrings(['AH', '2D', '3S', '4C', '5D']);
      const result = HandEvaluator.evaluate(hand);
      
      expect(result.category).toBe('STRAIGHT');
      expect(result.rank).toBe(5);
    });
  });
});
