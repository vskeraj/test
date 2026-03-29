import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Required for credentials auth
  name: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

export default (mongoose.models.User as mongoose.Model<any>) || mongoose.model("User", UserSchema);
