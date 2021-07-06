import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// model first argument is sigular
// and in MongoDB the collection will be plural
// Collection name - "User"
export const Users = mongoose.model("User", userSchema);
