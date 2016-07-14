var fs = require('fs');
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
  before(function() {
    if (!dir('test/fixtures/empty').exists) {
      fs.mkdirSync('test/fixtures/empty');
    }
  });

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
        expect(err.toString())
          .to.match(/^AssertionError: expected "test\/fixtures\/missing" to exist/)
          .to.contain('parent path "test/fixtures" exists and contains:\n');

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


  describe('.to.be.empty', function() {
    it('passes for empty directories', function() {
      expect(dir('test/fixtures/empty')).to.be.empty;
    });

    it('fails for non-empty directories', function() {
      expect(function() {
        expect(dir('test/fixtures')).to.be.empty;
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('AssertionError: expected \"test/fixtures\" to be empty');
        expect(err.showDiff).to.be.true;
        expect(err.actual).to.contain('foo.txt');
        expect(err.expected).to.deep.equal([]);
      });
    });

    it('fails for missing directories', function() {
      expect(function() {
        expect(dir('test/fixtures/missing')).to.be.empty;
      }).to.throw(function(err) {
        expect(err.toString()).to.match(/^AssertionError: expected "test\/fixtures\/missing" to exist/);
        expect(err.showDiff).to.be.false;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });

  describe('.to.not.be.empty', function() {
    it('passes for non-empty directories', function() {
      expect(dir('test/fixtures')).to.not.be.empty;
    });

    it('fails for empty directories', function() {
      expect(function() {
        expect(dir('test/fixtures/empty')).to.not.be.empty;
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('AssertionError: expected \"test/fixtures/empty\" to not be empty');
        expect(err.showDiff).to.be.false;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });

    it('fails for missing directories', function() {
      expect(function() {
        expect(dir('test/fixtures/missing')).to.not.be.empty;
      }).to.throw(function(err) {
        expect(err.toString()).to.match(/^AssertionError: expected "test\/fixtures\/missing" to exist/);
        expect(err.showDiff).to.be.false;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });
});
