import mongoose from "mongoose";

const Schema = mongoose.Schema
const options = { toObject: { virtuals: true } }

const user_schema = new Schema({
    firstname: { type: String, require: [true, "Firstname is required"] },
    lastname: { type: String, required: [true, "Lastname is required"] },
    email: { type: String, unique: true, required: [true, "email is required"] },
    role: { type: String, require: true, enum: ["Admin", "EndUser"] }
}, options, { timestamp: true })

user_schema.pre('save', async function (data) {
    /* FCreates a Password and Status reference for the current user  */
    try {
        const client = mongoose.connection

        data.user = this._id

        if (data.role == "EndUser") { data.isActive = true } // Automatically activate endUser account

        const session = await client.startSession()
        session.startTransaction()

        await Password.create([data], { session })
        await Status.create([data], { session })
        const ver_token = await Token.create([data], { session })

        await session.commitTransaction()
        session.endSession()

        return ver_token[0].verification_token
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }
})

const User = mongoose.model("User", user_schema)

export default User