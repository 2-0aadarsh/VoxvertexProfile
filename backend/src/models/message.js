// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  sharedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  sharedProfile: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;
