/**
 * Given a body of text, it will replace phrases matching the pattern "Number {{ NUMBER }}" with a numbered list.
 * @param {String} body - body of text to replace key phrases with
 * @returns {String} Replaced numbered phrases with a list and capitalizes first letter after the numbered list.
 */
const textParser = body => {
  const numberPattern = /[Nn]umber\s(\w+)\s+([A-Za-z]+)/g;
  let numberedOrder = null;

  /**
   * Finds and replaces all instances of the pattern 'Number {{ NUMBER }}' with '{{ NUMBER }}. {{ PASCALCASE_WORD }}'
   * @param {String} _ - phrase that matches regex pattern
   * @param {String} number - number (or "next") spelled out in English (ex:"Number one patient" where number would be "one")
   * @param {String} word - word after the number (ex: "Number one patient" where word would be "patient")
   * @returns {String} Replaced phrase with number as type number and capitalized first letter of word (ex: "Number one patient" would return "\n1. Patient")
   */
  const replaceNumbers = (_, number, word) => {
    const map = {
      one: '\n1. ',
      two: '\n2. ',
      three: '\n3. ',
      four: '\n4. ',
      five: '\n5. ',
      six: '\n6. ',
      seven: '\n7. ',
      eight: '\n8. ',
      nine: '\n9. ',
      next: '__next',
    };

    let replacement = map[number];

    if (replacement === '__next') {
      if (!numberedOrder) numberedOrder = 1;

      const result = `\n${numberedOrder}. ${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;

      numberedOrder++;

      return result;
    } else {
      numberedOrder = numberedOrder ? numberedOrder + 1 : parseInt(replacement) + 1;

      return `${replacement}${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    }
  };

  return body.replace(numberPattern, replaceNumbers);
};

const test = () => {
  const phrase = `Patient presents today with several issues. Number next BMI has increased by 10% since their last vist. \
Number next patient reports experiencing dizziness several times in the last two weeks. \
Number next patient has a persistent cough that hasn't improved for last 4 weeks.`;

  return textParser(phrase);
};

console.log(test());
