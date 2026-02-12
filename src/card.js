class Card {
  constructor(rank, suit) {
    this.rank = rank; // valuer de la carte : 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A
    this.suit = suit; // couleur de la carte : H (hearts), D (diamonds), C (clubs), S (spades)
  }


  toString() {
    return this.rank + this.suit;
  }
}

module.exports = Card;
