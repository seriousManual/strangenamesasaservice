var path = require('path');

var expect = require('chai').expect;
var sinon = require('sinon');

var loader = require('../../lib/words/Loader');

describe('Loader', function() {

    it('should load', function(done) {
        var myMock = {
            addWord: sinon.spy()
        };

        loader.load(myMock, path.join(__dirname, '../testFiles'), function() {
            expect(myMock.addWord.callCount).to.equal(4);
            expect(myMock.addWord.args[0][0]).to.equal('foo');

            done();
        });
    });

});