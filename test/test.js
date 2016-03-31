var mocha = require('mocha');
var chai = require('chai');
var chaiFiles = require('../index');
var throwHelper = require('./helpers/throw-helper');

chai.use(chaiFiles);
chai.use(throwHelper);

var describe = mocha.describe;
var it = mocha.it;
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

  ['.to.include', '.to.contain', '.includes', '.contains'].forEach(function(methodDesc) {
    var method = methodDesc.replace('.to', '').replace('.', '');

    describe(methodDesc + '(...)', function() {
      it('passes for file containing search string', function() {
        expect(file('test/fixtures/foo.txt')).to[method]('small fixture file');
      });

      it('fails for file missing search string', function() {
        expect(function() {
          expect(file('test/fixtures/foo.txt')).to[method]('large solid object');
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"test/fixtures/foo.txt\" to contain \"large solid object\"');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.contain('small fixture file');
          expect(err.expected).to.equal('large solid object');
        });
      });

      it('fails for missing files', function() {
        expect(function() {
          expect(file('index.coffee')).to[method]('large solid object');
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"index.coffee\" to exist');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.not.exist;
          expect(err.expected).to.not.exist;
        });
      });
    });
  });


  ['.to.not.include', '.to.not.contain', '.not.includes', '.not.contains'].forEach(function(methodDesc) {
    var method = methodDesc.replace('.to', '').replace('.not.', '');

    describe(methodDesc + '(...)', function() {
      it('passes for file missing search string', function() {
        expect(file('test/fixtures/foo.txt')).to.not[method]('large solid object');
      });

      it('fails for file containing search string', function() {
        expect(function() {
          expect(file('test/fixtures/foo.txt')).to.not[method]('small fixture file');
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"test/fixtures/foo.txt\" to not contain \"small fixture file\"');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.not.exist;
          expect(err.expected).to.not.exist;
        });
      });

      it('fails for missing files', function() {
        expect(function() {
          expect(file('index.coffee')).to.not[method]('small fixture file');
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"index.coffee\" to exist');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.not.exist;
          expect(err.expected).to.not.exist;
        });
      });
    });
  });

  ['.to.match', '.matches'].forEach(function(methodDesc) {
    var method = methodDesc.replace('.to', '').replace('.', '');

    describe(methodDesc + '(/.../)', function() {
      it('passes for file matching search expression', function() {
        expect(file('test/fixtures/foo.txt')).to[method](/small.*file/);
      });

      it('fails for file not matching search expression', function() {
        expect(function() {
          expect(file('test/fixtures/foo.txt')).to[method](/large.*object/);
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"test/fixtures/foo.txt\" to match /large.*object/');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.contain('small fixture file');
          expect(err.expected.toString()).to.equal('/large.*object/');
        });
      });

      it('fails for missing files', function() {
        expect(function() {
          expect(file('index.coffee')).to[method](/large.*object/);
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"index.coffee\" to exist');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.not.exist;
          expect(err.expected).to.not.exist;
        });
      });
    });
  });

  ['.to.not.match', '.not.matches'].forEach(function(methodDesc) {
    var method = methodDesc.replace('.to', '').replace('.not.', '');

    describe(methodDesc + '(/.../)', function() {
      it('passes for file not matching search expression', function() {
        expect(file('test/fixtures/foo.txt')).to.not[method](/large.*object/);
      });

      it('fails for file matching search expression', function() {
        expect(function() {
          expect(file('test/fixtures/foo.txt')).to.not[method](/small.*file/);
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"test/fixtures/foo.txt\" to not match /small.*file/');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.not.exist;
          expect(err.expected).to.not.exist;
        });
      });

      it('fails for missing files', function() {
        expect(function() {
          expect(file('index.coffee')).to.not[method](/small.*file/);
        }).to.throw(function(err) {
          expect(err.toString()).to.equal('Error: expected \"index.coffee\" to exist');
          expect(err.showDiff).to.be.not.ok;
          expect(err.actual).to.not.exist;
          expect(err.expected).to.not.exist;
        });
      });
    });
  });
});
