import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Required for credentials auth
  name: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  // Password reset: SHA-256 hash of the emailed token + its expiry. Cleared on use.
  resetTokenHash: { type: String },
  resetTokenExpiry: { type: Date },
}, { timestamps: true });

export default (mongoose.models.User as mongoose.Model<any>) || mongoose.model("User", UserSchema);
