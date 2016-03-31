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
    var path = this._absPath();

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

FileHelper.prototype.equals = function(str) {
  this._loadContent();
  return this._content === str;
};

FileHelper.prototype.assertEquals = function(value) {
  this.assertExists();
  if (!this.equals(value)) {
    var error = new Error('expected "' + this.path + '" to equal "' + value + '"');
    error.actual = this._content;
    error.expected = value;
    throw error;
  }
};

FileHelper.prototype.assertDoesNotEqual = function(value) {
  this.assertExists();
  if (this.equals(value)) {
    throw new Error('expected "' + this.path + '" to not equal "' + value + '"');
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

FileHelper.prototype.matches = function(regex) {
  this._loadContent();
  return regex.test(this._content);
};

FileHelper.prototype.assertMatches = function(regex) {
  this.assertExists();
  if (!this.matches(regex)) {
    var error = new Error('expected "' + this.path + '" to match ' + regex);
    error.actual = this._content;
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
