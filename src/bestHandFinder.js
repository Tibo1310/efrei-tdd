// trouve la meilleure main de 5 cartes parmi 7 cartes (texas hold'em)
class BestHandFinder {
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
