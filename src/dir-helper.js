var fs = require('fs');
var path = require('path');
var AssertionError = require('assertion-error');

function DirectoryHelper(path) {
  this.path = path;
  this._exists = null;
  this._content = null;
}

Object.defineProperty(DirectoryHelper.prototype, 'absolutePath', {
  get: function() {
    return path.resolve(process.cwd(), this.path);
  }
});

Object.defineProperty(DirectoryHelper.prototype, 'stats', {
  get: function() {
    if (this._stats === undefined) {
      try {
        this._stats = fs.statSync(this.absolutePath);
      } catch (e) {
        this._stats = null;
      }
    }

    return this._stats;
  }
});

Object.defineProperty(DirectoryHelper.prototype, 'exists', {
  get: function() {
    return Boolean(this.stats);
  }
});

DirectoryHelper.prototype.assertExists = function(ssf) {
  if (!this.exists) {
    throw new AssertionError('expected "' + this.path + '" to exist', {}, ssf);
  } else if (!this.stats.isDirectory()) {
    throw new AssertionError('expected "' + this.path + '" to be a directory', {}, ssf);
  }
};

DirectoryHelper.prototype.assertDoesNotExist = function(ssf) {
  if (this.exists) {
    throw new AssertionError('expected "' + this.path + '" to not exist', {}, ssf);
  }
};

DirectoryHelper.prototype.inspect = function() {
  return 'dir(\'' + this.path + '\')';
};

function dir(path) {
  return new DirectoryHelper(path);
}

module.exports = {
  dir: dir,
  DirectoryHelper: DirectoryHelper,
};
