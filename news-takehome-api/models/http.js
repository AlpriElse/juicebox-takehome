class StandardResponse {
  constructor(status = 200, success = true, payload = {}, error = {}) {
    this.status = status;
    this.success = success;
    this.payload = payload;
    this.error = error;
  }

  send(res) {
    res.status(this.status).send({
      sucess: this.success,
      payload: this.payload,
      error: this.error,
    });
  }
}

module.exports = {
  StandardResponse,
};
