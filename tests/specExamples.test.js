const BestHandFinder = require('../src/bestHandFinder');

describe('BestHandFinder - spec examples', () => {
  describe('Example A - Ace-low straight (wheel)', () => {
    test('should find wheel from board + hole cards', () => {
      // board: A♣ 2♦ 3♥ 4♠ 9♦, player: 5♣ K♦
      const cards = ['AC', '2D', '3H', '4S', '9D', '5C', 'KD'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT');
      // chosen5 (ordered): 5, 4, 3, 2, A
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['5', '4', '3', '2', 'A']);
    });
  });

  describe('Example B - Ace-high straight', () => {
    test('should find ace-high straight', () => {
      // board: 10♣ J♦ Q♥ K♠ 2♦, player: A♣ 3♦
      const cards = ['TC', 'JD', 'QH', 'KS', '2D', 'AC', '3D'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('STRAIGHT');
      // chosen5: A, K, Q, J, T (descending)
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['A', 'K', 'Q', 'J', 'T']);
    });
  });

  describe('Example C - Flush with more than 5 suited cards', () => {
    test('should choose best 5 hearts when 6 hearts available', () => {
      // board: A♥ J♥ 9♥ 4♥ 2♣, player: 6♥ K♦
      const cards = ['AH', 'JH', '9H', '4H', '2C', '6H', 'KD'];
      
      const result = BestHandFinder.findBestHand(cards);
      
      expect(result.category).toBe('FLUSH');
      // chosen5: A♥ J♥ 9♥ 6♥ 4♥ (best 5 hearts, descending)
      const ranks = result.hand.cards.map(c => c.rank);
      expect(ranks).toEqual(['A', 'J', '9', '6', '4']);
      // toutes les cartes doivent être des coeurs
      result.hand.cards.forEach(card => {
        expect(card.suit).toBe('H');
      });
    });
  });

  describe('Example D - Board plays (tie)', () => {
    test('should result in tie when both players use only board', () => {
      // board: 5♣ 6♦ 7♥ 8♠ 9♦
      const board = ['5C', '6D', '7H', '8S', '9D'];
      
      // player1: A♣ A♦
      const player1Cards = [...board, 'AC', 'AD'];
      const result1 = BestHandFinder.findBestHand(player1Cards);
      
      // player2: K♣ Q♦
      const player2Cards = [...board, 'KC', 'QD'];
      const result2 = BestHandFinder.findBestHand(player2Cards);
      
      // les deux ont une suite 9-high
      expect(result1.category).toBe('STRAIGHT');
      expect(result2.category).toBe('STRAIGHT');
      
      // chosen5: 9, 8, 7, 6, 5 (pour les deux)
      const ranks1 = result1.hand.cards.map(c => c.rank);
      const ranks2 = result2.hand.cards.map(c => c.rank);
      expect(ranks1).toEqual(['9', '8', '7', '6', '5']);
      expect(ranks2).toEqual(['9', '8', '7', '6', '5']);
    });
  });

  describe('Example E - Quads on board, kicker decides', () => {
    test('should choose best kicker when quads on board', () => {
      // board: 7♣ 7♦ 7♥ 7♠ 2♦
      const board = ['7C', '7D', '7H', '7S', '2D'];
      
      // player1: A♣ K♣
      const player1Cards = [...board, 'AC', 'KC'];
      const result1 = BestHandFinder.findBestHand(player1Cards);
      
      // player2: Q♣ J♣
      const player2Cards = [...board, 'QC', 'JC'];
      const result2 = BestHandFinder.findBestHand(player2Cards);
      
      // les deux ont four of a kind
      expect(result1.category).toBe('FOUR_OF_A_KIND');
      expect(result2.category).toBe('FOUR_OF_A_KIND');
      
      // player1 a le meilleur kicker (A)
      const ranks1 = result1.hand.cards.map(c => c.rank);
      const ranks2 = result2.hand.cards.map(c => c.rank);
      
      expect(ranks1).toEqual(['7', '7', '7', '7', 'A']);
      expect(ranks2).toEqual(['7', '7', '7', '7', 'Q']);
    });
  });
});
