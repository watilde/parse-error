var indexOfAll = require('./indexOfAll');

module.exports = function (stackObject) {
  var obj = stackObject[1].match(/\(.+?\)/g).pop();
  var len = obj.length;
  var indexes = indexOfAll(obj, ':');
  var rowIndex = indexes.pop() + 1;
  var lineIndex = indexes.pop() + 1;
  var rowLength = len - rowIndex - 1;
  var lineLength = len - lineIndex - rowLength - 2;
  var row = obj.substring(rowIndex, rowIndex + rowLength);
  var line = obj.substring(lineIndex, lineIndex + lineLength);
  var filename = obj.substring(1, lineIndex - 1);

  return {
    filename: filename,
    line: Number(line),
    row: Number(row)
  };
}
