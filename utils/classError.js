class appError extends Error {
    constructor () {
        super()
    }
    create(statusCode , status , message ){
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        return this
    }
}
const sendError  = new appError()
export default sendError