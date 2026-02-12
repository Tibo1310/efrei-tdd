# Texas Hold'em Poker Hand Evaluator

Évaluateur de mains de poker Texas Hold'em

## Installation et tests

```bash
npm install
npm test
```

## Notation des cartes

- **Rangs** : `2-9`, `T` (10), `J` (Valet), `Q` (Dame), `K` (Roi), `A` (As)
- **Couleurs** : `H` (Cœur), `D` (Carreau), `C` (Trèfle), `S` (Pique)
- **Exemple** : `AH` = As de Cœur, `KS` = Roi de Pique

## Ordering des chosen5

Les 5 cartes retournées sont ordonnées selon la catégorie :

- **HIGH_CARD / FLUSH** : ordre décroissant (A, K, Q, J, 9)
- **PAIR** : paire d'abord, puis kickers décroissants (K, K, A, Q, J)
- **TWO_PAIR** : paire haute, paire basse, kicker (K, K, 8, 8, A)
- **THREE_OF_A_KIND** : brelan, puis kickers décroissants (K, K, K, A, Q)
- **STRAIGHT / STRAIGHT_FLUSH** : décroissant (9, 8, 7, 6, 5) — **roue = 5, 4, 3, 2, A**
- **FULL_HOUSE** : brelan, puis paire (K, K, K, 8, 8)
- **FOUR_OF_A_KIND** : carré, puis kicker (K, K, K, K, A)

## Assumptions sur l'input

- Les inputs sont assumés **valides** (pas de validation de cartes dupliquées)
- Format : 2 caractères (rang + couleur)
- Nombre : 2 hole cards par joueur + 5 community cards

## Structure du projet

```
src/
  ├── card.js              # Classe Card
  ├── hand.js              # Classe Hand
  ├── handEvaluator.js     # Détection catégories (9 types)
  ├── handComparator.js    # Comparaison + tie-breakers
  ├── bestHandFinder.js    # Meilleure main parmi 7 cartes
  └── pokerGame.js         # Multi-joueurs + split pot

tests/                     # 76 tests couvrant tous les cas
```

## Utilisation

```javascript
const PokerGame = require('./src/pokerGame');

const players = [
  { name: 'Thibault', holeCards: ['AH', 'KH'] },
  { name: 'Romain', holeCards: ['QC', 'QS'] }
];
const board = ['QH', 'JH', '9H', '4H', '2H'];

const result = PokerGame.determineWinners(players, board);

// gagnant(s)
console.log(result.winners);              // ['Thibault']
console.log(result.winningHand.category); // 'FLUSH'

// détails de chaque joueur (meilleure main + chosen5)
console.log(result.players[0].name);      // 'Thibault'
console.log(result.players[0].category);  // 'FLUSH'
console.log(result.players[0].hand);      // Hand with 5 cards (ordered)

console.log(result.players[1].name);      // 'Romain'
console.log(result.players[1].category);  // 'THREE_OF_A_KIND'
console.log(result.players[1].hand);      // Hand with 5 cards (ordered)
```
