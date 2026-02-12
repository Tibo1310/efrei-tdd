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
});
