var mocha = require('mocha');
var chai = require('chai');
var chaiFiles = require('../index');
var throwHelper = require('./helpers/throw-helper');

chai.use(chaiFiles);
chai.use(throwHelper);

var describe = mocha.describe;
var it = mocha.it;
var expect = chai.expect;
var dir = chaiFiles.dir;

describe('expect(dir(...))', function() {
  describe('.to.exist', function() {
    it('passes for existing directories', function() {
      expect(dir('test/fixtures')).to.exist;
    });

    it('fails for files', function() {
      expect(function() {
        expect(dir('test/fixtures/foo.txt')).to.exist;
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('AssertionError: expected \"test/fixtures/foo.txt\" to be a directory');
        expect(err.showDiff).to.be.false;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });

    it('fails for missing directories', function() {
      expect(function() {
        expect(dir('test/fixtures/missing')).to.exist;
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('AssertionError: expected \"test/fixtures/missing\" to exist');
        expect(err.showDiff).to.be.false;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });

  describe('.to.not.exist', function() {
    it('passes for missing directories', function() {
      expect(dir('test/fixtures/missing')).to.not.exist;
    });

    it('fails for existing dirs', function() {
      expect(function() {
        expect(dir('test/fixtures')).to.not.exist;
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('AssertionError: expected \"test/fixtures\" to not exist');
        expect(err.showDiff).to.be.false;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });
});
