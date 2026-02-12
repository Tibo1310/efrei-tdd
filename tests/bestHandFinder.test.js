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

    test('should find full house from 7 cards', () => {
      // 7 cartes contenant un full
      const cards = ['KH', 'KD', 'KC', '8S', '8H', '3D', '2C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('FULL_HOUSE');
      // brelan de rois + paire de 8
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['8', '8', 'K', 'K', 'K'].sort());
    });

    test('should find flush from 7 cards', () => {
      // 7 cartes contenant une flush
      const cards = ['AH', 'KH', 'QH', '6H', '3H', '2D', '5C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('FLUSH');
      // les 5 cartes de coeur les plus hautes
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['3', '6', 'A', 'K', 'Q'].sort());
    });

    test('should find straight from 7 cards', () => {
      // 7 cartes contenant une suite
      const cards = ['9D', '8C', '7S', '6H', '5D', '3H', '2C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT');
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['5', '6', '7', '8', '9'].sort());
    });

    test('should find wheel straight from 7 cards', () => {
      // 7 cartes contenant une roue (A-2-3-4-5)
      const cards = ['AH', '2C', '3S', '4D', '5H', 'KD', 'QC'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT');
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['2', '3', '4', '5', 'A'].sort());
    });

    test('should find three of a kind from 7 cards', () => {
      // 7 cartes contenant un brelan
      const cards = ['KH', 'KD', 'KC', 'AH', 'QD', '3C', '2S'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('THREE_OF_A_KIND');
      // brelan de rois + as et dame kickers
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['A', 'K', 'K', 'K', 'Q'].sort());
    });

    test('should find two pair from 7 cards', () => {
      // 7 cartes contenant deux paires
      const cards = ['KH', 'KD', '8C', '8H', 'AD', '3C', '2S'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('TWO_PAIR');
      // paire de rois + paire de 8 + as kicker
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['8', '8', 'A', 'K', 'K'].sort());
    });

    test('should find pair from 7 cards', () => {
      // 7 cartes contenant une paire
      const cards = ['KH', 'KD', 'AC', 'QH', 'JD', '3C', '2S'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('PAIR');
      // paire de rois + as, dame, valet kickers
      expect(result.hand.cards.map(c => c.rank).sort()).toEqual(['A', 'J', 'K', 'K', 'Q'].sort());
    });

    test('should choose best hand when multiple combinations exist', () => {
      // 7 cartes avec à la fois flush et suite (mais pas straight flush)
      const cards = ['AH', 'KH', 'QH', 'JH', '9H', 'TD', '8C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      // flush (rang 6) bat straight (rang 5)
      expect(result.category).toBe('FLUSH');
    });
  });
});
