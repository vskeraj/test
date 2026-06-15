import mongoose from "mongoose";

// Contact-form submissions. Stored so the team can follow up; `read` lets an
// admin view triage which messages still need a response.
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, maxlength: 255 },
  subject: { type: String, required: true, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default (mongoose.models.Message as mongoose.Model<any>) || mongoose.model("Message", MessageSchema);
