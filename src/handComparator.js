const HandEvaluator = require('./handEvaluator');

// compare deux mains de poker
class HandComparator {
  // compare deux mains
  // retourne : 1 si hand1 gagne, -1 si hand2 gagne, 0 si égalité
  static compare(hand1, hand2) {
    const eval1 = HandEvaluator.evaluate(hand1);
    const eval2 = HandEvaluator.evaluate(hand2);
    
    // compare d'abord les catégories (rank)
    if (eval1.rank > eval2.rank) return 1;
    if (eval1.rank < eval2.rank) return -1;
    
    // même catégorie : utilise les règles de tie-break
    return this.compareByCategory(hand1, hand2, eval1.category);
  }

  // compare deux mains de même catégorie
  static compareByCategory(hand1, hand2, category) {
    if (category === 'HIGH_CARD') {
      return this.compareHighCard(hand1, hand2);
    }
    
    // pour l'instant, autres catégories = égalité
    return 0;
  }

  // compare deux high card mains
  // compare les cartes en ordre décroissant
  static compareHighCard(hand1, hand2) {
    const values1 = this.getCardValues(hand1.cards).sort((a, b) => b - a);
    const values2 = this.getCardValues(hand2.cards).sort((a, b) => b - a);
    
    // compare chaque carte en ordre décroissant
    for (let i = 0; i < 5; i++) {
      if (values1[i] > values2[i]) return 1;
      if (values1[i] < values2[i]) return -1;
    }
    
    return 0; // égalité
  }

  // convertit les cartes en valeurs numériques
  static getCardValues(cards) {
    const rankValues = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    
    return cards.map(card => rankValues[card.rank]);
  }
}

module.exports = HandComparator;
