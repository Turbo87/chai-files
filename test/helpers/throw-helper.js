module.exports = function (chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.overwriteMethod('throw', function (_super) {
    return function(fn) {
      if (typeof fn === 'function') {
        var obj = this._obj;

        try {
          obj();
        } catch (err) {
          return fn(err);
        }

        throw new chai.AssertionError('expected [Function] to throw an exception');

      } else {
        _super.apply(this, arguments);
      }
    };
  });
};
