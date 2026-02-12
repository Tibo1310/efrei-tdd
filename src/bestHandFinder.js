const Hand = require('./hand');
const HandEvaluator = require('./handEvaluator');
const HandComparator = require('./handComparator');

// trouve la meilleure main de 5 cartes parmi 7 cartes (texas hold'em)
class BestHandFinder {
  // trouve la meilleure main parmi 7 cartes
  // retourne { category, rank, hand }
  static findBestHand(cardStrings) {
    // génère toutes les combinaisons de 5 cartes parmi 7
    const combinations = this.generateCombinations(cardStrings, 5);
    
    let bestHand = null;
    let bestEval = null;
    
    // évalue chaque combinaison et garde la meilleure
    for (const combo of combinations) {
      const hand = Hand.fromStrings(combo);
      const evaluation = HandEvaluator.evaluate(hand);
      
      if (!bestHand) {
        bestHand = hand;
        bestEval = evaluation;
      } else {
        // compare avec la meilleure main actuelle
        const comparison = HandComparator.compare(hand, bestHand);
        if (comparison > 0) {
          bestHand = hand;
          bestEval = evaluation;
        }
      }
    }
    
    return {
      category: bestEval.category,
      rank: bestEval.rank,
      hand: bestHand
    };
  }

  // génère toutes les combinaisons de k éléments parmi un tableau
  static generateCombinations(array, k) {
    const result = [];
    
    const combine = (start, chosen) => {
      if (chosen.length === k) {
        result.push([...chosen]);
        return;
      }
      
      for (let i = start; i < array.length; i++) {
        chosen.push(array[i]);
        combine(i + 1, chosen);
        chosen.pop();
      }
    };
    
    combine(0, []);
    return result;
  }
}

module.exports = BestHandFinder;
