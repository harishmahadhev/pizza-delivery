import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["veg", "non-veg", "egg"],
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["large", "medium", "regular"],
    default: "medium",
  },
  crust: {
    type: String,
    enum: [
      "New Hand Tossed",
      "Wheat Thin Crust",
      "Cheese Burst",
      "Fresh Pan Pizza",
    ],
    default: "New Hand Tossed",
  },
});

export const Pizzas = mongoose.model("Pizza", userSchema);
