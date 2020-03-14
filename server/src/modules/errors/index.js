class RequestError extends Error {
    constructor(status, message, context = {}) {
        super(message);
        this.status = status;
        this.context = context;
    }
}

module.exports = {
    RequestError,
};
