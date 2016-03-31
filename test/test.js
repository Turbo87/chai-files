var chai = require('chai');
var chaiFiles = require('../index');
var throwHelper = require('./helpers/throw-helper');

chai.use(chaiFiles);
chai.use(throwHelper);

var expect = chai.expect;
var file = chaiFiles.file;

describe('expect(file(...))', function() {
  describe('.to.exist', function() {
    it('passes for existing files', function() {
      expect(file('index.js')).to.exist;
    });

    it('fails for missing files', function() {
      expect(function() {
        expect(file('index.coffee')).to.exist;
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('Error: expected \"index.coffee\" to exist');
        expect(err.showDiff).to.be.not.ok;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });

  describe('.to.not.exist', function() {
    it('passes for missing files', function() {
      expect(file('index.coffee')).to.not.exist;
    });

    it('fails for existing files', function() {
      expect(function() {
        expect(file('index.js')).to.not.exist;
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('Error: expected \"index.js\" to not exist');
        expect(err.showDiff).to.be.not.ok;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });

  describe('.to.contain', function() {
    it('passes for file containing search string', function() {
      expect(file('test/fixtures/foo.txt')).to.contain('small fixture file');
    });

    it('fails for file missing search string', function() {
      expect(function() {
        expect(file('test/fixtures/foo.txt')).to.contain('large solid object');
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('Error: expected \"test/fixtures/foo.txt\" to contain \"large solid object\"');
        expect(err.showDiff).to.be.not.ok;
        expect(err.actual).to.contain('small fixture file');
        expect(err.expected).to.equal('large solid object');
      });
    });

    it('fails for missing files', function() {
      expect(function() {
        expect(file('index.coffee')).to.contain('large solid object');
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('Error: expected \"index.coffee\" to exist');
        expect(err.showDiff).to.be.not.ok;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });

  describe('.to.not.contain', function() {
    it('passes for file missing search string', function() {
      expect(file('test/fixtures/foo.txt')).to.not.contain('large solid object');
    });

    it('fails for file containing search string', function() {
      expect(function() {
        expect(file('test/fixtures/foo.txt')).to.not.contain('small fixture file');
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('Error: expected \"test/fixtures/foo.txt\" to not contain \"small fixture file\"');
        expect(err.showDiff).to.be.not.ok;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });

    it('fails for missing files', function() {
      expect(function() {
        expect(file('index.coffee')).to.not.contain('small fixture file');
      }).to.throw(function(err) {
        expect(err.toString()).to.equal('Error: expected \"index.coffee\" to exist');
        expect(err.showDiff).to.be.not.ok;
        expect(err.actual).to.not.exist;
        expect(err.expected).to.not.exist;
      });
    });
  });
});
