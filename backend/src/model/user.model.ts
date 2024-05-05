import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  access_token: { type: String },
  refresh_token: { type: String },
  token_type: { type: String },
  expiry_date: { type: Number },
  id_token: { type: String },
  scope: { type: String },
});

export default mongoose.model("User", userSchema);
