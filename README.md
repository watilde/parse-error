parse-error
===========

Parse error object in Node

Install

```
$ npm install --save parse-error
```
Use

```js
var parseError = require('parse-error');

process.on('uncaughtException', function(e) {
  var data = parseError(e);
  // data =>
  //  filename: filename
  //  line: error line
  //  row: error row
  //  message: error message
  //  type: error type
  //  stack: error stack
});

nonExistentFunc();
```
