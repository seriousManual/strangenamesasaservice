var util = require('util');

function BaseError(mssg, statusCode) {
    Error.call(this, mssg);

    this.message = mssg;
    this.statusCode = statusCode;
}
util.inherits(BaseError, Error);

function LanguageNotFoundError(language) {
    BaseError.call(this, 'Language not found: ' + language, 406);
}
util.inherits(LanguageNotFoundError, BaseError);

module.exports = {
    LanguageNotFoundError: LanguageNotFoundError
};