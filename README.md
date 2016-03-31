
chai-files
==============================================================================

[![Build Status](https://travis-ci.org/Turbo87/chai-files.svg?branch=master)](https://travis-ci.org/Turbo87/chai-files)

file system assertions for chai


Installation
------------------------------------------------------------------------------

```
npm install --save-dev chai-files
```

Usage
------------------------------------------------------------------------------

After importing `chai` add the following code to use `chai-files` assertions:

```js
var chai = require('chai');
var chaiFiles = require('../index');

chai.use(chaiFiles);

var expect = chai.expect;
var file = chaiFiles.file;
```


### expect(file(...)).to.exist

Check if a file exist:

```js
expect(file('index.js')).to.exist;
expect(file('index.coffee')).to.not.exist;
```


### expect(file(...)).to.contain(...)

Check if a file contains a string:

```js
expect(file('foo.txt')).to.contain('foo');
expect(file('foo.txt')).to.not.contain('bar');
```


License
------------------------------------------------------------------------------
chai-files is licensed under the [MIT License](LICENSE).
