const BestHandFinder = require('../src/bestHandFinder');

describe('BestHandFinder - chosen5 ordering', () => {
  describe('PAIR ordering', () => {
    test('should order pair first, then kickers descending', () => {
      // paire de rois + A, Q, J kickers
      const cards = ['KH', 'KD', 'AC', 'QH', 'JD', '3C', '2S'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('PAIR');
      // ordre attendu: K, K, A, Q, J
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks[0]).toBe('K');
      expect(ranks[1]).toBe('K');
      expect(ranks.slice(2).sort((a, b) => {
        const order = {'A': 14, 'Q': 12, 'J': 11};
        return order[b] - order[a];
      })).toEqual(['A', 'Q', 'J']);
    });
  });

  describe('TWO_PAIR ordering', () => {
    test('should order higher pair, lower pair, then kicker', () => {
      // paires de K et 8 + as kicker
      const cards = ['KH', 'KD', '8C', '8H', 'AD', '3C', '2S'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('TWO_PAIR');
      // ordre attendu: K, K, 8, 8, A
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks[0]).toBe('K');
      expect(ranks[1]).toBe('K');
      expect(ranks[2]).toBe('8');
      expect(ranks[3]).toBe('8');
      expect(ranks[4]).toBe('A');
    });
  });

  describe('THREE_OF_A_KIND ordering', () => {
    test('should order triplet first, then kickers descending', () => {
      // brelan de K + A, Q kickers
      const cards = ['KH', 'KD', 'KC', 'AH', 'QD', '3C', '2S'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('THREE_OF_A_KIND');
      // ordre attendu: K, K, K, A, Q
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks[0]).toBe('K');
      expect(ranks[1]).toBe('K');
      expect(ranks[2]).toBe('K');
      expect(ranks[3]).toBe('A');
      expect(ranks[4]).toBe('Q');
    });
  });

  describe('STRAIGHT ordering', () => {
    test('should order straight from highest to lowest', () => {
      // suite 9-high
      const cards = ['9D', '8C', '7S', '6H', '5D', '3H', '2C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT');
      // ordre attendu: 9, 8, 7, 6, 5
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['9', '8', '7', '6', '5']);
    });

    test('should order wheel as 5, 4, 3, 2, A', () => {
      // roue A-2-3-4-5
      const cards = ['AH', '2C', '3S', '4D', '5H', 'KD', 'QC'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT');
      // ordre attendu: 5, 4, 3, 2, A (ace low)
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['5', '4', '3', '2', 'A']);
    });
  });

  describe('FLUSH ordering', () => {
    test('should order flush cards descending by rank', () => {
      // flush de coeurs
      const cards = ['AH', 'KH', 'QH', '6H', '3H', '2D', '5C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('FLUSH');
      // ordre attendu: A, K, Q, 6, 3 (descending)
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['A', 'K', 'Q', '6', '3']);
    });
  });

  describe('FULL_HOUSE ordering', () => {
    test('should order triplet first, then pair', () => {
      // full de K et 8
      const cards = ['KH', 'KD', 'KC', '8S', '8H', '3D', '2C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('FULL_HOUSE');
      // ordre attendu: K, K, K, 8, 8
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks[0]).toBe('K');
      expect(ranks[1]).toBe('K');
      expect(ranks[2]).toBe('K');
      expect(ranks[3]).toBe('8');
      expect(ranks[4]).toBe('8');
    });
  });

  describe('FOUR_OF_A_KIND ordering', () => {
    test('should order quad first, then kicker', () => {
      // carré de K + as kicker
      const cards = ['KH', 'KD', 'KC', 'KS', 'AH', '3D', '2C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('FOUR_OF_A_KIND');
      // ordre attendu: K, K, K, K, A
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks[0]).toBe('K');
      expect(ranks[1]).toBe('K');
      expect(ranks[2]).toBe('K');
      expect(ranks[3]).toBe('K');
      expect(ranks[4]).toBe('A');
    });
  });

  describe('STRAIGHT_FLUSH ordering', () => {
    test('should order straight flush from highest to lowest', () => {
      // straight flush 9-high
      const cards = ['9D', '8D', '7D', '6D', '5D', '4D', '2H'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT_FLUSH');
      // ordre attendu: 9, 8, 7, 6, 5
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['9', '8', '7', '6', '5']);
    });
  });

  describe('HIGH_CARD ordering', () => {
    test('should order cards descending by rank', () => {
      // high card A-high
      const cards = ['AH', 'KD', 'QC', 'JS', '9H', '7D', '3C'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('HIGH_CARD');
      // ordre attendu: A, K, Q, J, 9 (descending)
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['A', 'K', 'Q', 'J', '9']);
    });
  });
});
