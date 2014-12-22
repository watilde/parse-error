var parseError = require('../lib/main');

var fixture = {
  line: 21,
  row: 1,
  message: 'nonExistentFunc is not defined',
  type: 'not_defined'
};

process.on('uncaughtException', function(e) {
  var data = parseError(e);

  if (fixture.line !== data.line) process.exit(1);
  if (fixture.row !== data.row) process.exit(1);
  if (fixture.message !== data.message) process.exit(1);
  if (fixture.type !== data.type) process.exit(1);

  process.exit(0);
});

nonExistentFunc();
