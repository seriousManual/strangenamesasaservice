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


function MethodNotSupportedError(method) {
    BaseError.call(this, 'Method not supported: ' + method, 405);
}
util.inherits(MethodNotSupportedError, BaseError);


function NotFoundError(path) {
    BaseError.call(this, 'Not found: ' + path, 404);
}
util.inherits(NotFoundError, BaseError);


module.exports = {
    LanguageNotFoundError: LanguageNotFoundError,
    MethodNotSupportedError: MethodNotSupportedError,
    NotFoundError: NotFoundError
};