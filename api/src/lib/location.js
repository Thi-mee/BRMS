const Validator = require('./validator');

class LocationResponse{
    success = null;
    data = null;
    message = "";

    constructor({ success, data, message }){
        this.success = success;
        this.data = data;
        this.message = message;
    }
}

class SuccessResponse extends LocationResponse {
    constructor({ data }){
        super({ success: true, data});
        this.message = 'Location gotten successfully';
    }
}

class ErrorResponse extends LocationResponse {
    constructor({ message }){
        super({ success: false, message });
    }
}

module.exports = { SuccessResponse, ErrorResponse };