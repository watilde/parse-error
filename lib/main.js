var getPosition = require('./modules/getPosition');

module.exports = function(err) {
  var stack = err.stack;
  var stackObject = stack.split('\n');
  var position = getPosition(stackObject);
  var filename = position.filename;
  var line = position.line;
  var row = position.row;
  var message = err.message;
  var type = err.type;

  var data = {
    filename: filename,
    line: line,
    row: row,
    message: message,
    type: type,
    stack: stack,
    arguments: err.arguments
  };

  return data;
};
