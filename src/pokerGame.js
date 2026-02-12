const BestHandFinder = require('./bestHandFinder');
const HandComparator = require('./handComparator');

// gère une partie de poker texas hold'em multi-joueurs
class PokerGame {
  // détermine un ou plusieurs winners parmi plusieurs joueurs
  // retourne { 
  //   winners: ['nom1', 'nom2'], 
  //   winningHand: { category, rank, hand },
  //   players: [{ name, category, rank, hand }, ...]
  // }
  static determineWinners(players, board) {
    // évalue la meilleure main de chaque joueur
    const playerHands = players.map(player => {
      const allCards = [...player.holeCards, ...board];
      const bestHand = BestHandFinder.findBestHand(allCards);
      return {
        name: player.name,
        ...bestHand
      };
    });
    
    // trouve la meilleure main globale
    let bestPlayers = [playerHands[0]];
    
    for (let i = 1; i < playerHands.length; i++) {
      const comparison = HandComparator.compare(
        playerHands[i].hand,
        bestPlayers[0].hand
      );
      
      if (comparison > 0) {
        // nouvelle meilleure main
        bestPlayers = [playerHands[i]];
      } else if (comparison === 0) {
        // égalité : ajoute à la liste des gagnants
        bestPlayers.push(playerHands[i]);
      }
    }
    
    return {
      winners: bestPlayers.map(p => p.name),
      winningHand: {
        category: bestPlayers[0].category,
        rank: bestPlayers[0].rank,
        hand: bestPlayers[0].hand
      },
      players: playerHands
    };
  }
}

module.exports = PokerGame;
