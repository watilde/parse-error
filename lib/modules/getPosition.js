module.exports = function (stackObject) {
  var filename, line, row;
  // Because the JavaScript error stack has not yet been standardized,
  // wrap the stack parsing in a try/catch for a soft fail if an
  // unexpected stack is encountered.
  try {
    var filteredStack = stackObject
      .filter(function (s) {
        return /\(.+?\)$/.test(s);
      });
    var splitLine;
    // For current Node & Chromium Error stacks
    if(filteredStack.length > 0) {
      splitLine = filteredStack[0]
        .match(/(?:\()(.+?)(?:\))$/)[1]
        .split(':');
    // For older, future, or otherwise unexpected stacks
    } else {
      splitLine = stackObject[0]
        .split(':');
    }
    var splitLength = splitLine.length;
    filename = splitLine[splitLength - 3];
    line = Number(splitLine[splitLength - 2]);
    row = Number(splitLine[splitLength - 1]);
  } catch(err) {
    filename = '';
    line = 0;
    row = 0;
  }
  return {
    filename: filename,
    line: line,
    row: row
  };
};
