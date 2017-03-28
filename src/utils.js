import MobileDetect from 'mobile-detect';

const isValidCss = (input) => {
  const lines = input.split(/\r\n|\r|\n/);
  // check if each line ends with a semicolon
  const numberOfLines = lines.length;
  const numberOfSemiColons = (input.match(/;/g) || []).length;
  const semiColonCheck = numberOfLines === numberOfSemiColons;

  // check that semicolons are at end of line
  const linesEndingWithSemiColons = lines.filter(line => line.match(/;$/));
  const endingWithSemiColonCheck = linesEndingWithSemiColons.length === numberOfLines;

  // check for matching pairs
  const stack = [];
  for (const char of input) { /* eslint no-restricted-syntax: "off" */
    if (['(', ')', '[', ']'].includes(char)) {
      if (char === '(' || char === '[') stack.push(char);
      if (char === ')' && stack[stack.length - 1] === '(') stack.pop();
      if (char === ']' && stack[stack.length - 1] === '[') stack.pop();
    }
  }
  const matchinPairsCheck = stack.length === 0;

  return semiColonCheck && endingWithSemiColonCheck && matchinPairsCheck;
};

const checkCompatibility = () => {
  const md = new MobileDetect(window.navigator.userAgent);
  if (md.version('iOS') >= 10.3) {
    return true;
  } else if (md.is('iOS')) { // 2. need to add this in interim to detect all iOS devices
    return false;
  }

  if (md.version('Firefox') >= 52 || // 1. chrome on ios for some reason matched v52 so this checks passes.
    md.version('Chrome') >= 57 ||
    md.version('Safari') >= 10.1) {
    return true;
  }
  return false;
};

const times = x => (f) => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

export {
  checkCompatibility,
  isValidCss,
  times,
};
