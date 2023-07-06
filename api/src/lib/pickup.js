
class PickUpResponse {
  status = null;
  message = "";
  data = null;

  constructor({ status, message, data }) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

class SuccessResponse extends PickUpResponse {
  constructor({ data, message }) {
    super({ status: 201, data, message });
  }
}

class ErrorResponse extends PickUpResponse {
  constructor({ message }) {
    super({ success: 404, message });
  }
}



module.exports = { ErrorResponse, SuccessResponse };