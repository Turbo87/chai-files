var chai = require('chai');
var chaiFiles = require('./index');
var throwHelper = require('./test-helpers/throw-helper');

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
});
