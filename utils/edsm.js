// It's not explicit on their page, but they convert '+' to '%2B' and spaces to '+'
const reformatNameForEDSM = (name) => {
  return name
    .split('')
    .map((char) => {
      if (char === '+') {
        return '%2B';
      } else if (char === ' ') {
        return '+';
      }
      return char;
    })
    .join('');
};

module.exports = {
  reformatNameForEDSM
};
