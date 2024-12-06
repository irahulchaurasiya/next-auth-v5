import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  githubId: { type: String },
});

export const User =
  mongoose.models?.UserDataAuth || mongoose.model("UserDataAuth", userSchema);
