import mongoose from 'mongoose';
import { CustomAPIError } from '../utils/custom_error.js';

const ValidationError = mongoose.Error.ValidationError;
const ValidatorError = mongoose.Error.ValidatorError;

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).send({ message: err.message })
    }
    if (err instanceof ValidationError) {
        return res.status(400).send({ message: err.message })
    }
    if (err instanceof ValidatorError) {
        return res.status(400).send({ message: err.message })
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
        return res.status(400).send({ message: "User already exists" })
    }
    
    return res.status(500).send({ message: "An error occured" })
}

export default errorHandler