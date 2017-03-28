import useragent from 'useragent';

const agent = useragent.parse(window.navigator.userAgent);

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
  const matchingPairsCheck = stack.length === 0;

  return semiColonCheck && endingWithSemiColonCheck && matchingPairsCheck;
};

const checkCompatibility = () => { /* eslint consistent-return: "off" */
  // show agent info in the browser for support
  console.log(agent); /* eslint no-console: "off" */
  switch (agent.family) {
    case 'Chrome':
      if (parseInt(agent.major, 10) >= 57) return true;
      break;
    case 'Firefox':
      if (parseInt(agent.major, 10) >= 52) return true;
      break;
    case 'Safari':
      if (parseInt(agent.major, 10) >= 10 && parseInt(agent.minor, 10) >= 1) return true;
      break;
    case 'Mobile Safari': // safari app
      if (parseInt(agent.os.major, 10) >= 10 && parseInt(agent.os.minor, 10) >= 3) return true;
      break;
    case 'Mobile Safari UI/WKWebView': // webview from within app
      if (parseInt(agent.os.major, 10) >= 10 && parseInt(agent.os.minor, 10) >= 3) return true;
      break;
    case 'Chrome Mobile iOS': // chrome app
      if (parseInt(agent.os.major, 10) >= 10 && parseInt(agent.os.minor, 10) >= 3) return true;
      break;
    case 'Opera':
      if (parseInt(agent.major, 10) >= 44) return true;
      break;
    default:
      return false;
  }
};

const isSafari = () => {
  if (agent.family === 'Safari' ||
    agent.family === 'Mobile Safari' ||
    agent.family === 'Mobile Safari UI/WKWebView' ||
    agent.family === 'Chrome Mobile iOS') {
    return true;
  }
  return false;
};

const getAgent = () => agent;

const times = x => (f) => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

export {
  checkCompatibility,
  getAgent,
  isSafari,
  isValidCss,
  times,
};
