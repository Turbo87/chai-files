var FileHelper = require('./file-helper').FileHelper;

module.exports = function(chai, utils) {
  var Assertion = chai.Assertion;

  /**
   * ### .exist
   *
   * Asserts that a file exists.
   *
   *     expect(file('index.js')).to.exist;
   *     expect(file('index.coffee')).to.not.exist;
   *
   * @name exist
   * @namespace BDD
   * @api public
   */

  function exist(_super) {
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
  }

  Assertion.overwriteProperty('exist', exist);

  /**
   * ### .include(value)
   *
   * Asserts that the file content includes a certain string.
   *
   *     expect(file('foo.txt')).to.include('foo');
   *     expect(file('foo.txt')).to.not.include('bar');
   *
   * @name include
   * @alias contain
   * @alias includes
   * @alias contains
   * @param {String} str
   * @namespace BDD
   * @api public
   */

  function includeChainingBehavior(_super) {
    return function() {
      return _super.apply(this, arguments);
    }
  }

  function include(_super) {
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
  }

  Assertion.overwriteChainableMethod('include', include, includeChainingBehavior);
  Assertion.overwriteChainableMethod('contain', include, includeChainingBehavior);
  Assertion.overwriteChainableMethod('includes', include, includeChainingBehavior);
  Assertion.overwriteChainableMethod('contains', include, includeChainingBehavior);

  /**
   * ### .match(regexp)
   *
   * Asserts that the file content matches a regular expression.
   *
   *     expect(file('foo.txt')).to.match(/fo+/);
   *     expect(file('foo.txt')).to.not.match(/bar/);
   *
   * @name match
   * @alias matches
   * @param {RegExp} regex
   * @namespace BDD
   * @api public
   */

  function assertMatch(_super) {
    return function(regex) {
      var obj = this._obj;
      if (obj instanceof FileHelper) {
        if (utils.flag(this, 'negate')) {
          obj.assertDoesNotMatch(regex);
        } else {
          obj.assertMatches(regex);
        }
      } else {
        _super.apply(this, arguments);
      }
    };
  }

  Assertion.overwriteMethod('match', assertMatch);
  Assertion.overwriteMethod('matches', assertMatch);
};