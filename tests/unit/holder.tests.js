var expect = require('chai').expect;

var Holder = require('../../api/words/Holder');

describe('Holder', function() {
    var myHolder;

    before(function() {
        myHolder = new Holder();

        myHolder.addWord('car', 'en');
        myHolder.addWord('flower', 'en');
        myHolder.addWord('fairy', 'en');
        myHolder.addWord('deer', 'en');
    });

    it('should build the correct index structure', function() {
        expect(myHolder._words).to.deep.equal(
            {en: {index:{c: ['car'], f:['flower', 'fairy'], d:['deer']}, letters:['c', 'f', 'd']}}
        );
    });

    it('should return a word starting with c', function() {
        expect(myHolder.get('en', 'c')).to.equal('car');
    });

    it('should return a word starting with f', function() {
        expect(myHolder.get('en', 'f')).to.satisfy(function(a) {
            return a == 'flower' || a == 'fairy';
        });
    });

    it('should return a word starting with d', function() {
        expect(myHolder.get('en', 'd')).to.equal('deer');
    });

    it('should return one of the four words', function() {
        expect(myHolder.get('en')).to.satisfy(function(a) {
            return a == 'flower' || a == 'fairy' || a == 'car' || a == 'deer';
        });
    });

    it('should return null on not found language', function() {
        expect(myHolder.get('de')).to.be.null;
    });

    it('should return null on not found letter', function() {
        expect(myHolder.get('en', 'x')).to.be.null;
    });

    it('should return the correct languages', function() {
        expect(myHolder.languages()).to.deep.equal(['en']);
    });
});