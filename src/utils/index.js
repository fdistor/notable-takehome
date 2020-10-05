class Trie {
  constructor(phrases, replacements) {
    this.trie = {};
    this.addMany(phrases, replacements);
  }

  /**
   * Inserts one phrase into trie.
   * @param {String} phrase - string to insert into trie
   * @param {String} replacement - string to replace phrase
   */
  addOne(phrase, replacement) {
    const len = phrase.length;
    let trie = this.trie;
    let i = 0;

    while (i < len) {
      const letter = phrase[i];
      if (!trie[letter]) {
        trie[letter] = {};
      }
      trie = trie[letter];
      i++;
    }
    trie._replacement = replacement;
  }

  /**
   *  Inserts many phrases into trie.
   * @param {[String]} phrases - strings to insert into trie
   * @param {[String]} replacements - strings to replace the original phrases
   */
  addMany(phrases, replacements) {
    phrases.forEach((phrase, i) => this.addOne(phrase, replacements[i]));
  }
}

module.exports = {
  Trie,
};
