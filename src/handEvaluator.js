
// évalue une main de poker et détermine sa catégorie
class HandEvaluator {
  // évalue une main + retourne sa catégorie avec son rang
  // retourne : { category: string, rank: number }
  static evaluate(hand) {
    const cards = hand.cards;
    
    // compte combien de fois chaque rang apparaît
    const rankCounts = this.getRankCounts(cards);
    const counts = Object.values(rankCounts).sort((a, b) => b - a);
    
    // paire : 2 cartes identiques
    if (counts[0] === 2) {
      return { category: 'PAIR', rank: 2 };
    }
    
    // carte haute : aucune combinaison
    return { category: 'HIGH_CARD', rank: 1 };
  }

  // compte combien de fois chaque rang apparaît
  // retourne : dictionnaire { rang: nombre_occurrences }
  static getRankCounts(cards) {
    const counts = {};
    for (const card of cards) {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    }
    return counts;
  }
}

module.exports = HandEvaluator;
