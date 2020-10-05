const { Trie } = require('../utils');

/**
 * After matching with the pattern "\N{{ NUMBER}}. ", capitalizes the first letter of the next string
 * @param {[String]} list - contains strings including the phrases that have been replaced
 */
const capitalizeElementsInNumberedList = list => {
  const regex = /^\n\d+\.\s/;
  for (let i = 0; i < list.length; i++) {
    if (regex.test(list[i]) && i < list.length)
      list[i + 1] = list[i + 1].slice(0, 1).toUpperCase() + list[i + 1].slice(1);
  }

  return list;
};

/**
 * Given the starting index of the original text, searches the trie until it finds a replacement or it doesn't find the next letter in the trie.
 * @param {String} body - Text that has key phrases to replace
 * @param {Int} index - Starting index to search from
 * @param {Trie} trie - trie containing key phrases and their corresponding replacement strings
 * @returns {Object|undefined} contains the replacement text and index where the search finished in the original text
 */
const search = (body, index, trie) => {
  while (trie[body[index]] !== undefined) {
    if (trie[body[index]]._replacement) return { endingIndex: index, replacement: trie[body[index]]._replacement };
    else {
      trie = trie[body[index]];
      index++;
    }
  }
};

/**
 * Given a body of text, it will replace phrases matching the pattern "Number {{ NUMBER }}" with a numbered list.
 * @param {String} body - body of text to replace key phrases with
 */
const textParser = body => {
  const phrases = [
    'Number one ',
    'Number two ',
    'Number three ',
    'Number four ',
    'Number five ',
    'Number six ',
    'Number seven ',
    'Number eight ',
    'Number nine ',
    'Number next ',
  ];
  const replacements = ['\n1. ', '\n2. ', '\n3. ', '\n4. ', '\n5. ', '\n6. ', '\n7. ', '\n8. ', '\n9. ', '__next'];
  const trie = new Trie(phrases, replacements);
  const parsedText = [];
  let start = 0;
  let numberedIndex = null;

  for (let i = 0; i < body.length; i++) {
    const result = search(body, i, trie.trie);

    if (result) {
      const { endingIndex, replacement } = result;

      if (replacement === '__next') {
        parsedText.push(body.slice(start, i), `\n${numberedIndex ? numberedIndex : 1}. `);

        numberedIndex++;
      } else {
        parsedText.push(body.slice(start, i), replacement);

        numberedIndex = numberedIndex ? numberedIndex + 1 : parseInt(replacement) + 1;
      }

      start = endingIndex + 1;
      i = endingIndex + 1;
    }
  }

  parsedText.push(body.slice(start));

  capitalizeElementsInNumberedList(parsedText);

  return parsedText.join('');
};

console.log(
  textParser(
    `Patient presents today with several issues. Number one BMI has increased by 10% since their last vist. \
Number next patient reports experiencing dizziness several times in the last two weeks. \
Number next patient has a persistent cough that hasn't improved for last 4 weeks.`
  )
);
