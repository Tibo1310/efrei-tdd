
// évalue une main de poker et détermine sa catégorie
class HandEvaluator {
  // évalue une main + retourne sa catégorie avec son rang
  // retourne : { category: string, rank: number }
  static evaluate(hand) {
    const cards = hand.cards;
    
    // compte combien de fois chaque rang apparaît
    const rankCounts = this.getRankCounts(cards);
    const counts = Object.values(rankCounts).sort((a, b) => b - a);
    
    // vérifie si c'est une couleur (5 cartes avec la même couleur)
    const isFlush = this.isFlush(cards);
    
    // vérifie si c'est une suite (5 rangs consécutifs)
    const isStraight = this.isStraight(cards);
    
    // couleur : 5 cartes de même couleur
    if (isFlush) {
      return { category: 'FLUSH', rank: 6 };
    }
    
    // suite : 5 rangs consécutifs
    if (isStraight) {
      return { category: 'STRAIGHT', rank: 5 };
    }
    
    // brelan : 3 cartes identiques
    if (counts[0] === 3) {
      return { category: 'THREE_OF_A_KIND', rank: 4 };
    }
    
    // double paire : 2 paires
    if (counts[0] === 2 && counts[1] === 2) {
      return { category: 'TWO_PAIR', rank: 3 };
    }
    
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

  // vérifie si toutes les cartes ont la même couleur
  // retourne : true si c'est une couleur
  static isFlush(cards) {
    const firstSuit = cards[0].suit;
    return cards.every(card => card.suit === firstSuit);
  }

  // vérifie si les cartes forment une suite
  // si c'est une suite => true
  static isStraight(cards) {
    // convertit les rangs en valeurs numériques pour les comparer
    const rankValues = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    
    const values = cards.map(card => rankValues[card.rank]).sort((a, b) => a - b);
    
    // suite normale : chaque carte = précédente + 1
    const isNormalStraight = values.every((val, i) => {
      if (i === 0) return true;
      return val === values[i - 1] + 1;
    });
    
    if (isNormalStraight) return true;
    
    // cas spécial : roue (A-2-3-4-5) où l'As vaut 1
    const isWheel = values[0] === 2 && values[1] === 3 && values[2] === 4 && 
                    values[3] === 5 && values[4] === 14;
    
    return isWheel;
  }
}

module.exports = HandEvaluator;
