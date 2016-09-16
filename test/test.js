var assert = require('assert'),
  fs = require('fs'),
  path = require('path'),
  parseError = require('../lib/main'),
  getPosition = require('../lib/modules/getPosition');


// 1. Check the getPosition module to make sure it properly handles common stack types

process.stdout.write('\n1. Check getPosition module\n');

var nodeChromiumErrorStack = JSON.parse(fs.readFileSync(path.join('test', 'test-stacks', 'NODE_ERROR_STACK.txt')));
var firefoxErrorStack = JSON.parse(fs.readFileSync(path.join('test', 'test-stacks', 'FIREFOX_ERROR_STACK.txt')));
var otherNodeErrorStack = JSON.parse(fs.readFileSync(path.join('test', 'test-stacks', 'OTHER_NODE_ERROR_STACK.txt')));

var getPositionFixture = {
  filename: 'home\/test\/projects\/parse-error\/catch-error\\.js',
  line: 3,
  row: 12
};

var fileNamePatt = new RegExp(getPositionFixture.filename);

var nodeData = getPosition(nodeChromiumErrorStack);
process.stdout.write('\nChecking getPosition with Node Error stack');
assert(fileNamePatt.test(nodeData.filename));
assert(getPositionFixture.line === nodeData.line);
assert(getPositionFixture.row === nodeData.row);
process.stdout.write(' - Success!\n');

var otherNodeData = getPosition(otherNodeErrorStack);
process.stdout.write('Checking getPosition with other Node Error stack');
assert(fileNamePatt.test(otherNodeData.filename));
assert(getPositionFixture.line === otherNodeData.line);
assert(getPositionFixture.row === otherNodeData.row);
process.stdout.write(' - Success!\n');

var ffData = getPosition(firefoxErrorStack);
process.stdout.write('Checking getPosition with Firefox Error stack');
assert(fileNamePatt.test(ffData.filename));
assert(getPositionFixture.line === ffData.line);
assert(getPositionFixture.row === ffData.row);
process.stdout.write(' - Success!\n');

process.stdout.write('Checking getPosition with undefined stack');
var badStackResult = getPosition(undefined);
assert(typeof badStackResult === 'object');
assert(typeof badStackResult.filename === 'string');
assert(typeof badStackResult.line === 'number');
assert(typeof badStackResult.row === 'number');
process.stdout.write(' - Success!\n');

// 2. check the output of parseError

var fixture = {
  line: 87,
  row: 1,
  message: 'nonExistentFunc is not defined',
  type: 'ReferenceError'
};

process.on('uncaughtException', function(e) {
  var data = parseError(e);

  process.stdout.write('\n2. Check parseError output\n');

  process.stdout.write('\nChecking line');
  assert(fixture.line === data.line);
  process.stdout.write(' - Success!\n');

  process.stdout.write('Checking row');
  assert(fixture.row === data.row);
  process.stdout.write(' - Success!\n');

  process.stdout.write('Checking message');
  assert(fixture.message === data.message);
  process.stdout.write(' - Success!\n');

  process.stdout.write('Checking type');
  assert(fixture.type === data.type);
  process.stdout.write(' - Success!\n');

  process.stdout.write('\nAll tests successfully passed.\n\n');

});

nonExistentFunc();
