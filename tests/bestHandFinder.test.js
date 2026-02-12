const BestHandFinder = require('../src/bestHandFinder');

describe('BestHandFinder', () => {
  describe('generateCombinations', () => {
    test('should generate all C(7,5) = 21 combinations from 7 cards', () => {
      const cards = ['AH', 'KD', 'QC', 'JS', '9H', '7D', '3C'];
      
      const combinations = BestHandFinder.generateCombinations(cards, 5);
      
      expect(combinations.length).toBe(21);
    });

    test('should generate correct combinations', () => {
      const cards = ['A', 'B', 'C', 'D'];
      
      const combinations = BestHandFinder.generateCombinations(cards, 2);
      
      expect(combinations.length).toBe(6);
      expect(combinations).toContainEqual(['A', 'B']);
      expect(combinations).toContainEqual(['A', 'C']);
      expect(combinations).toContainEqual(['A', 'D']);
      expect(combinations).toContainEqual(['B', 'C']);
      expect(combinations).toContainEqual(['B', 'D']);
      expect(combinations).toContainEqual(['C', 'D']);
    });
  });
});
