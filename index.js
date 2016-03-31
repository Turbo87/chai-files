var fs = require('fs');
var path = require('path');

function FileHelper(path) {
  this.path = path;
  this._exists = null;
  this._content = null;
}

FileHelper.prototype._absPath = function() {
  return path.resolve(process.cwd(), this.path);
};

FileHelper.prototype.exists = function() {
  if (this._exists === null) {
    try {
      fs.accessSync(this._absPath(), fs.F_OK);
      this._exists = true;
    } catch (e) {
      this._exists = false
    }
  }

  return this._exists;
};

FileHelper.prototype.assertExists = function() {
  if (!this.exists()) {
    throw new Error('expected "' + this.path + '" to exist');
  }
};

FileHelper.prototype.assertDoesNotExist = function() {
  if (this.exists()) {
    throw new Error('expected "' + this.path + '" to not exist');
  }
};

FileHelper.prototype._loadContent = function() {
  if (this._content === null) {
    this._content = fs.readFileSync(this._absPath(), {encoding: 'utf-8'});
  }
};

FileHelper.prototype.contains = function(str) {
  this._loadContent();
  return this._content.indexOf(str) !== -1;
};

FileHelper.prototype.assertContains = function(str) {
  this.assertExists();
  if (!this.contains(str)) {
    var error = new Error('expected "' + this.path + '" to contain "' + str + '"');
    error.actual = this._content;
    error.expected = str;
    throw error;
  }
};

FileHelper.prototype.assertDoesNotContain = function(str) {
  this.assertExists();
  if (this.contains(str)) {
    throw new Error('expected "' + this.path + '" to not contain "' + str + '"');
  }
};

module.exports = function(chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.overwriteProperty('exist', function(_super) {
    return function() {
      var obj = this._obj;
      if (obj instanceof FileHelper) {
        if (utils.flag(this, 'negate')) {
          obj.assertDoesNotExist();
        } else {
          obj.assertExists();
        }

      } else {
        _super.call(this);
      }
    };
  });

  Assertion.overwriteChainableMethod('contain', function(_super) {
    return function(str) {
      var obj = this._obj;
      if (obj instanceof FileHelper) {
        if (utils.flag(this, 'negate')) {
          obj.assertDoesNotContain(str);
        } else {
          obj.assertContains(str);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  }, function(_super) {
    return function() {
      return _super.apply(this, arguments);
    }
  });
};

module.exports.file = function(path) {
  return new FileHelper(path);
};
