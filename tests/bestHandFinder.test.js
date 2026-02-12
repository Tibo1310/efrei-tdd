const BestHandFinder = require('../src/bestHandFinder');
const Hand = require('../src/hand');

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

  describe('findBestHand', () => {
    test('should find straight flush from 7 cards', () => {
      // 7 cartes contenant une straight flush
      const cards = ['9D', '8D', '7D', '6D', '5D', '4D', '2H'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT_FLUSH');
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['5', '6', '7', '8', '9'].sort());
    });

    test('should find four of a kind from 7 cards', () => {
      // 7 cartes contenant un carré
      const cards = ['KH', 'KD', 'KC', 'KS', 'AH', '3D', '2C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('FOUR_OF_A_KIND');
      // carré de rois + as kicker
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['A', 'K', 'K', 'K', 'K'].sort());
    });

    test('should find high card from 7 cards', () => {
      // 7 cartes sans combinaison
      const cards = ['AH', 'KD', 'QC', 'JS', '9H', '7D', '3C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('HIGH_CARD');
      // as, roi, dame, valet, 9
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['9', 'A', 'J', 'K', 'Q'].sort());
    });
  });
});
