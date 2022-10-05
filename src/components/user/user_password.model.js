import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { bcrypt_salt } from "../../utils/config";

const Schema = mongoose.Schema;

const password_schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    password: { type: String, required: true },
  },
  { timestamp: true }
);

password_schema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(bcrypt_salt);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Password = mongoose.model("Password", password_schema);

export default Password;
