var chai = require('chai');
var chaiFiles = require('./index');

chai.use(chaiFiles);

var expect = chai.expect;
var file = chaiFiles.file;

describe('chai-files', function() {
  it('works', function() {
    expect(file('index.js')).to.exist;
    expect(file('index.coffee')).to.not.exist;
  })
});
