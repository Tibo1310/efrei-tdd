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
});
