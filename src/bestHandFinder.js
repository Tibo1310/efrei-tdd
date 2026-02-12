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
      hand: this.orderHand(bestHand, bestEval.category)
    };
  }

  // ordonne les cartes d'une main selon sa catégorie
  static orderHand(hand, category) {
    const orderedCards = this.orderCards(hand.cards, category);
    return new Hand(orderedCards);
  }

  // ordonne les cartes selon la catégorie de main
  static orderCards(cards, category) {
    const Card = require('./card');
    const rankValues = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };

    const getValue = (card) => rankValues[card.rank];
    const byValueDesc = (a, b) => getValue(b) - getValue(a);

    // regroupement par rang
    const groupByRank = () => {
      const groups = {};
      cards.forEach(card => {
        if (!groups[card.rank]) groups[card.rank] = [];
        groups[card.rank].push(card);
      });
      return groups;
    };

    switch (category) {
      case 'HIGH_CARD':
      case 'FLUSH':
        // ordre décroissant par valeur
        return [...cards].sort(byValueDesc);

      case 'PAIR': {
        const groups = groupByRank();
        let pair = [];
        let kickers = [];
        
        Object.values(groups).forEach(group => {
          if (group.length === 2) {
            pair = group;
          } else {
            kickers.push(...group);
          }
        });
        
        kickers.sort(byValueDesc);
        return [...pair, ...kickers];
      }

      case 'TWO_PAIR': {
        const groups = groupByRank();
        let pairs = [];
        let kicker = [];
        
        Object.values(groups).forEach(group => {
          if (group.length === 2) {
            pairs.push(group);
          } else {
            kicker = group;
          }
        });
        
        // trie les paires par valeur décroissante
        pairs.sort((a, b) => getValue(b[0]) - getValue(a[0]));
        return [...pairs[0], ...pairs[1], ...kicker];
      }

      case 'THREE_OF_A_KIND': {
        const groups = groupByRank();
        let triplet = [];
        let kickers = [];
        
        Object.values(groups).forEach(group => {
          if (group.length === 3) {
            triplet = group;
          } else {
            kickers.push(...group);
          }
        });
        
        kickers.sort(byValueDesc);
        return [...triplet, ...kickers];
      }

      case 'STRAIGHT':
      case 'STRAIGHT_FLUSH': {
        const sorted = [...cards].sort((a, b) => getValue(a) - getValue(b));
        // détecte la roue (A-2-3-4-5)
        const values = sorted.map(getValue);
        const isWheel = values[0] === 2 && values[1] === 3 && values[2] === 4 && 
                        values[3] === 5 && values[4] === 14;
        
        if (isWheel) {
          // ordre pour roue: 5, 4, 3, 2, A
          return [sorted[3], sorted[2], sorted[1], sorted[0], sorted[4]];
        }
        
        // ordre décroissant normal
        return sorted.reverse();
      }

      case 'FULL_HOUSE': {
        const groups = groupByRank();
        let triplet = [];
        let pair = [];
        
        Object.values(groups).forEach(group => {
          if (group.length === 3) {
            triplet = group;
          } else if (group.length === 2) {
            pair = group;
          }
        });
        
        return [...triplet, ...pair];
      }

      case 'FOUR_OF_A_KIND': {
        const groups = groupByRank();
        let quad = [];
        let kicker = [];
        
        Object.values(groups).forEach(group => {
          if (group.length === 4) {
            quad = group;
          } else {
            kicker = group;
          }
        });
        
        return [...quad, ...kicker];
      }

      default:
        return cards;
    }
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
