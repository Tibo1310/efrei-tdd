
// évalue une main de poker et détermine sa catégorie
class HandEvaluator {
  // évalue une main + retourne sa catégorie avec son rang
  // retourne : { category: string, rank: number }
  static evaluate(hand) {
    // pour l'instant, on retourne toujours HIGH_CARD
    return { category: 'HIGH_CARD', rank: 1 };
  }
}

module.exports = HandEvaluator;
