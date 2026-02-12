const PokerGame = require('../src/pokerGame');

describe('PokerGame', () => {
  describe('determineWinners', () => {
    test('should determine single winner with better hand', () => {
      // joueur 1 a une paire, joueur 2 a high card
      const players = [
        { name: 'Alice', holeCards: ['AH', 'AD'] },
        { name: 'Bob', holeCards: ['KC', 'QS'] }
      ];
      const board = ['2H', '5D', '7C', '9S', 'JH'];
      
      const result = PokerGame.determineWinners(players, board);
      
      expect(result.winners).toEqual(['Alice']);
      expect(result.winningHand.category).toBe('PAIR');
    });

    test('should determine winner with higher category', () => {
      // joueur 1 a flush, joueur 2 a straight
      const players = [
        { name: 'Alice', holeCards: ['AH', 'KH'] },
        { name: 'Bob', holeCards: ['TD', '8C'] }
      ];
      const board = ['QH', 'JH', '9H', '7S', '6D'];
      
      const result = PokerGame.determineWinners(players, board);
      
      expect(result.winners).toEqual(['Alice']);
      expect(result.winningHand.category).toBe('FLUSH');
    });

    test('should work with 3 players', () => {
      // alice a brelan, bob a paire, charlie a high card
      const players = [
        { name: 'Alice', holeCards: ['KH', 'KD'] },
        { name: 'Bob', holeCards: ['QC', 'QS'] },
        { name: 'Charlie', holeCards: ['9H', '8D'] }
      ];
      const board = ['KC', '3H', '5D', '7C', 'AS'];
      
      const result = PokerGame.determineWinners(players, board);
      
      expect(result.winners).toEqual(['Alice']);
      expect(result.winningHand.category).toBe('THREE_OF_A_KIND');
    });
  });

  describe('determineWinners - split pot', () => {
    test('should handle tie with identical hands', () => {
      // les deux joueurs ont la même main sur le board
      const players = [
        { name: 'Alice', holeCards: ['2H', '3D'] },
        { name: 'Bob', holeCards: ['4C', '5S'] }
      ];
      const board = ['AH', 'KD', 'QC', 'JS', '9H'];
      
      const result = PokerGame.determineWinners(players, board);
      
      expect(result.winners).toEqual(['Alice', 'Bob']);
      expect(result.winningHand.category).toBe('HIGH_CARD');
    });

    test('should handle tie with same pair', () => {
      // les deux joueurs ont paire d'as avec mêmes kickers
      const players = [
        { name: 'Alice', holeCards: ['AH', '2D'] },
        { name: 'Bob', holeCards: ['AD', '3C'] }
      ];
      const board = ['AC', 'KH', 'QD', 'JS', '9H'];
      
      const result = PokerGame.determineWinners(players, board);
      
      expect(result.winners).toEqual(['Alice', 'Bob']);
      expect(result.winningHand.category).toBe('PAIR');
    });

    test('should handle tie with same straight', () => {
      // les deux joueurs ont la même suite
      const players = [
        { name: 'Alice', holeCards: ['9H', '2D'] },
        { name: 'Bob', holeCards: ['9C', '3S'] }
      ];
      const board = ['8D', '7H', '6C', '5S', 'KH'];
      
      const result = PokerGame.determineWinners(players, board);
      
      expect(result.winners).toEqual(['Alice', 'Bob']);
      expect(result.winningHand.category).toBe('STRAIGHT');
    });

    test('should handle 3-way tie', () => {
      // trois joueurs partagent le pot
      const players = [
        { name: 'Alice', holeCards: ['2H', '3D'] },
        { name: 'Bob', holeCards: ['4C', '5S'] },
        { name: 'Charlie', holeCards: ['6H', '7D'] }
      ];
      const board = ['AH', 'KD', 'QC', 'JS', '9H'];
      
      const result = PokerGame.determineWinners(players, board);
      
      expect(result.winners).toEqual(['Alice', 'Bob', 'Charlie']);
      expect(result.winningHand.category).toBe('HIGH_CARD');
    });
  });
});
