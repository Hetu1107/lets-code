class ErrorResponse extends Error{
    constructor(message,ststusCode){
        super(message);
        this.statusCode = ststusCode;
    }
}
module.exports = ErrorResponse;