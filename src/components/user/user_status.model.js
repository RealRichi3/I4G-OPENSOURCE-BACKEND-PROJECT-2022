import mongoose from "mongoose";

const Schema = mongoose.Schema;

const status_schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

const Status = mongoose.model("Status", status_schema);

export default Status;
