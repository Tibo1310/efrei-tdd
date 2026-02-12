const HandComparator = require('../src/handComparator');
const Hand = require('../src/hand');

describe('HandComparator', () => {
  describe('compare - High Card', () => {
    test('should compare high cards by highest card', () => {
      // King high bat Queen high
      const hand1 = Hand.fromStrings(['KD', 'JC', '8S', '4H', '2D']);
      const hand2 = Hand.fromStrings(['QD', 'JC', '8S', '4H', '2D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare high cards by kickers if highest is same', () => {
      // K-J-9 bat K-J-8 (kicker 9 > 8)
      const hand1 = Hand.fromStrings(['KD', 'JC', '9S', '5H', '2D']);
      const hand2 = Hand.fromStrings(['KH', 'JS', '8D', '5C', '2H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical high card hands', () => {
      // K-J-9-5-2 égalité
      const hand1 = Hand.fromStrings(['KD', 'JC', '9S', '5H', '2D']);
      const hand2 = Hand.fromStrings(['KH', 'JS', '9D', '5C', '2H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Pair', () => {
    test('should compare pairs by pair rank', () => {
      // paire de Rois bat paire de 9
      const hand1 = Hand.fromStrings(['KD', 'KC', '8S', '4H', '2D']);
      const hand2 = Hand.fromStrings(['9D', '9C', 'AS', '4H', '2D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare pairs by kickers if pair rank is same', () => {
      // 9-9-A-5-3 bat 9-9-A-5-2 (kicker 3 > 2)
      const hand1 = Hand.fromStrings(['9D', '9C', 'AS', '5H', '3D']);
      const hand2 = Hand.fromStrings(['9H', '9S', 'AD', '5C', '2H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical pairs', () => {
      // 9-9-A-5-3 égalité
      const hand1 = Hand.fromStrings(['9D', '9C', 'AS', '5H', '3D']);
      const hand2 = Hand.fromStrings(['9H', '9S', 'AD', '5C', '3H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Two Pair', () => {
    test('should compare two pairs by higher pair', () => {
      // K-K-5-5 bat Q-Q-9-9 (paire haute K > Q)
      const hand1 = Hand.fromStrings(['KD', 'KC', '5S', '5H', '2D']);
      const hand2 = Hand.fromStrings(['QD', 'QC', '9S', '9H', '2D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare two pairs by lower pair if higher is same', () => {
      // K-K-7-7 bat K-K-6-6 (paire basse 7 > 6)
      const hand1 = Hand.fromStrings(['KD', 'KC', '7S', '7H', '2D']);
      const hand2 = Hand.fromStrings(['KH', 'KS', '6D', '6C', '2H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare two pairs by kicker if both pairs are same', () => {
      // K-K-7-7-A bat K-K-7-7-Q (kicker A > Q)
      const hand1 = Hand.fromStrings(['KD', 'KC', '7S', '7H', 'AD']);
      const hand2 = Hand.fromStrings(['KH', 'KS', '7D', '7C', 'QH']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical two pairs', () => {
      // K-K-7-7-A égalité
      const hand1 = Hand.fromStrings(['KD', 'KC', '7S', '7H', 'AD']);
      const hand2 = Hand.fromStrings(['KH', 'KS', '7D', '7C', 'AH']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Three of a Kind', () => {
    test('should compare three of a kind by triplet rank', () => {
      // 9-9-9 bat 7-7-7
      const hand1 = Hand.fromStrings(['9D', '9C', '9S', 'KH', '2D']);
      const hand2 = Hand.fromStrings(['7D', '7C', '7S', 'AH', '2D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare three of a kind by kickers if triplet is same', () => {
      // 9-9-9-A-5 bat 9-9-9-K-5 (kicker A > K)
      const hand1 = Hand.fromStrings(['9D', '9C', '9S', 'AH', '5D']);
      const hand2 = Hand.fromStrings(['9H', '9S', '9D', 'KH', '5C']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical three of a kind', () => {
      // 9-9-9-A-5 égalité
      const hand1 = Hand.fromStrings(['9D', '9C', '9S', 'AH', '5D']);
      const hand2 = Hand.fromStrings(['9H', '9S', '9D', 'AC', '5H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Straight', () => {
    test('should compare straights by highest card', () => {
      // 9-high straight bat 7-high straight
      const hand1 = Hand.fromStrings(['9D', '8C', '7S', '6H', '5D']);
      const hand2 = Hand.fromStrings(['7D', '6C', '5S', '4H', '3D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should treat wheel (A-2-3-4-5) as 5-high straight', () => {
      // 6-high straight bat wheel (5-high)
      const hand1 = Hand.fromStrings(['6D', '5C', '4S', '3H', '2D']);
      const hand2 = Hand.fromStrings(['AH', '2C', '3S', '4D', '5H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical straights', () => {
      // 9-high straight égalité
      const hand1 = Hand.fromStrings(['9D', '8C', '7S', '6H', '5D']);
      const hand2 = Hand.fromStrings(['9H', '8S', '7D', '6C', '5H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Flush', () => {
    test('should compare flushes by highest card', () => {
      // flush avec as bat flush avec roi
      const hand1 = Hand.fromStrings(['AH', 'JH', '9H', '6H', '3H']);
      const hand2 = Hand.fromStrings(['KD', 'QD', 'TD', '7D', '4D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare flushes card by card when highest is equal', () => {
      // même carte haute, on compare la 2e, puis 3e, etc.
      const hand1 = Hand.fromStrings(['AH', 'JH', '8H', '6H', '3H']);
      const hand2 = Hand.fromStrings(['AD', 'JD', '7D', '6D', '3D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne (8 > 7)
    });

    test('should return 0 for identical flushes', () => {
      // flush identiques en rangs
      const hand1 = Hand.fromStrings(['AH', 'JH', '9H', '6H', '3H']);
      const hand2 = Hand.fromStrings(['AD', 'JD', '9D', '6D', '3D']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Full House', () => {
    test('should compare full houses by three of a kind first', () => {
      // full (brelan de rois) bat full (brelan de 10)
      const hand1 = Hand.fromStrings(['KH', 'KD', 'KC', '3S', '3H']);
      const hand2 = Hand.fromStrings(['TH', 'TD', 'TC', 'AS', 'AH']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare full houses by pair when three of a kind is equal', () => {
      // full (brelan de rois + paire de 8) bat full (brelan de rois + paire de 3)
      const hand1 = Hand.fromStrings(['KH', 'KD', 'KC', '8S', '8H']);
      const hand2 = Hand.fromStrings(['KS', 'KC', 'KH', '3D', '3C']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical full houses', () => {
      // full identiques
      const hand1 = Hand.fromStrings(['KH', 'KD', 'KC', '8S', '8H']);
      const hand2 = Hand.fromStrings(['KS', 'KC', 'KH', '8D', '8C']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Four of a Kind', () => {
    test('should compare four of a kind by quad rank', () => {
      // carré de rois bat carré de 10
      const hand1 = Hand.fromStrings(['KH', 'KD', 'KC', 'KS', '3H']);
      const hand2 = Hand.fromStrings(['TH', 'TD', 'TC', 'TS', 'AH']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should compare four of a kind by kicker when quad is equal', () => {
      // carré de rois + as bat carré de rois + 3
      const hand1 = Hand.fromStrings(['KH', 'KD', 'KC', 'KS', 'AH']);
      const hand2 = Hand.fromStrings(['KH', 'KD', 'KC', 'KS', '3H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical four of a kind', () => {
      // carré identiques
      const hand1 = Hand.fromStrings(['KH', 'KD', 'KC', 'KS', 'AH']);
      const hand2 = Hand.fromStrings(['KH', 'KD', 'KC', 'KS', 'AD']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });

  describe('compare - Straight Flush', () => {
    test('should compare straight flushes by highest card', () => {
      // 9-high straight flush bat 7-high straight flush
      const hand1 = Hand.fromStrings(['9D', '8D', '7D', '6D', '5D']);
      const hand2 = Hand.fromStrings(['7H', '6H', '5H', '4H', '3H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should treat straight flush wheel as 5-high', () => {
      // 6-high straight flush bat wheel straight flush
      const hand1 = Hand.fromStrings(['6D', '5D', '4D', '3D', '2D']);
      const hand2 = Hand.fromStrings(['AH', '2H', '3H', '4H', '5H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(1); // hand1 gagne
    });

    test('should return 0 for identical straight flushes', () => {
      // straight flush identiques
      const hand1 = Hand.fromStrings(['9D', '8D', '7D', '6D', '5D']);
      const hand2 = Hand.fromStrings(['9H', '8H', '7H', '6H', '5H']);
      
      const result = HandComparator.compare(hand1, hand2);
      
      expect(result).toBe(0); // égalité
    });
  });
});
