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
    
    if (category === 'PAIR') {
      return this.comparePair(hand1, hand2);
    }

    if (category === 'TWO_PAIR') {
      return this.compareTwoPair(hand1, hand2);
    }

    if (category === 'THREE_OF_A_KIND') {
      return this.compareThreeOfAKind(hand1, hand2);
    }

    if (category === 'STRAIGHT') {
      return this.compareStraight(hand1, hand2);
    }

    if (category === 'FLUSH') {
      return this.compareFlush(hand1, hand2);
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

  // compare deux paires
  // compare rang de la paire, puis kickers
  static comparePair(hand1, hand2) {
    const values1 = this.getCardValues(hand1.cards);
    const values2 = this.getCardValues(hand2.cards);
    
    // trouve le rang de la paire et les kickers
    const pair1 = this.findPairAndKickers(values1);
    const pair2 = this.findPairAndKickers(values2);
    
    // compare le rang de la paire
    if (pair1.pairRank > pair2.pairRank) return 1;
    if (pair1.pairRank < pair2.pairRank) return -1;
    
    // paires égales : compare les kickers en ordre décroissant
    for (let i = 0; i < pair1.kickers.length; i++) {
      if (pair1.kickers[i] > pair2.kickers[i]) return 1;
      if (pair1.kickers[i] < pair2.kickers[i]) return -1;
    }
    
    return 0; // egalite
  }

  // compare deux doubles paires
  // compare paire haute, puis paire basse, puis kicker
  static compareTwoPair(hand1, hand2) {
    const values1 = this.getCardValues(hand1.cards);
    const values2 = this.getCardValues(hand2.cards);
    
    // trouve les deux paires et le kicker
    const twoPair1 = this.findTwoPairsAndKicker(values1);
    const twoPair2 = this.findTwoPairsAndKicker(values2);
    
    // compare la paire haute
    if (twoPair1.highPair > twoPair2.highPair) return 1;
    if (twoPair1.highPair < twoPair2.highPair) return -1;
    
    // paire haute égale : compare la paire basse
    if (twoPair1.lowPair > twoPair2.lowPair) return 1;
    if (twoPair1.lowPair < twoPair2.lowPair) return -1;
    
    // deux paires égales : compare le kicker
    if (twoPair1.kicker > twoPair2.kicker) return 1;
    if (twoPair1.kicker < twoPair2.kicker) return -1;
    
    return 0; // égalité
  }

  // compare deux brelans
  // compare rang du brelan, puis kickers
  static compareThreeOfAKind(hand1, hand2) {
    const values1 = this.getCardValues(hand1.cards);
    const values2 = this.getCardValues(hand2.cards);
    
    // trouve le rang du brelan et les kickers
    const three1 = this.findThreeOfAKindAndKickers(values1);
    const three2 = this.findThreeOfAKindAndKickers(values2);
    
    // compare le rang du brelan
    if (three1.tripletRank > three2.tripletRank) return 1;
    if (three1.tripletRank < three2.tripletRank) return -1;
    
    // brelan égal : compare les kickers en ordre décroissant
    for (let i = 0; i < three1.kickers.length; i++) {
      if (three1.kickers[i] > three2.kickers[i]) return 1;
      if (three1.kickers[i] < three2.kickers[i]) return -1;
    }
    
    return 0; // égalité
  }

  // compare deux suites
  // compare la carte la plus haute (attention : roue = 5-high)
  static compareStraight(hand1, hand2) {
    const high1 = this.getStraightHighCard(hand1.cards);
    const high2 = this.getStraightHighCard(hand2.cards);
    
    if (high1 > high2) return 1;
    if (high1 < high2) return -1;
    return 0; // égalité
  }

  // compare deux flush
  // compare les 5 cartes en ordre décroissant
  static compareFlush(hand1, hand2) {
    const values1 = this.getCardValues(hand1.cards).sort((a, b) => b - a);
    const values2 = this.getCardValues(hand2.cards).sort((a, b) => b - a);
    
    for (let i = 0; i < 5; i++) {
      if (values1[i] > values2[i]) return 1;
      if (values1[i] < values2[i]) return -1;
    }
    
    return 0; // égalité
  }

  // récupère la carte haute d'une suite
  // roue (A-2-3-4-5) retourne 5
  static getStraightHighCard(cards) {
    const values = this.getCardValues(cards).sort((a, b) => a - b);
    
    // cas spécial : roue (A-2-3-4-5) où values = [2,3,4,5,14]
    const isWheel = values[0] === 2 && values[1] === 3 && values[2] === 4 && 
                    values[3] === 5 && values[4] === 14;
    
    if (isWheel) return 5; // roue = 5-high
    
    return values[4]; // carte la plus haute
  }

  // trouve le rang de la paire et les kickers
  static findPairAndKickers(values) {
    const counts = {};
    values.forEach(v => counts[v] = (counts[v] || 0) + 1);
    
    let pairRank = 0;
    const kickers = [];
    
    for (const [rank, count] of Object.entries(counts)) {
      const rankNum = parseInt(rank);
      if (count === 2) {
        pairRank = rankNum;
      } else {
        kickers.push(rankNum);
      }
    }
    
    kickers.sort((a, b) => b - a); // tri décroissant
    
    return { pairRank, kickers };
  }

  // trouve les deux paires et le kicker
  static findTwoPairsAndKicker(values) {
    const counts = {};
    values.forEach(v => counts[v] = (counts[v] || 0) + 1);
    
    const pairs = [];
    let kicker = 0;
    
    for (const [rank, count] of Object.entries(counts)) {
      const rankNum = parseInt(rank);
      if (count === 2) {
        pairs.push(rankNum);
      } else {
        kicker = rankNum;
      }
    }
    
    pairs.sort((a, b) => b - a); // tri décroissant
    
    return { 
      highPair: pairs[0], 
      lowPair: pairs[1], 
      kicker 
    };
  }

  // trouve le rang du brelan et les kickers
  static findThreeOfAKindAndKickers(values) {
    const counts = {};
    values.forEach(v => counts[v] = (counts[v] || 0) + 1);
    
    let tripletRank = 0;
    const kickers = [];
    
    for (const [rank, count] of Object.entries(counts)) {
      const rankNum = parseInt(rank);
      if (count === 3) {
        tripletRank = rankNum;
      } else {
        kickers.push(rankNum);
      }
    }
    
    kickers.sort((a, b) => b - a); // tri décroissant
    
    return { tripletRank, kickers };
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
