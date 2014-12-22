parse-error
===========

Parse error object in Node

```js
var parseError = require('../lib/main');

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
