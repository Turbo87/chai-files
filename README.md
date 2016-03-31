
chai-files
==============================================================================

[![Build Status](https://travis-ci.org/Turbo87/chai-files.svg?branch=master)](https://travis-ci.org/Turbo87/chai-files)
[![Build status](https://ci.appveyor.com/api/projects/status/github/Turbo87/chai-files?svg=true)](https://ci.appveyor.com/project/Turbo87/chai-files/branch/master)

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
var chaiFiles = require('chai-files');

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


### expect(file(...)).to.equal(...)

Check if the file content equals a string:

```js
expect(file('foo.txt')).to.equal('foo');
expect(file('foo.txt')).to.not.equal('bar');
```


### expect(file(...)).to.contain(...)

Check if a file contains a string:

```js
expect(file('foo.txt')).to.contain('foo');
expect(file('foo.txt')).to.not.contain('bar');
```


### expect(file(...)).to.match(/.../)

Check if a file matches a regular expression:

```js
expect(file('foo.txt')).to.match(/fo+/);
expect(file('foo.txt')).to.not.match(/bar?/);
```


License
------------------------------------------------------------------------------
chai-files is licensed under the [MIT License](LICENSE).
