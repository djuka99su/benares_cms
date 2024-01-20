import mongoose, { Schema } from "mongoose";

const itemsSchema = new Schema(
  {
    title: String,
    price: Number,
    category: String,
    allergens: String,
    description: String
  },
  {
    timestamps: true,
  }
);


const Items = mongoose.models.Items || mongoose.model("Items", itemsSchema);

export default Items;