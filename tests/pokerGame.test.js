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
});
