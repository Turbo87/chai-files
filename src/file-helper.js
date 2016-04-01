var fs = require('fs');
var path = require('path');

function FileHelper(path) {
  this.path = path;
  this._exists = null;
  this._content = null;
}

Object.defineProperty(FileHelper.prototype, 'absolutePath', {
  get: function() {
    return path.resolve(process.cwd(), this.path);
  }
});

Object.defineProperty(FileHelper.prototype, 'exists', {
  get: function() {
    if (this._exists === null) {
      var path = this.absolutePath;

      if (fs.existsSync) {
        this._exists = fs.existsSync(path);
      } else {
        try {
          fs.accessSync(path, fs.F_OK);
          this._exists = true;
        } catch (e) {
          this._exists = false
        }
      }
    }

    return this._exists;
  }
});

Object.defineProperty(FileHelper.prototype, 'content', {
  get: function() {
    if (this._content === null) {
      this._content = fs.readFileSync(this.absolutePath, {encoding: 'utf-8'});
    }

    return this._content;
  }
});

FileHelper.prototype.assertExists = function() {
  if (!this.exists) {
    throw new Error('expected "' + this.path + '" to exist');
  }
};

FileHelper.prototype.assertDoesNotExist = function() {
  if (this.exists) {
    throw new Error('expected "' + this.path + '" to not exist');
  }
};

FileHelper.prototype.equals = function(str) {
  return this.content === str;
};

FileHelper.prototype.assertEquals = function(value) {
  var valueIsFile = (value instanceof FileHelper);

  this.assertExists();
  if (valueIsFile) {
    value.assertExists();
  }

  var str = valueIsFile ? value.content : value;
  if (!this.equals(str)) {
    var error = new Error('expected "' + this.path + '" to equal "' + (valueIsFile ? value.path : value) + '"');
    error.actual = this.content;
    error.expected = str;
    throw error;
  }
};

FileHelper.prototype.assertDoesNotEqual = function(value) {
  var valueIsFile = (value instanceof FileHelper);

  this.assertExists();
  if (valueIsFile) {
    value.assertExists();
  }

  var str = valueIsFile ? value.content : value;
  if (this.equals(str)) {
    throw new Error('expected "' + this.path + '" to not equal "' + (valueIsFile ? value.path : value) + '"');
  }
};

FileHelper.prototype.contains = function(str) {
  return this.content.indexOf(str) !== -1;
};

FileHelper.prototype.assertContains = function(str) {
  this.assertExists();
  if (!this.contains(str)) {
    var error = new Error('expected "' + this.path + '" to contain "' + str + '"');
    error.actual = this.content;
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

FileHelper.prototype.matches = function(regex) {
  return regex.test(this.content);
};

FileHelper.prototype.assertMatches = function(regex) {
  this.assertExists();
  if (!this.matches(regex)) {
    var error = new Error('expected "' + this.path + '" to match ' + regex);
    error.actual = this.content;
    error.expected = regex;
    throw error;
  }
};

FileHelper.prototype.assertDoesNotMatch = function(regex) {
  this.assertExists();
  if (this.matches(regex)) {
    throw new Error('expected "' + this.path + '" to not match ' + regex);
  }
};

function file(path) {
  return new FileHelper(path);
}

module.exports = {
  file: file,
  FileHelper: FileHelper,
};
