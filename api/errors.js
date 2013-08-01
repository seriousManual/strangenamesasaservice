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


function CombinationLanguageLetterNotFoundError(letter, language) {
    BaseError.call(this, 'Combination of language ' + language + ' and letter ' + letter + ' not found', 406);
}
util.inherits(CombinationLanguageLetterNotFoundError, BaseError);


function MethodNotSupportedError(method) {
    BaseError.call(this, 'Method not supported: ' + method, 405);
}
util.inherits(MethodNotSupportedError, BaseError);


function NotFoundError(path) {
    BaseError.call(this, 'Not found: ' + path, 404);
}
util.inherits(NotFoundError, BaseError);


function LanguageNotSuppliedError() {
    BaseError.call(this, 'AcceptLanguage missing', 406);
}
util.inherits(LanguageNotSuppliedError, BaseError);


function InternalServerError() {
    BaseError.call(this, 'Internal Server Error', 502);
}
util.inherits(InternalServerError, BaseError);

module.exports = {
    LanguageNotFoundError: LanguageNotFoundError,
    MethodNotSupportedError: MethodNotSupportedError,
    NotFoundError: NotFoundError,
    LanguageNotSuppliedError: LanguageNotSuppliedError,
    InternalServerError: InternalServerError,
    CombinationLanguageLetterNotFoundError: CombinationLanguageLetterNotFoundError
};