const Card = require('./card');

class Hand { // main de 5 cartes
  constructor(cards) {
    this.cards = cards;
  }

  // tableau de cartes
  static fromStrings(cardStrings) {
    // transforme chaque chaîne (ex: "2H") en objet Card
    const cards = cardStrings.map(str => {
      const rank = str[0];  // Premier caractère = rang (3, T, Q...)
      const suit = str[1];  // Deuxième caractère = couleur (H, D, C, S...)
      return new Card(rank, suit);
    });
    return new Hand(cards);
  }

  // representation textuelle de la main générée (ex: "3H KS 6D 5C TH")
  toString() {
    return this.cards.map(card => card.toString()).join(' ');
  }
}

module.exports = Hand;
